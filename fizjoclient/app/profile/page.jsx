"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { CiEdit } from "react-icons/ci";
import { IoSaveOutline } from "react-icons/io5";
import styles from "./profile.module.scss";
import apiService from "../services/apiService/apiService";
import { validateField } from "../validation";
import { AuthContext } from "../contexts/auth/authContext";
import { UserContext } from "../contexts/user/userContext";

const Profile = () => {
  const [userProfile, setUserProfile] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    country: "",
    city: "",
    streetWithHouseNumber: "",
    postCode: "",
    pesel: "",
    dateOfBirth: new Date(),
    email: "",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const { isAuthenticated } = React.useContext(AuthContext);
  const { user, updateUser } = React.useContext(UserContext);

  const formatDate = (dateString) => {
    return dateString ? dateString.split("T")[0] : "";
  };

  const getUserInfo = async (e) => {
    e.preventDefault();
    try {
      const response = await apiService.get("/User/GetInfo", null, true);
      if (response.success) {
        const userData = response.data;
        userData.dateOfBirth = formatDate(userData.dateOfBirth);
        return userData;
      } else {
        throw new Error(response.data);
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!isAuthenticated) {
      console.error("User is not authenticated");
      return;
    }
    const newErrors = {};
    Object.keys(userProfile).forEach((key) => {
      const error = validateField(key, userProfile[key]);
      if (error) {
        newErrors[key] = error;
      }
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      try {
        const formattedProfile = {
          firstName: userProfile.firstName || "",
          lastName: userProfile.lastName || "",
          gender: userProfile.gender || "",
          country: userProfile.country || "",
          city: userProfile.city || "",
          streetWithHouseNumber: userProfile.streetWithHouseNumber || "",
          postCode: userProfile.postCode || "",
          pesel: userProfile.pesel || "",
          dateOfBirth: userProfile.dateOfBirth || "",
          email: userProfile.email || "",
          phoneNumber: userProfile.phoneNumber || "",
        };

        const response = await apiService.put(
          "/User/EditInfoUser",
          formattedProfile,
          true
        );
        if (response.success) {
          setIsEditing(false);
        } else {
          throw new Error(response.data);
        }
      } catch (error) {
        console.error("Error updating user info:", error);
      }
    } else {
      console.error("Validation errors:", newErrors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));

    const error = validateField(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserInfo({ preventDefault: () => {} });
        setUserProfile(data);
        updateUser(data);
      } catch (error) {
        console.error("Error fetching user info:", error);
        console.log(userProfile.dateOfBirth);
      }
    };
    if (isAuthenticated) fetchData();
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Profile</h1>
        <div className={styles.profileCard}>
          <div className={styles.field}>
            <span className={styles.label}>Error:</span>
            <span className={styles.value}>You are not authenticated</span>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Profile</h1>
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
