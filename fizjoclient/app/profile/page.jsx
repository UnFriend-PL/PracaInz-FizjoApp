"use client";
import React, { useState, useEffect, useContext } from "react";
import styles from "./profile.module.scss";
import apiService from "../services/apiService/apiService";
import { AuthContext } from "../contexts/auth/authContext";
import { UserContext } from "../contexts/user/userContext";
import { LanguageContext } from "../contexts/lang/langContext";
import { FaCaretDown } from "react-icons/fa";
import pl from "./locales/pl.json";
import en from "./locales/en.json";

const locales = { en, pl };

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useContext(AuthContext);
  const { user, updateUser } = useContext(UserContext);
  const { language } = useContext(LanguageContext);
  const t = locales[language];
  const [isEditing, setIsEditing] = useState(false);
  const [editableFields, setEditableFields] = useState({});
  const [showDropdown, setShowDropdown] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [editedUser, setEditedUser] = useState(user);

  useEffect(() => {
    setEditedUser(user);
  }, [user]);

  const handleEditToggle = (key) => {
    setEditableFields((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const validateField = (key, value) => {
    const errors = {};

    if (key === "pesel") {
      if (value.length !== 11) {
        errors.pesel = t.peselError;
      } else {
        const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
        let sum = 0;

        for (let i = 0; i < 10; i++) {
          sum += parseInt(value[i], 10) * weights[i];
        }

        const controlDigit = (10 - (sum % 10)) % 10;

        if (controlDigit !== parseInt(value[10], 10)) {
          errors.pesel = t.invalidPeselError;
        } else {
          errors.pesel = "";
        }
      }
    }

    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      ...errors,
    }));
  };

  const handleInputChange = (key, value) => {
    setEditedUser((prevEditedUser) => ({
      ...prevEditedUser,
      [key]: value,
    }));
    validateField(key, value);
  };

  const formatDateToReadable = (dateString) => {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const enableEditAllFields = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setEditedUser(user);
      const newEditableFields = Object.keys(user).reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {});
      setEditableFields(newEditableFields);
    } else {
      setEditableFields({});
      setValidationErrors({});
    }
    setShowDropdown(false);
  };

  const saveChanges = async () => {
    setIsEditing(false);
    setEditableFields({});
    setValidationErrors({});
    try {
      console.log(editedUser);
      const response = await apiService.post(
        "/User/UpdateInfo",
        editedUser,
        true
      );
      if (response.success) {
        updateUser(editedUser);
        return response.data;
      } else {
        throw new Error(response.data);
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    } finally {
      setLoading(false);
    }
    setShowDropdown(false);
  };

  const cancelChanges = () => {
    setIsEditing(false);
    setEditableFields({});
    setValidationErrors({});
    setEditedUser(user); // Reset editedUser back to the original user data
    setShowDropdown(false);
  };

  const getUserInfo = async (e) => {
    e.preventDefault();
    try {
      const response = await apiService.get("/User/GetInfo", null, true);
      if (response.success) {
        return response.data;
      } else {
        throw new Error(response.data);
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserInfo({ preventDefault: () => {} });
        updateUser(data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };
    if (isAuthenticated) fetchData();
  }, [isAuthenticated]);

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleMenuClick = (option) => {
    switch (option) {
      case "edit":
        enableEditAllFields();
        break;
      case "appointments":
        console.log("Navigate to Appointments");
        break;
      case "opinion":
        console.log("Navigate to Opinion");
        break;
      default:
        break;
    }
    setShowDropdown(false);
  };

  if (!isAuthenticated) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>{t.profile}</h1>
        <div className={styles.profileCard}>
          <div className={styles.field}>
            <span className={styles.label}>{t.error}</span>
            <span className={styles.value}>{t.notAuthenticated}</span>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return <div className={styles.loading}>{t.loading}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{t.profile}</h1>
        <div className={styles.dropdownContainer}>
          <FaCaretDown
            className={styles.dropdownIcon}
            onClick={toggleDropdown}
          />
          {showDropdown && (
            <div className={styles.dropdownMenu}>
              <div onClick={() => handleMenuClick("appointments")}>
                {t.appointments}
              </div>
              <div onClick={() => handleMenuClick("opinion")}>{t.opinions}</div>
            </div>
          )}
        </div>
      </div>

      <div className={styles.profileCard}>
        {Object.keys(user)
          .filter((key) => key !== "id")
          .map((key) => (
            <div className={styles.fieldContainer} key={key}>
              <div className={styles.field}>
                <span className={styles.label}>
                  {t[key] || key.replace(/([A-Z])/g, " $1").trim()}:
                </span>

                {editableFields[key] ? (
                  key === "dateOfBirth" ? (
                    <input
                      type="date"
                      value={
                        editedUser[key] ? editedUser[key].slice(0, 10) : ""
                      }
                      onChange={(e) => handleInputChange(key, e.target.value)}
                      className={styles.editableInput}
                    />
                  ) : (
                    <input
                      type="text"
                      value={editedUser[key]}
                      onChange={(e) => handleInputChange(key, e.target.value)}
                      className={styles.editableInput}
                    />
                  )
                ) : (
                  <span className={`${styles.value} ${styles.nonEditable}`}>
                    {key === "dateOfBirth"
                      ? formatDateToReadable(user[key])
                      : user[key]}
                  </span>
                )}
              </div>

              {/* Komunikat błędu poniżej pola */}
              {validationErrors[key] && (
                <div className={styles.error}>{validationErrors[key]}</div>
              )}
            </div>
          ))}
      </div>

      <div className={styles.buttonContainer}>
        {!isEditing ? (
          <button onClick={enableEditAllFields} className={styles.editButton}>
            {t.editButton}
          </button>
        ) : (
          <div>
            <button onClick={cancelChanges} className={styles.cancelButton}>
              {t.cancelButton}
            </button>
            <button onClick={saveChanges} className={styles.saveButton}>
              {t.saveChanges}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
