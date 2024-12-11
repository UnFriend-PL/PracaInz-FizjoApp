import { useContext, useEffect, useState } from "react";
import styles from "./Modal.module.scss";
import pl from "./locales/pl.json";
import en from "./locales/en.json";
import { LanguageContext } from "../contexts/lang/langContext";
import apiService from "@/app/services/apiService/apiService";
import { UserContext } from "@/app/contexts/user/userContext";

const locales = { en, pl };

const ProfileModal = ({
  isOpen,
  onClose,
  userData,
  staffData,
  onSave,
  role,
  workingHours,
}) => {
  const [tempUserData, setTempUserData] = useState({ ...userData });
  const [tempStaffData, setTempStaffData] = useState({ ...staffData });
  const [tempAvatar, setTempAvatar] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const { language } = useContext(LanguageContext);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const { user } = useContext(UserContext);
  const [tempWorkingHours, setTempWorkingHours] = useState([]);

  const t = locales[language];

  const handleWorkingHoursChange = (index, field, value) => {
    const updatedWorkingHours = [...tempWorkingHours];
    updatedWorkingHours[index][field] = value;
    setTempWorkingHours(updatedWorkingHours);
  };

  const getAvailableDays = () => {
    const selectedDays = tempWorkingHours.map((wh) => wh.dayOfWeek);
    const allDays = [
      { value: 1, label: t.monday || "Monday" },
      { value: 2, label: t.tuesday || "Tuesday" },
      { value: 3, label: t.wednesday || "Wednesday" },
      { value: 4, label: t.thursday || "Thursday" },
      { value: 5, label: t.friday || "Friday" },
      { value: 6, label: t.saturday || "Saturday" },
      { value: 7, label: t.sunday || "Sunday" },
    ];
    return allDays.filter((day) => !selectedDays.includes(day.value));
  };
  const addWorkingHourRow = () => {
    if (tempWorkingHours.length < 7) {
      const availableDays = getAvailableDays();
      if (availableDays.length > 0) {
        // Sprawdź, czy dzień już istnieje w tempWorkingHours
        const existingDayIndex = tempWorkingHours.findIndex(
          (wh) => wh.dayOfWeek === availableDays[0].value
        );

        if (existingDayIndex !== -1) {
          // Jeśli istnieje, zaktualizuj istniejący dzień
          const updatedWorkingHours = [...tempWorkingHours];
          updatedWorkingHours[existingDayIndex] = {
            ...updatedWorkingHours[existingDayIndex],
            startHour: "08:00",
            endHour: "16:00",
          };
          setTempWorkingHours(updatedWorkingHours);
        } else {
          // Jeśli nie istnieje, dodaj nowy dzień
          setTempWorkingHours([
            ...tempWorkingHours,
            {
              dayOfWeek: availableDays[0].value,
              startHour: "08:00",
              endHour: "16:00",
            },
          ]);
        }
      }
    }
  };
  const removeWorkingHourRow = (index) => {
    const updatedWorkingHours = [...tempWorkingHours];
    updatedWorkingHours.splice(index, 1); // Usuwanie wiersza
    setTempWorkingHours(updatedWorkingHours);
  };

  useEffect(() => {
    if (workingHours) {
      setTempWorkingHours(workingHours);
    }
  }, [workingHours]);
  useEffect(() => {
    setTempUserData({ ...userData });
  }, [userData]);

  useEffect(() => {
    setTempStaffData({ ...staffData });
  }, [staffData]);

  const handleUserDataChange = (e) => {
    const { name, value } = e.target;
    setTempUserData((prev) => {
      return { ...prev, [name]: value };
    });
    validateField(name, value);
  };

  const handleStaffDataChange = (e) => {
    const { name, value } = e.target;
    setTempStaffData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const validateField = (key, value) => {
    const errors = { ...validationErrors };

    if (key === "firstName" || key === "lastName") {
      if (!/^[A-Za-zĄąĆćĘęŁłŃńÓóŚśŹźŻż]+$/.test(value)) {
        errors[key] = "Invalid name. Only letters are allowed.";
      } else {
        delete errors[key];
      }
    }

    if (key === "city" || key === "country") {
      if (!/^[A-Za-zĄąĆćĘęŁłŃńÓóŚśŹźŻż]+$/.test(value)) {
        errors[key] = "Invalid address. Only letters are allowed.";
      } else {
        delete errors[key];
      }
    }

    if (key === "gender") {
      if (!["Male", "Female", "Other"].includes(value)) {
        errors.gender = "Invalid gender selection.";
      } else {
        delete errors.gender;
      }
    }

    if (key === "email") {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        errors.email = "Invalid email address.";
      } else {
        delete errors.email;
      }
    }

    if (key === "phoneNumber") {
      if (!/^\d{9}$/.test(value)) {
        errors.phoneNumber = "Phone number must be 9 digits.";
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

  const formatDate = (date) => {
    const dateObj = new Date(date);
    const day = String(dateObj.getHours()).padStart(2, "0");
    const month = String(dateObj.getMinutes()).padStart(2, "0");
    const year = dateObj.getFullYear();
    return `${day}-${month}`;
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setTempAvatar(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
      console.log("Wybrany plik:", file);
    }
  };
  const handleSaveWrapper = () => {
    handleSave(tempUserData, tempStaffData, tempAvatar);
  }; // tempAvatar powinno być dostępne tutaj
  const handleSave = async () => {
    if (Object.keys(validationErrors).length > 0) {
      alert("Please fix the errors before saving.");
      return;
    }

    // Dane godzin pracy do zapisu
    const workingHoursPayload = tempWorkingHours.map((wh) => ({
      physiotherapistId: user.id,
      dayOfWeek: wh.dayOfWeek.toString(),
      startHour: wh.startHour,
      endHour: wh.endHour,
    }));

    // Znajdź usunięte godziny pracy
    const removedWorkingHours = workingHours
      .filter(
        (wh) =>
          !tempWorkingHours.some((tempWh) => tempWh.dayOfWeek === wh.dayOfWeek)
      )
      .map((wh) => ({
        physiotherapistId: user.id,
        dayOfWeek: wh.dayOfWeek.toString(),
        startHour: "00:00",
        endHour: "00:00",
      }));

    try {
      // Wyślij usunięte godziny pracy
      for (const removedHour of removedWorkingHours) {
        const response = await apiService.post(
          "/Staff/SaveWorkingHours",
          removedHour,
          true
        );

        if (!response.success) {
          console.error("Błąd zapisu usuniętej godziny pracy:", response.data);
          alert(t.saveError || "Error saving working hours. Try again.");
          return;
        }
      }

      // Wyślij zaktualizowane godziny pracy
      for (const workingHour of workingHoursPayload) {
        const response = await apiService.post(
          "/Staff/SaveWorkingHours",
          workingHour,
          true
        );

        if (!response.success) {
          console.error("Błąd zapisu godzin pracy:", response.data);
          alert(t.saveError || "Error saving working hours. Try again.");
          return;
        }
      }
      console.log("tempAvatar przed zapisaniem:", tempAvatar);

      // Zapisz dane użytkownika i pracownika
      onSave(tempUserData, tempStaffData, tempAvatar);
      alert(t.saveSuccess || "Data saved successfully!");
      onClose();
    } catch (error) {
      console.error("Błąd podczas zapisywania danych:", error);
      alert(t.saveError || "Error saving data. Try again.");
    }
  };

  const handleCancel = () => {
    // Resetowanie tymczasowych danych do początkowych danych
    setTempUserData({ ...userData });
    setTempStaffData({ ...staffData });
    setTempWorkingHours([...workingHours]); // resetujemy godziny pracy

    // Zamknięcie modala
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modal}>
        <div className={styles.form}>
          <div className={styles.sectionUploadAvatar}>
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
            {avatarPreview && (
              <img
                src={avatarPreview}
                alt="Avatar Preview"
                className={styles.uploadPreview}
              />
            )}
          </div>
          <div className={styles.sectionAboutAndAdress}>
            <div className={styles.sectionAboutLeft}>
              <h3 className={styles.titleSection}>About</h3>

              <label className={styles.label}>
                {t.firstName} {": "}
                <input
                  type="text"
                  name="firstName"
                  value={tempUserData.firstName || ""}
                  onChange={handleUserDataChange}
                />
                {validationErrors.firstName && (
                  <div className={styles.error}>
                    {validationErrors.firstName}
                  </div>
                )}
              </label>
              <label className={styles.label}>
                {t.lastName} {": "}
                <input
                  type="text"
                  name="lastName"
                  value={tempUserData.lastName || ""}
                  onChange={handleUserDataChange}
                />
                {validationErrors.lastName && (
                  <div className={styles.error}>
                    {validationErrors.lastName}
                  </div>
                )}
              </label>
              <label className={styles.label}>
                {t.gender} {": "}
                <select
                  name="gender"
                  value={tempUserData.gender || ""}
                  onChange={handleUserDataChange}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {validationErrors.gender && (
                  <div className={styles.error}>{validationErrors.gender}</div>
                )}
              </label>
              <label className={styles.label}>
                {t.dateOfBirth} {": "}
                <input
                  type="date"
                  name="dob"
                  value={tempUserData.dateOfBirth || ""}
                  onChange={handleUserDataChange}
                />
                <span className={styles.readableDate}>
                  {tempUserData.dateOfBirth
                    ? formatDate(tempUserData.dateOfBirth)
                    : ""}
                </span>
              </label>

              <label className={styles.label}>
                {t.pesel}
                {": "}
                <input
                  type="tel"
                  name="pesel"
                  value={tempUserData.pesel || ""}
                  onChange={handleUserDataChange}
                />
                {validationErrors.pesel && (
                  <div className={styles.error}>{validationErrors.pesel}</div>
                )}
              </label>

              <label className={styles.label}>
                {t.phoneNumber} {": "}
                <input
                  type="tel"
                  name="phoneNumber"
                  value={tempUserData.phoneNumber || ""}
                  onChange={handleUserDataChange}
                />
                {validationErrors.phoneNumber && (
                  <div className={styles.error}>
                    {validationErrors.phoneNumber}
                  </div>
                )}
              </label>
              <label className={styles.label}>
                {t.email} {": "}
                <input
                  type="email"
                  name="email"
                  value={tempUserData.email || ""}
                  onChange={handleUserDataChange}
                />
                {validationErrors.email && (
                  <div className={styles.error}>{validationErrors.email}</div>
                )}
              </label>
            </div>
            <div className={styles.sectionAdressRight}>
              <h3 className={styles.titleSection}>Address Data</h3>

              <label className={styles.label}>
                {t.country} {": "}
                <input
                  type="text"
                  name="country"
                  value={tempUserData.country || ""}
                  onChange={handleUserDataChange}
                />
                {validationErrors.country && (
                  <div className={styles.error}>{validationErrors.country}</div>
                )}
              </label>
              <label className={styles.label}>
                {t.city} {": "}
                <input
                  type="text"
                  name="city"
                  value={tempUserData.city || ""}
                  onChange={handleUserDataChange}
                />
                {validationErrors.city && (
                  <div className={styles.error}>{validationErrors.city}</div>
                )}
              </label>
              <label className={styles.label}>
                {t.streetWithHouseNumber} {": "}
                <input
                  type="text"
                  name="address"
                  value={tempUserData.streetWithHouseNumber || ""}
                  onChange={handleUserDataChange}
                />
                {validationErrors.address && (
                  <div className={styles.error}>{validationErrors.address}</div>
                )}
              </label>
              <label className={styles.label}>
                {t.postCode} {": "}
                <input
                  type="text"
                  name="postalCode"
                  value={tempUserData.postCode || ""}
                  onChange={handleUserDataChange}
                />
                {validationErrors.postalCode && (
                  <div className={styles.error}>
                    {validationErrors.postCode}
                  </div>
                )}
              </label>
            </div>
          </div>
          {role === "Physiotherapist" && (
            <div className={styles.x}>
              <div className={styles.sectionStaffDown}>
                <h3 className={styles.titleSection}>Staff Data</h3>
                <label className={styles.label}>
                  {t.education} {": "}
                  <input
                    type="text"
                    name="education"
                    value={tempStaffData.education || ""}
                    onChange={handleStaffDataChange}
                    className={styles.input}
                  />
                </label>
                <label className={styles.label}>
                  {t.yearsOfExperience} {": "}
                  <input
                    type="Number"
                    name="yearsOfExperience"
                    value={tempStaffData.yearsOfExperience || ""}
                    onChange={handleStaffDataChange}
                    className={styles.input}
                  />
                </label>
                <label className={styles.label}>
                  {t.description} {": "}
                  <textarea
                    name="description"
                    value={tempStaffData.description || ""}
                    onChange={handleStaffDataChange}
                    className={styles.textarea}
                  />
                </label>
              </div>

              <div className={styles.sectionStaffDown}>
                <h3 className={styles.titleSection}>
                  {t.workingHours || "Working Hours"}
                </h3>

                <div className={styles.workingHoursForm}>
                  {tempWorkingHours.map((wh, index) => (
                    <div key={index} className={styles.workingHoursRow}>
                      <label>
                        {t.dayOfWeek || "Day of Week"}:
                        <select
                          value={wh.dayOfWeek}
                          onChange={(e) =>
                            handleWorkingHoursChange(
                              index,
                              "dayOfWeek",
                              parseInt(e.target.value)
                            )
                          }
                        >
                          {getAvailableDays()
                            .concat({
                              value: wh.dayOfWeek,
                              label: t[`day${wh.dayOfWeek}`] || "Current Day",
                            }) // Pozwól na zachowanie aktualnego dnia
                            .map((day) => (
                              <option key={day.value} value={day.value}>
                                {day.label}
                              </option>
                            ))}
                        </select>
                      </label>
                      <label>
                        {t.startHour || "Start Hour"}:
                        <input
                          type="time"
                          value={wh.startHour}
                          onChange={(e) =>
                            handleWorkingHoursChange(
                              index,
                              "startHour",
                              e.target.value
                            )
                          }
                        />
                      </label>
                      <label>
                        {t.endHour || "End Hour"}:
                        <input
                          type="time"
                          value={wh.endHour}
                          onChange={(e) =>
                            handleWorkingHoursChange(
                              index,
                              "endHour",
                              e.target.value
                            )
                          }
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() => removeWorkingHourRow(index)}
                        className={styles.removeRowButton}
                      >
                        {t.remove || "Remove"}
                      </button>
                    </div>
                  ))}
                  {tempWorkingHours.length < 7 && (
                    <button
                      type="button"
                      onClick={addWorkingHourRow}
                      className={styles.addRowButton}
                    >
                      {t.addWorkingHours || "Add Working Day"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className={styles.buttonContainer}>
          <button onClick={handleSaveWrapper} className={styles.saveButton}>
            {t.saveChanges}
          </button>
          <button onClick={handleCancel} className={styles.cancelButton}>
            {t.cancelButton}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
