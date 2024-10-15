import React, { useState, useContext, useRef, useEffect } from "react";
import styles from "./appointmentDetails.module.scss";
import Modal from "@/app/components/common/modal/modal";
import { format } from "date-fns";
import { pl as plDate } from "date-fns/locale";
import DetailElement from "@/app/components/common/detailElement/detailElement";
import PatientDetails from "../patientDetails";
import { LanguageContext } from "@/app/contexts/lang/langContext";
import pl from "./locales/pl.json";
import en from "./locales/en.json";
import apiService from "@/app/services/apiService/apiService";

const locales = { en, pl };

const AppointmentDetails = ({ appointment, appointmentId }) => {
  const { language } = useContext(LanguageContext);
  const t = locales[language];
  const [isPatientModalOpen, setPatientModalOpen] = useState(false);
  const [isPhysioModalOpen, setPhysioModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    appointmentDescription: appointment.appointmentDescription || "",
    notes: appointment.notes || "",
    diagnosis: appointment.diagnosis || "",
    isPaid: appointment.isPaid || false,
  });

  const { appointmentStatusName, patient, physiotherapist, appointmentDate } =
    appointment;

  const toggleEditing = () => setIsEditing(!isEditing);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFormSubmit = async () => {
    try {
      const response = await apiService.put(
        `/Appointments/${appointmentId}/Edit`,
        formData,
        true
      );
      if (response.success) {
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Failed to save appointment details:", error);
    }
  };

  return (
    <div className={styles.appointmentCard}>
      <span className={styles.appointmentDate}>
        {format(new Date(appointmentDate), "dd.MM.yyyy HH:mm", {
          locale: language === "pl" ? plDate : undefined,
        })}
      </span>
      <div className={styles.header}>
        <span className={styles.status}>
          {t.appointment}: {appointmentStatusName}
        </span>
      </div>
      <div className={styles.details}>
        <DetailGroup
          title={t.patient}
          name={`${patient.firstName} ${patient.lastName}`}
          onShowDetails={() => setPatientModalOpen(true)}
          t={t}
        />
        <DetailGroup
          title={t.physiotherapist}
          name={`${physiotherapist.firstName} ${physiotherapist.lastName}`}
          onShowDetails={() => setPhysioModalOpen(true)}
          t={t}
        />
      </div>
      <Modal
        isOpen={isPatientModalOpen}
        onClose={() => setPatientModalOpen(false)}
        size="medium"
        header={t.patientDetails}
      >
        <PatientDetails patient={patient} />
      </Modal>
      <Modal
        isOpen={isPhysioModalOpen}
        onClose={() => setPhysioModalOpen(false)}
        size="medium"
        header={t.physiotherapistDetails}
      >
        <DetailElement label={t.firstName} value={physiotherapist.firstName} />
        <DetailElement label={t.lastName} value={physiotherapist.lastName} />
        <DetailElement
          label={t.licenseNumber}
          value={physiotherapist.licenseNumber}
        />
      </Modal>
      <div className={styles.editableDetails}>
        <div className={styles.detailsGroup}>
          <EditableDetailField
            label={t.diagnosis}
            name="diagnosis"
            value={formData.diagnosis}
            onChange={handleInputChange}
            type="textarea"
            t={t}
          />
          <EditableDetailField
            label={t.notes}
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            type="textarea"
            t={t}
          />
        </div>
        <div className={styles.detailsGroup}>
          <EditableDetailField
            label={t.description}
            name="appointmentDescription"
            value={formData.appointmentDescription}
            onChange={handleInputChange}
            type="textarea"
            t={t}
          />
          <EditableDetailField
            label={t.paid}
            name="isPaid"
            value={formData.isPaid}
            onChange={handleInputChange}
            type="checkbox"
            t={t}
          />
        </div>
        {isEditing && (
          <button className={styles.saveButton} onClick={handleFormSubmit}>
            {t.save}
          </button>
        )}
      </div>
    </div>
  );
};

const DetailGroup = ({ title, name, onShowDetails, t }) => (
  <div className={styles.detailsGroup}>
    <div className={styles.detailGroupName}>{title}: </div>
    <div className={styles.header}>{name}</div>
    <button className={styles.detailGroupButton} onClick={onShowDetails}>
      {t.showDetails}
    </button>
  </div>
);

const EditableDetailField = ({ label, name, value, onChange, type, t }) => {
  const [isFieldEditing, setIsFieldEditing] = useState(false);
  const textareaRef = useRef(null);

  const handleDoubleClick = () => {
    setIsFieldEditing(true);
  };

  const handleBlur = () => {
    setIsFieldEditing(false);
  };

  const handleInputChange = (e) => {
    onChange(e);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  if (isFieldEditing) {
    return (
      <div className={styles.detailField}>
        <label className={styles.label}>{label}</label>
        {type === "checkbox" ? (
          <div className={styles.checkboxContainer}>
            <input
              type="checkbox"
              name={name}
              checked={value}
              onChange={onChange}
              className={styles.checkbox}
              onBlur={handleBlur}
              autoFocus
            />
            <span>{t.paid}</span>
          </div>
        ) : (
          <textarea
            name={name}
            value={value}
            onChange={handleInputChange}
            className={styles.textarea}
            onBlur={handleBlur}
            autoFocus
            ref={textareaRef}
            style={{ height: "auto", overflowY: "hidden" }}
          />
        )}
      </div>
    );
  } else {
    const displayValue =
      type === "checkbox"
        ? value
          ? t.yes
          : t.no
        : value ||
          t[`no${name.charAt(0).toUpperCase() + name.slice(1)}Provided`] ||
          t.noDataProvided;

    return (
      <div
        onDoubleClick={handleDoubleClick}
        className={styles.nonEditableField}
      >
        <DetailElement label={label} value={displayValue} />
      </div>
    );
  }
};

export default AppointmentDetails;
