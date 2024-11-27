import React, { useState, useContext, useEffect } from "react";
import styles from "./appointmentDetails.module.scss";
import Modal from "@/app/components/common/modal/modal";
import { format } from "date-fns";
import { pl as plDate } from "date-fns/locale";
import PatientDetails from "../../components/patientSearch/patientDetails";
import { LanguageContext } from "@/app/contexts/lang/langContext";
import pl from "./locales/pl.json";
import en from "./locales/en.json";
import apiService from "@/app/services/apiService/apiService";
import DetailField from "@/app/components/common/detailField/detailField";
import DetailGroup from "@/app/components/detailGroup/DetailGroup";
import DetailElement from "@/app/components/common/detailElement/detailElement";
import Calendar from "@/app/components/common/calendar/calendar";
import TimePicker from "@/app/components/common/timePicker/timePicker";
import AppointmentStatusButtons from "@/app/components/common/appointmentStatusButtons/appointmentStatusButtons";
import { AppointmentContext } from "../AppointmentContext";

const locales = { en, pl };

const AppointmentDetails = () => {
  const {
    appointment,
    fetchAppointmentDetails,
    readOnly,
    isPatientModalOpen,
    setPatientModalOpen,
    isPhysioModalOpen,
    setPhysioModalOpen,
    isSaving,
    selectedNewStatus,
    setSelectedNewStatus,
    appointmentsDetailsFormData,
    setAppointmentsDetailsFormData,
    selectedNewHour,
    setSelectedNewHour,
    isAppointmentStatusEditing,
    setIsAppointmentStatusEditing,
    handleInputChange,
    handleStatusChange,
    handleFormSubmit,
    handleStatusEdit,
      language,
  } = useContext(AppointmentContext);

  const t = locales[language];

  if (!appointment) {
    return <div>{t.loading}</div>;
  }

  const { appointmentStatusName, patient, physiotherapist, appointmentDate } =
      appointment;

  return (
    <div className={styles.appointmentCard}>
      <span className={styles.appointmentDate}>
        {format(new Date(appointmentDate), "dd.MM.yyyy HH:mm", {
          locale: language === "pl" ? plDate : undefined,
        })}
      </span>
      <div className={styles.header}>
        <span className={styles.status} onClick={handleStatusEdit}>
          {t.appointment}: {appointmentStatusName}
        </span>
        {isAppointmentStatusEditing && (
          <Modal
            isOpen={isAppointmentStatusEditing}
            header={t.selectNewStatus}
            onClose={() => setIsAppointmentStatusEditing((prev) => !prev)}
            size="medium"
          >
            <div className={styles.statusChangeContainer}>
              <div className={styles.statusButtons}>
                <AppointmentStatusButtons
                  defaultStatus={selectedNewStatus}
                  onStatusChange={handleStatusChange}
                />
              </div>
              <TimePicker
                initialTime={selectedNewHour}
                onTimeChange={setSelectedNewHour}
              />
              <Calendar
                onDateSelect={(date) => {
                  handleInputChange(null, date);
                }}
              />
            </div>
          </Modal>
        )}
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
          <DetailField
            label={t.diagnosis}
            name="diagnosis"
            value={appointmentsDetailsFormData.diagnosis}
            onChange={handleInputChange}
            type="textarea"
            t={t}
          />
          <DetailField
            label={t.notes}
            name="notes"
            value={appointmentsDetailsFormData.notes}
            onChange={handleInputChange}
            type="textarea"
            t={t}
          />
        </div>
        <div className={styles.detailsGroup}>
          <DetailField
            label={t.description}
            name="appointmentDescription"
            value={appointmentsDetailsFormData.appointmentDescription}
            onChange={handleInputChange}
            type="textarea"
            t={t}
          />
          <DetailField
            label={t.paid}
            name="isPaid"
            value={appointmentsDetailsFormData.isPaid}
            onChange={handleInputChange}
            type="checkbox"
            t={t}
          />
        </div>
        <button className={styles.saveButton} onClick={handleFormSubmit}>
          {isSaving ? t.saveDetailsInProgress : t.saveDetails}
        </button>
      </div>
    </div>
  );
};

export default AppointmentDetails;
