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
import Image from "next/image";

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
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [avatarError, setAvatarError] = useState(null);

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
        if (key !== "avatarPath") {
          // Exclude avatarPath from being editable here
          acc[key] = true;
        }
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
      setLoading(true);
      const response = await apiService.post("/User/UpdateInfo", user, true);
      if (response.success) {
        updateUser(response.data);
      } else {
        throw new Error(response.message || "Failed to update user info");
      }
    } catch (error) {
      console.error("Error updating user info:", error);
    } finally {
      setLoading(false);
    }
  };

  const getUserInfo = async () => {
    try {
      const response = await apiService.get("/User/GetInfo", null, true);
      if (response.success) {
        return response.data;
      } else {
        throw new Error(response.message || "Failed to fetch user info");
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
      return null;
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);
    try {
      const response = await apiService.post(
        "/User/Avatar/Upload",
        formData,
        true,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (response.success) {
        updateUser({ ...user, avatarPath: response.data });
        fetchAvatar(response.data.avatarPath);
      } else {
        throw new Error(response.message || "Failed to upload avatar");
      }
    } catch (error) {
      console.error("Error uploading avatar:", error);
    } finally {
      setUploading(false);
      await fetchAvatar(user.avatarPath);
    }
  };

  const fetchAvatar = async (avatarPath) => {
    if (!avatarPath) {
      setAvatarUrl(null);
      return;
    }

    setAvatarLoading(true);
    setAvatarError(null);
    try {
      const blob = await apiService.get(
        `/User/Avatar/Get/${avatarPath}`,
        null,
        true,
        {
          responseType: "blob",
        }
      );

      console.log("Blob:", blob);
      console.log("Blob type:", blob.type);
      console.log("Instance of Blob:", blob instanceof Blob);

      if (blob instanceof Blob && blob.size > 0) {
        const imageUrl = URL.createObjectURL(blob);
        setAvatarUrl(imageUrl);
      } else {
        throw new Error("Received invalid Blob data");
      }
    } catch (error) {
      console.error("Error fetching avatar:", error);
      setAvatarError("Failed to load avatar.");
    } finally {
      setAvatarLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserInfo();
        if (data) {
          updateUser(data);
          if (data.avatarPath) {
            fetchAvatar(data.avatarPath);
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
            <></>
          )}
        </div>
        <div className={styles.avatarSection}>
          <div className={styles.uploadSection}>
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
            {uploading && (
              <span className={styles.uploading}>{t.uploading}</span>
            )}
            {avatarError && <span className={styles.error}>{avatarError}</span>}
          </div>
        </div>
        <button onClick={enableEditAllFields} className={styles.editButton}>
          <FaRegEdit className={styles.editIcon} />{" "}
          {isEditing ? t.saveChanges : t.editAllFields}
        </button>

        {Object.keys(user)
          .filter((key) => key !== "Id" && key !== "avatarPath")
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

        {isDirty && (
          <button onClick={saveChanges} className={styles.saveButton}>
            {t.saveChanges}
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
