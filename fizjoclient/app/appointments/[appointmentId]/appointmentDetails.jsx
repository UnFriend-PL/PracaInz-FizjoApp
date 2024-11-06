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
import { AppointmentContext } from "./AppointmentContext";

const locales = { en, pl };

const AppointmentDetails = () => {
  const { language } = useContext(LanguageContext);
  const t = locales[language];

  // Access context
  const {
    appointment,
    appointmentId,
    fetchAppointmentDetails,
    readOnly,
    t: contextT,
  } = useContext(AppointmentContext);

  // Component-specific state
  const [isPatientModalOpen, setPatientModalOpen] = useState(false);
  const [isPhysioModalOpen, setPhysioModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedNewStatus, setSelectedNewStatus] = useState(
    appointment.appointmentStatus
  );
  const [formData, setFormData] = useState({
    appointmentDescription: appointment.appointmentDescription || "",
    notes: appointment.notes || "",
    diagnosis: appointment.diagnosis || "",
    isPaid: appointment.isPaid || false,
    appointmentDate: new Date(appointment.appointmentDate),
    status: appointment.appointmentStatus,
  });

  const [selectedNewHour, setSelectedNewHour] = useState(
    `${format(new Date(appointment.appointmentDate), "HH:mm")}`
  );
  const [isAppointmentStatusEditing, setIsAppointmentStatusEditing] =
    useState(false);

  if (!appointment) {
    return <div>{t.loading}</div>;
  }

  const { appointmentStatusName, patient, physiotherapist, appointmentDate } =
    appointment;

  // Handle input changes
  const handleInputChange = (e, date) => {
    if (date) {
      const [hour, minute] = selectedNewHour.split(":").map(Number);
      const newAppointmentDate = new Date(date);
      newAppointmentDate.setHours(hour);
      newAppointmentDate.setMinutes(minute);
      setFormData({
        ...formData,
        appointmentDate: newAppointmentDate,
      });
    } else {
      const { name, value, type, checked } = e.target;
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  // Handle status change
  const handleStatusChange = (newStatus) => {
    setSelectedNewStatus(newStatus);
    setFormData((prevFormData) => ({
      ...prevFormData,
      status: newStatus,
    }));
  };

  // Handle form submit
  const handleFormSubmit = async () => {
    try {
      setIsSaving(true);
      const response = await apiService.put(
        `/Appointments/${appointmentId}/Edit`,
        formData,
        true
      );
      if (response.success) {
        await fetchAppointmentDetails();
        setIsSaving(false);
      }
    } catch (error) {
      setIsSaving(false);
      console.error("Failed to save appointment details:", error);
    }
  };

  // Handle status edit
  const handleStatusEdit = () => {
    setIsAppointmentStatusEditing((prev) => !prev);
  };

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
            value={formData.diagnosis}
            onChange={handleInputChange}
            type="textarea"
            t={t}
          />
          <DetailField
            label={t.notes}
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            type="textarea"
            t={t}
          />
        </div>
        <div className={styles.detailsGroup}>
          <DetailField
            label={t.description}
            name="appointmentDescription"
            value={formData.appointmentDescription}
            onChange={handleInputChange}
            type="textarea"
            t={t}
          />
          <DetailField
            label={t.paid}
            name="isPaid"
            value={formData.isPaid}
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
