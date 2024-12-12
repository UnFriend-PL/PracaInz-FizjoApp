"use client";
import React, { useContext, useEffect, useState } from "react";
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
import Modal from "./Modal";

const locales = { en, pl };

const Profile = () => {
  const router = useRouter();
  const { isAuthenticated } = useContext(AuthContext);
  const { user, updateUser } = useContext(UserContext);
  const { language } = useContext(LanguageContext);
  const t = locales[language];

  const [loading, setLoading] = useState(true);
  const [editableFields, setEditableFields] = useState({});
  const [showDropdown, setShowDropdown] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [editedUser, setEditedUser] = useState(user);
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [workingHours, setWorkingHours] = useState([]);
  const [tempWorkingHours, setTempWorkingHours] = useState(workingHours || []);

  const [staffData, setStaffData] = useState({
    education: "",
    description: "",
    yearsOfExperience: "",
  });
  const { role } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [staffId, setStaffId] = useState(null);
  const handleOpenModal = async () => {
    try {
      const data = await getUserInfo();
      if (data) {
        updateUser(data);
        setEditedUser(data);
        fetchStaffInfo(data.id);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserInfo();
        if (data) {
          updateUser(data);
          setStaffId(data.id);
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

  const fetchProfilePicture = async (avatarPath) => {
    setAvatarLoading(true);
    if (avatarPath) {
      try {
        const url = await fetchAvatar(avatarPath);
        setAvatarUrl(url);
      } catch (error) {
        console.error("Error loading avatar:", error);
        setAvatarUrl(null);
      } finally {
        setAvatarLoading(false);
      }
    } else {
      setAvatarUrl(null);
      setAvatarLoading(false);
    }
  };
  const formatDateToReadable = (dateString) => {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleSave = async (updatedUser, updatedStaffData, tempAvatarFile) => {
    try {
      let userUpdateResponse,
        staffUpdateResponse,
        avatarUploadResponse,
        updateWorkingHours;

      if (updatedUser) {
        try {
          userUpdateResponse = await apiService.post(
            "/User/UpdateInfo",
            updatedUser,
            true
          );
        } catch (error) {
          console.error(
            "Error updating user info:",
            error.response?.data || error.message
          );
          throw new Error("Failed to update user information");
        }
      }
      if (role === "Physiotherapist" && updatedStaffData) {
        try {
          staffUpdateResponse = await apiService.post(
            "/Staff/Update",
            updatedStaffData,
            true
          );
        } catch (error) {
          console.error(
            "Error updating staff data:",
            error.response?.data || error.message
          );
          throw new Error("Failed to update staff data");
        }
      }
      if (tempAvatarFile) {
        const formData = new FormData();
        formData.append("file", tempAvatarFile);
        setUploading(true);
        try {
          avatarUploadResponse = await apiService.post(
            "/User/Avatar/Upload",
            formData,
            true,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          );
        } catch (error) {
          console.error(
            "Error uploading avatar:",
            error.response?.data || error.message
          );
          throw new Error("Failed to upload avatar");
        } finally {
          setUploading(false);
        }
      }
      setUploading(true);

      if (userUpdateResponse?.success) {
        updateUser(updatedUser);
        await getUserInfo();
      }
      if (role === "Physiotherapist" && staffUpdateResponse?.success) {
        await fetchStaffInfo(staffId);
      }
      if (role === "Physiotherapist") {
        await getWorkingHours(staffId);
      }
      if (avatarUploadResponse?.success) {
        const newAvatarPath = avatarUploadResponse.data;
        updateUser({ ...updatedUser, avatarPath: newAvatarPath });
        await fetchProfilePicture(newAvatarPath);
      }
      setLoading(false);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving changes:", error.message || error);
      alert(`Failed to save changes: ${error.message}`);
    }
  };

  const showDetails = () => {
    router.push("/opinion");
  };

  const fetchStaffInfo = async (staffId) => {
    try {
      if (role === "Physiotherapist") {
        const response = await apiService.get(`/Staff/${staffId}`);
        if (response.success) {
          const { education, description, yearsOfExperience } = response.data;
          setStaffData({ education, description, yearsOfExperience });
        } else {
          console.error("Failed to fetch staff data:", response.message);
        }
      }
    } catch (error) {
      console.error("Error fetching staff info:", error);
    }
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

  const getWorkingHours = async () => {
    try {
      const response = await apiService.get(`/Staff/WorkingHours/${staffId}`);
      if (response.success) {
        setWorkingHours(response.data);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error("Error fetching staff info:", error);
      return [];
    }
  };
  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    return `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`;
  };
  useEffect(() => {
    if (isAuthenticated) {
      getUserInfo();
    }
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
        break;
      case "opinion":
        break;
      default:
        break;
    }
    setShowDropdown(false);
  };
  useEffect(() => {
    if (isAuthenticated) {
      const fetchData = async () => {
        try {
          const data = await getUserInfo();
          if (data) {
            updateUser(data);
            setStaffId(data.id);
            if (data.avatarPath) {
              fetchProfilePicture(data.avatarPath);
            }
          }
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
      };
      fetchData();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (staffId) {
      fetchStaffInfo(staffId);
      getWorkingHours(staffId);
    }
  }, [staffId]);

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
      <div className={styles.dropdownContainer}>
        <FaCaretDown className={styles.dropdownIcon} onClick={toggleDropdown} />
        {showDropdown && (
          <div className={styles.dropdownMenu}>
            <div onClick={() => handleMenuClick("appointments")}>
              {t.appointments}
            </div>
            <div onClick={() => showDetails()}>{t.opinions}</div>
          </div>
        )}
      </div>

      <div className={styles.profileContainer}>
        <div className={styles.profileHeader}>
          <div className={styles.avatarWrapper}>
            {avatarLoading ? (
              <div className={styles.avatarLoading}>{t.loadingAvatar}</div>
            ) : avatarUrl ? (
              <Image
                src={avatarUrl}
                alt="User Avatar"
                width={150}
                height={150}
                className={styles.avatarImage}
              />
            ) : (
              <div className={styles.noAvatar}>
                <Image
                  src="/default-avatar.png"
                  alt="User Avatar"
                  width={150}
                  height={150}
                  className={styles.avatarImage}
                />
              </div>
            )}
          </div>
          {role === "Physiotherapist" && (
            <>
              <div className={styles.profileInfo}>
                <div className={styles.profileField}>
                  <span className={styles.fieldLabel}>{t.education}</span>
                  <span className={styles.fieldValue}>
                    {staffData.education || t.notAvailable}
                  </span>
                </div>

                <div className={styles.profileField}>
                  <span className={styles.fieldLabel}>
                    {t.yearsOfExperience}:
                  </span>
                  <span className={styles.fieldValue}>
                    {staffData.yearsOfExperience || t.notAvailable}
                  </span>
                </div>
                {staffData.description && (
                  <div className={styles.profileDescription}>
                    <div className={styles.profileDescriptionTitle}>
                      <span className={styles.fieldLabel}>
                        {t.description}:
                      </span>
                    </div>
                    <div className={styles.profileDescriptionValue}>
                      <span className={styles.fieldValue}>
                        {staffData.description}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        <div className={styles.profileColumnPersonInfomration}>
          <div className={styles.profilPersonInfomrationTitle}>
            {t.personInformation}
          </div>
          {[
            "firstName",
            "lastName",
            "gender",
            "pesel",
            "dateOfBirth",
            "phoneNumber",
            "email",
          ].map((key) => {
            if (!user[key]) return null;
            return (
              <div className={styles.fieldItem} key={key}>
                <div className={styles.field}>
                  <span className={styles.fieldLabel}>
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
                    <span
                      className={`${styles.fieldValue} ${styles.nonEditable}`}
                    >
                      {key === "dateOfBirth"
                        ? formatDateToReadable(user[key])
                        : user[key]}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles.profileRightColumn}>
          <div className={styles.profileColumnAddress}>
            <div className={styles.addressTitle}>{t.adress}</div>
            {["country", "city", "streetWithHouseNumber", "postCode"].map(
              (key) => {
                if (!user[key]) return null;
                return (
                  <div className={styles.fieldItem} key={key}>
                    <div className={styles.field}>
                      <span className={styles.fieldLabel}>
                        {t[key] || key.replace(/([A-Z])/g, " $1").trim()}:
                      </span>
                      {editableFields[key] ? (
                        <input
                          type="text"
                          value={editedUser[key]}
                          onChange={(e) =>
                            handleInputChange(key, e.target.value)
                          }
                          className={styles.editableInput}
                        />
                      ) : (
                        <span
                          className={`${styles.fieldValue} ${styles.nonEditable}`}
                        >
                          {user[key]}
                        </span>
                      )}
                    </div>
                  </div>
                );
              }
            )}
          </div>
          {role === "Physiotherapist" && workingHours && (
            <div className={styles.profileColumnWorkingHours}>
              <div className={styles.workingHoursTitle}>{t.workingHours}</div>
              {workingHours.length > 0 ? (
                workingHours
                  .sort((a, b) => a.dayOfWeek - b.dayOfWeek)
                  .map((hour) => (
                    <div className={styles.fieldItem} key={hour.dayOfWeek}>
                      <div className={styles.field}>
                        <span className={styles.fieldLabel}>
                          {t[`day${hour.dayOfWeek}`]}:
                        </span>
                        <span
                          className={`${styles.fieldValue} ${styles.nonEditable}`}
                        >
                          {formatTime(hour.startHour)} -{" "}
                          {formatTime(hour.endHour)}{" "}
                        </span>
                      </div>
                    </div>
                  ))
              ) : (
                <div className={styles.fieldItem}>
                  <span className={styles.noWorkingHours}>
                    {t.noWorkingHours}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className={styles.buttonWrapper}>
        <button className={styles.actionButton} onClick={handleOpenModal}>
          {t.editButton}
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        staffData={staffData}
        userData={user}
        onSave={handleSave}
        role={role}
        title="Edit Profile"
        workingHours={workingHours}
      ></Modal>
    </div>
  );
};

export default Profile;
