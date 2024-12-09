import {useContext, useEffect, useState} from "react";
import styles from "./Modal.module.scss";
import pl from "./locales/pl.json";
import en from "./locales/en.json";
import {LanguageContext} from "../contexts/lang/langContext";
import apiService from "@/app/services/apiService/apiService";
import {UserContext} from "@/app/contexts/user/userContext";

const locales = {en, pl};

const ProfileModal = ({
                          isOpen,
                          onClose,
                          userData,
                          staffData,
                          onSave,
                          role,
                      }) => {
    const [tempUserData, setTempUserData] = useState({...userData});
    const [tempStaffData, setTempStaffData] = useState({...staffData});
    const [tempAvatar, setTempAvatar] = useState(null);
    const [validationErrors, setValidationErrors] = useState({});
    const {language} = useContext(LanguageContext);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const {user} = useContext(UserContext);
    // Stan do przechowywania godzin pracy
    const [tempWorkingHours, setTempWorkingHours] = useState([
        // Przykładowe dane początkowe (można pobrać z API, jeśli istnieje endpoint do pobrania)
        {dayOfWeek: 1, startHour: "09:00", endHour: "17:00"},  // Poniedziałek
        {dayOfWeek: 2, startHour: "09:00", endHour: "17:00"}   // Wtorek
    ]);

    const t = locales[language];

    useEffect(() => {
        setTempUserData({...userData});
    }, [userData]);

    useEffect(() => {
        setTempStaffData({...staffData});
    }, [staffData]);

    const handleUserDataChange = (e) => {
        const {name, value} = e.target;
        setTempUserData((prev) => {
            return {...prev, [name]: value};
        });
        validateField(name, value);
    };

    const handleStaffDataChange = (e) => {
        const {name, value} = e.target;
        setTempStaffData((prev) => ({...prev, [name]: value}));
        validateField(name, value);
    };

    const handleWorkingHoursChange = (index, field, value) => {
        const updated = [...tempWorkingHours];
        updated[index][field] = value;
        setTempWorkingHours(updated);
    };

    const validateField = (key, value) => {
        const errors = {...validationErrors};

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
        const day = String(dateObj.getDate()).padStart(2, "0");
        const month = String(dateObj.getMonth() + 1).padStart(2, "0");
        const year = dateObj.getFullYear();
        return `${day}-${month}-${year}`;
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
        }
    };

    const handleSaveWorkingHours = async () => {
        console.log(user)
        for (const wh of tempWorkingHours) {
            const workingHours = {
                PhysiotherapistId: user.id,
                DayOfWeek: wh.dayOfWeek.toString(),
                StartHour: wh.startHour,
                EndHour: wh.endHour,
            };
            const response = await apiService.post("/Staff/SaveWorkingHours",
                workingHours
            , true);

            if (!response.ok) {
                console.error("Error saving working hours:", wh, response.message);
            }
        }
    };

    const handleSave = async () => {
        if (Object.keys(validationErrors).length === 0) {
            await onSave(tempUserData, tempStaffData, tempAvatar);

            if (role === "Physiotherapist") {
                await handleSaveWorkingHours();
            }

            onClose();
        } else {
            alert("Please fix the errors before saving.");
        }
    };

    const handleCancel = () => {
        setTempUserData({});
        setTempStaffData({});
        setTempAvatar({});
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

                            {/* Sekcja godzin pracy */}
                            <h3 className={styles.titleSection}>{t.workingHours || "Working Hours"}</h3>
                            {tempWorkingHours.map((wh, index) => (
                                <div key={index} className={styles.workingHoursRow}>
                                    <label>
                                        {t.dayOfWeek || "Day of Week"}:
                                        <select
                                            value={wh.dayOfWeek}
                                            onChange={e => handleWorkingHoursChange(index, 'dayOfWeek', parseInt(e.target.value))}
                                        >
                                            <option value={0}>{t.sunday || "Sunday"}</option>
                                            <option value={1}>{t.monday || "Monday"}</option>
                                            <option value={2}>{t.tuesday || "Tuesday"}</option>
                                            <option value={3}>{t.wednesday || "Wednesday"}</option>
                                            <option value={4}>{t.thursday || "Thursday"}</option>
                                            <option value={5}>{t.friday || "Friday"}</option>
                                            <option value={6}>{t.saturday || "Saturday"}</option>
                                        </select>
                                    </label>
                                    <label>
                                        {t.startHour || "Start Hour"}:
                                        <input
                                            type="time"
                                            value={wh.startHour}
                                            onChange={e => handleWorkingHoursChange(index, 'startHour', e.target.value)}
                                        />
                                    </label>
                                    <label>
                                        {t.endHour || "End Hour"}:
                                        <input
                                            type="time"
                                            value={wh.endHour}
                                            onChange={e => handleWorkingHoursChange(index, 'endHour', e.target.value)}
                                        />
                                    </label>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => setTempWorkingHours([...tempWorkingHours, {
                                    dayOfWeek: 1,
                                    startHour: "",
                                    endHour: ""
                                }])}
                            >
                                {t.addDay || "Add Day"}
                            </button>
                        </div>
                    )}
                </div>

                <div className={styles.buttonContainer}>
                    <button onClick={handleSave} className={styles.saveButton}>
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
