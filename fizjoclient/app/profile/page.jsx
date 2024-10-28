"use client";
import React, { useState, useEffect, useContext } from "react";
import styles from "./profile.module.scss";
import apiService from "../services/apiService/apiService";
import { AuthContext } from "../contexts/auth/authContext";
import { UserContext } from "../contexts/user/userContext";
import { LanguageContext } from "../contexts/lang/langContext";
import { FaRegEdit } from "react-icons/fa";
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
  const [isDirty, setIsDirty] = useState(false);

  const handleEditToggle = (key) => {
    setEditableFields((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleInputChange = (key, value) => {
    updateUser((prevUser) => ({
      ...prevUser,
      [key]: value,
    }));
    setIsDirty(true);
  };

  const enableEditAllFields = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      const newEditableFields = Object.keys(user).reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {});
      setEditableFields(newEditableFields);
    } else {
      setEditableFields({});
      setIsDirty(false);
    }
  };

  const saveChanges = async () => {
    setIsEditing(false);
    setEditableFields({});
    setIsDirty(false);
    try {
      console.log(user);
      const response = await apiService.post("/User/UpdateInfo", user, true);
      if (response.success) {
        return response.data;
      } else {
        throw new Error(response.data);
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    } finally {
      setLoading(false);
    }
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
      <h1 className={styles.title}>{t.profile}</h1>

      <div className={styles.profileCard}>
        <button onClick={enableEditAllFields} className={styles.editButton}>
          <FaRegEdit className={styles.editIcon} />{" "}
          {isEditing ? t.saveChanges : t.editAllFields}
        </button>
        {Object.keys(user)
          .filter((key) => key !== "Id")
          .map((key) => (
            <div className={styles.field} key={key}>
              <span className={styles.label}>
                {t[key] || key.replace(/([A-Z])/g, " $1").trim()}:
              </span>
              {editableFields[key] ? (
                <input
                  type="text"
                  value={user[key]}
                  onChange={(e) => handleInputChange(key, e.target.value)}
                  onBlur={() => handleEditToggle(key)}
                  className={styles.editableInput}
                />
              ) : (
                <span
                  className={styles.value}
                  onDoubleClick={() => handleEditToggle(key)}
                >
                  {user[key]}
                </span>
              )}
            </div>
          ))}
      </div>
      {isDirty && (
        <button onClick={saveChanges} className={styles.saveButton}>
          {t.saveChanges}
        </button>
      )}
    </div>
  );
};

export default Profile;
