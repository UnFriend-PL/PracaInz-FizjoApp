import React, { useState, useContext } from "react";
import styles from "./appointmentDetails.module.scss";
import Modal from "@/app/components/common/modal/modal";
import { format } from "date-fns";
import { pl as plDate } from "date-fns/locale";
import { FaRegEdit } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
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
        <div className={styles.editButton} onClick={toggleEditing}>
          {isEditing ? <GiCancel /> : <FaRegEdit />}
        </div>
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
            isEditing={isEditing}
            onChange={handleInputChange}
            t={t}
          />
          <EditableDetailField
            label={t.notes}
            name="notes"
            value={formData.notes}
            isEditing={isEditing}
            onChange={handleInputChange}
            t={t}
          />
        </div>
        <div className={styles.detailsGroup}>
          <EditableDetailField
            label={t.description}
            name="appointmentDescription"
            value={formData.appointmentDescription}
            isEditing={isEditing}
            onChange={handleInputChange}
            t={t}
          />
          <EditableDetailField
            label={t.paid}
            name="isPaid"
            value={formData.isPaid}
            isEditing={isEditing}
            onChange={handleInputChange}
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

const EditableDetailField = ({
  label,
  name,
  value,
  isEditing,
  onChange,
  t,
}) => {
  if (isEditing) {
    return (
      <div className={styles.detailField}>
        <label className={styles.label}>{label}</label>
        {name === "isPaid" ? (
          <div className={styles.checkboxContainer}>
            <input
              type="checkbox"
              name={name}
              checked={value}
              onChange={onChange}
              className={styles.checkbox}
            />
            <span>{t.paid}</span>
          </div>
        ) : (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            className={styles.textarea}
          />
        )}
      </div>
    );
  } else {
    const displayValue =
      name === "isPaid"
        ? value
          ? t.yes
          : t.no
        : value ||
          t[`no${name.charAt(0).toUpperCase() + name.slice(1)}Provided`] ||
          t.noDataProvided;
    return <DetailElement label={label} value={displayValue} />;
  }
};

export default AppointmentDetails;
