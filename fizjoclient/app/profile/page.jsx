"use client";
import React, { useState, useEffect, useContext } from "react";
import styles from "./profile.module.scss";
import apiService from "../services/apiService/apiService";
import { AuthContext } from "../contexts/auth/authContext";
import { UserContext } from "../contexts/user/userContext";
import { LanguageContext } from "../contexts/lang/langContext";
import pl from "./locales/pl.json";
import en from "./locales/en.json";

const locales = { en, pl };

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useContext(AuthContext);
  const { user, updateUser } = useContext(UserContext);
  const { language } = useContext(LanguageContext);
  const t = locales[language];
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
        <div className={styles.profileNav}>
          {isEditing ? (
            <div className={styles["button"]}>
              <IoSaveOutline onClick={handleSave} title="Save" />
            </div>
          ) : (
            <div className={styles["button"]}>
              <CiEdit onClick={handleEdit} title="Edit" />
            </div>
          )}
        </div>
        {Object.keys(user)
          .filter((key) => key !== "id")
          .map((key) => (
            <div className={styles.field} key={key}>
              <span className={styles.label}>
                {key.replace(/([A-Z])/g, " $1").trim()}:
              </span>
              {isEditing ? (
                <>
                  {key === "gender" ? (
                    <select
                      name="gender"
                      value={userProfile.gender}
                      onChange={handleChange}
                      className={styles.value}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  ) : (
                    <input
                      type={
                        key === "dateOfBirth"
                          ? "date"
                          : key === "pesel" || key === "phoneNumber"
                          ? "number"
                          : "text"
                      }
                      name={key}
                      value={userProfile[key]}
                      onChange={handleChange}
                      className={styles.value}
                    />
                  )}
                  {errors[key] && (
                    <div className={styles.error}>{errors[key]}</div>
                  )}
                </>
              ) : (
                <span className={styles.profileCardEdit}>{user[key]}</span>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Profile;
