"use client";
import React, { useState, useEffect, useContext } from "react";
import styles from "./profile.module.scss";
import apiService, { fetchAvatar } from "../services/apiService/apiService";
import { useRouter } from "next/navigation";
import { AuthContext } from "../contexts/auth/authContext";
import { UserContext } from "../contexts/user/userContext";
import { LanguageContext } from "../contexts/lang/langContext";
import { FaCaretDown } from "react-icons/fa";
import pl from "./locales/pl.json";
import en from "./locales/en.json";
import Image from "next/image";

const locales = { en, pl };

const Profile = () => {
  const router = useRouter();

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
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [avatarError, setAvatarError] = useState(null);
  const [tempAvatarFile, setTempAvatarFile] = useState(null);

  useEffect(() => {
    setEditedUser(user);
  }, [user]);
  // useEffect(() => {
  //   return () => {
  //     if (avatarUrl) {
  //       URL.revokeObjectURL(avatarUrl);
  //     }
  //   };
  // }, [avatarUrl]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserInfo();
        if (data) {
          updateUser(data);

          // Wczytaj awatar, jeśli istnieje
          if (data.avatarPath) {
            await fetchProfilePicture(data.avatarPath);
          }
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) fetchData();
  }, [isAuthenticated]);
  const hasValidationErrors = () => {
    return Object.keys(validationErrors).length > 0;
  };
  const fetchProfilePicture = async (avatarPath) => {
    setAvatarLoading(true);
    if (avatarPath) {
      try {
        const url = await fetchAvatar(avatarPath);
        setAvatarUrl(url); // Ustawienie URL obrazu
      } catch (error) {
        console.error("Error loading avatar:", error);
        setAvatarUrl(null); // Jeśli błąd, usuń obraz
      } finally {
        setAvatarLoading(false);
      }
    } else {
      setAvatarUrl(null); // Jeśli brak avatarPath, ustaw brak obrazu
      setAvatarLoading(false);
    }
  };

  const validateField = (key, value) => {
    const errors = { ...validationErrors };

    if (key === "firstName" || key === "lastName") {
      if (!/^[A-Za-zĄąĆćĘęŁłŃńÓóŚśŹźŻż]+$/.test(value)) {
        errors[key] = t.invalidNameError;
      } else {
        delete errors[key];
      }
    }

    if (key === "city" || key === "country") {
      if (!/^[A-Za-zĄąĆćĘęŁłŃńÓóŚśŹźŻż]+$/.test(value)) {
        errors[key] = t.invalidAdressError;
      } else {
        delete errors[key];
      }
    }

    if (key === "gender") {
      if (!["male", "female", "other"].includes(value)) {
        errors.gender = t.invalidGenderError;
      } else {
        delete errors.gender;
      }
    }

    if (key === "email") {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        errors.email = t.invalidEmailError;
      } else {
        delete errors.email;
      }
    }

    if (key === "phoneNumber") {
      if (!/^\d{9}$/.test(value)) {
        errors.phoneNumber = t.invalidPhoneError;
      } else {
        delete errors.phoneNumber;
      }
    }

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
          delete errors.pesel;
        }
      }
    }

    setValidationErrors(errors);
  };
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTempAvatarFile(file); // Zapisz plik w stanie
      setAvatarUrl(URL.createObjectURL(file)); // Ustaw podgląd obrazu
      setAvatarError(null); // Wyczyść ewentualne błędy
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserInfo();
        if (data) {
          updateUser(data);
          if (data.avatarPath) {
            fetchProfilePicture(data.avatarPath);
          }
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      } finally {
        setLoading(false);
      }
    };
    if (isAuthenticated) fetchData();

    return () => {
      if (avatarUrl) {
        URL.revokeObjectURL(avatarUrl);
      }
    };
  }, [isAuthenticated]);
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
    if (hasValidationErrors()) return;

    setIsEditing(false);
    setEditableFields({});
    setValidationErrors({});

    try {
      const response = await apiService.post(
        "/User/UpdateInfo",
        editedUser,
        true
      );
      if (response.success) {
        updateUser(editedUser);

        if (tempAvatarFile) {
          const formData = new FormData();
          formData.append("file", tempAvatarFile);

          const avatarResponse = await apiService.post(
            "/User/Avatar/Upload",
            formData,
            true,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          );

          console.log("Avatar upload response:", avatarResponse); // Debugowanie

          if (avatarResponse.success) {
            const newAvatarPath = avatarResponse.data;
            console.log("New Avatar Path:", newAvatarPath); // Debugowanie
            updateUser({ ...user, avatarPath: newAvatarPath });
            await fetchProfilePicture(newAvatarPath);
          } else {
            console.error("Failed to upload avatar:", avatarResponse.message);
            throw new Error(
              avatarResponse.message || "Failed to upload avatar"
            );
          }
        }
      } else {
        throw new Error(response.data);
      }
    } catch (error) {
      console.error("Error saving changes:", error);
    } finally {
      setTempAvatarFile(null);
      setLoading(false);
    }
  };

  const showDetails = () => {
    router.push("/opinion");
  };
  const cancelChanges = () => {
    setIsEditing(false);
    setEditableFields({});
    setValidationErrors({});
    setEditedUser(user);
    setShowDropdown(false);
  };

  const getUserInfo = async () => {
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
              <div onClick={() => showDetails()}>{t.opinions}</div>
            </div>
          )}
        </div>
      </div>

      <div className={styles.profileCard}>
        <div className={styles.avatarSection}>
          {avatarLoading ? (
            <div className={styles.loading}>{t.loadingAvatar}</div>
          ) : avatarUrl ? (
            <Image
              src={avatarUrl}
              alt="User Avatar"
              width={150}
              height={150}
              className={styles.avatar}
            />
          ) : (
            <div className={styles.noAvatar}>
              <Image
                src="FirstAvatar"
                alt="User Avatar"
                width={150}
                height={150}
                className={styles.avatar}
              />
            </div>
          )}
          {isEditing && (
            <div className={styles.profileCard}>
              <label htmlFor="avatarUpload" className={styles.uploadLabel}>
                {t.uploadAvatar}
              </label>
              <input
                type="file"
                id="avatarUpload"
                accept="image/*"
                onChange={handleAvatarChange}
                className={styles.uploadInput}
              />
              {tempAvatarFile && <div className={styles.fileInfo}></div>}
              {avatarError && (
                <span className={styles.error}>{avatarError}</span>
              )}
            </div>
          )}
        </div>

        {Object.keys(user)
          .filter((key) => key !== "id" && key !== "avatarPath")
          .map((key) => {
            return (
              <div className={`${styles.label}_${styles[key]}`}>
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
                    ) : key === "gender" ? (
                      <select
                        value={editedUser[key]}
                        onChange={(e) => handleInputChange(key, e.target.value)}
                        className={styles.editableInput}
                      >
                        <option value="male">{t.male}</option>
                        <option value="female">{t.female}</option>
                        <option value="other">{t.other}</option>
                      </select>
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
                {validationErrors[key] && (
                  <div className={styles.error}>{validationErrors[key]}</div>
                )}
              </div>
            );
          })}
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
            <button
              onClick={saveChanges}
              disabled={hasValidationErrors()}
              className={
                hasValidationErrors()
                  ? styles.locksavebutton
                  : styles.saveButton
              }
            >
              {t.saveChanges}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
