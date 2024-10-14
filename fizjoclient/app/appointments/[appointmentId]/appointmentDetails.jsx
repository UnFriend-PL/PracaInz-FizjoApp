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

const locales = { en, pl };

const AppointmentDetails = ({ appointment }) => {
  const { language } = useContext(LanguageContext);
  const t = locales[language];
  const [isPatientModalOpen, setPatientModalOpen] = useState(false);
  const [isPhysioModalOpen, setPhysioModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const {
    appointmentStatusName,
    patient,
    physiotherapist,
    appointmentDate,
    appointmentDescription,
    notes,
    diagnosis,
    isPaid,
  } = appointment;

  const toggleEditing = () => setIsEditing(!isEditing);

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
          {isEditing ? <FaRegEdit /> : <GiCancel />}
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
      <div className={styles.detailsGroup}>
        <DetailElement
          label={t.diagnosis}
          value={diagnosis || t.noDiagnosisProvided}
        />
        <DetailElement label={t.notes} value={notes || t.noNotesProvided} />
      </div>
      <div className={styles.detailsGroup}>
        <DetailElement
          label={t.description}
          value={appointmentDescription || t.noDescriptionProvided}
        />
        <DetailElement label={t.paid} value={isPaid ? t.yes : t.no} />
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

export default AppointmentDetails;
