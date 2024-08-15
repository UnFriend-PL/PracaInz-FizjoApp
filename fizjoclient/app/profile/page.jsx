"use client";
import React, { useState, useEffect } from "react";
import styles from "./profile.module.scss";
import apiService from "../services/apiService/apiService";

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

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
        setUserProfile(data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Profile</h1>
      <div className={styles.profileCard}>
        {Object.keys(userProfile).map((key) => (
          <div className={styles.field} key={key}>
            <span className={styles.label}>
              {key.replace(/([A-Z])/g, " $1").trim()}:
            </span>
            <span className={styles.value}>{userProfile[key]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
