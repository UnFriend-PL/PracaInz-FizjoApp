import React, { useState, useContext } from "react";
import apiService from "@/app/services/apiService/apiService";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import styles from "./appointmentScheduler.module.scss";
import { VscPersonAdd } from "react-icons/vsc";
import Modal from "../components/common/modal/modal";
import Calendar from "../components/common/calendar/calendar";
import PatientDeails from "../components/patientSearch/patientDetails";
import TimePicker from "../components/common/timePicker/timePicker";
import { LanguageContext } from "@/app/contexts/lang/langContext";
import pl from "./locales/pl.json";
import en from "./locales/en.json";
import PatientSearch from "../components/patientSearch/patientSearch";
import {AuthContext} from "@/app/contexts/auth/authContext";

const locales = { en, pl };

const AppointmentScheduler = () => {
  const { language } = useContext(LanguageContext);
  const t = locales[language];
  const [openSchedulerModal, setOpenSchedulerModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [error, setError] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [selectedHour, setSelectedHour] = useState("12:00");
  const [appointmentDescription, setAppointmentDescription] = useState("");
  const [notes, setNotes] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [isPaid, setIsPaid] = useState(false);
  const [price, setPrice] = useState(99.99);
  const router = useRouter();

  const validateAndSubmit = async () => {

    if (!selectedPatient || !selectedHour || !price) {
      setError("All fields are required.");
      return;
    }

    const [hour, minute] = selectedHour.split(":").map(Number);
    const appointmentDate = new Date(selectedDate);
    appointmentDate.setHours(hour);
    appointmentDate.setMinutes(minute);

    const payload = {
      patientId: selectedPatient.id,
      appointmentDate: appointmentDate.toISOString(),
      appointmentDescription,
      notes,
      diagnosis,
      isPaid,
      price,
    };

    try {
      const response = await apiService.post(
        `/Appointments/Appointment/Create`,
        payload,
        true
      );
      if (response.success) {
        setError(null);
        setOpenSchedulerModal(false);
        router.push(`/appointments/${response.data.appointmentId}`);
      } else {
        setError(response.message);
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred while creating the appointment.");
    }
  };

  return (
    <div className={styles.appointmentScheduler}>
      <AppointmentSchedulerButton
        onClick={() => setOpenSchedulerModal(true)}
        title={t.scheduleAppointment}
      />
      <Modal
        isOpen={openSchedulerModal}
        header={t.scheduleAppointment}
        size="medium"
        onClose={() => setOpenSchedulerModal(false)}
      >
        {error && <div className={styles.errorMessage}>{error}</div>}
        <div className={styles.searchPanel}>
          <PatientSearch onPatientSelect={setSelectedPatient} t={t} />
          {selectedPatient && (
            <>
              <div className={styles.searchField}>
                <div className={styles.searchLabel}>{t.price}:</div>
                <div className={styles.searchValue}>
                  <input
                    className={styles.searchInput}
                    type="number"
                    name="price"
                    placeholder={t.price}
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className={styles.searchLabel}>{t.isPaid}:</div>
                <div className={styles.searchValue}>
                  <input
                    type="checkbox"
                    name="isPaid"
                    checked={isPaid}
                    onChange={(e) => setIsPaid(e.target.checked)}
                  />
                </div>
              </div>
              <div className={styles.searchField}>
                <div className={styles.searchLabel}>{t.description}:</div>
                <div className={styles.searchValue}>
                  <input
                    className={styles.searchInput}
                    type="text"
                    name="description"
                    placeholder={t.description}
                    value={appointmentDescription}
                    onChange={(e) => setAppointmentDescription(e.target.value)}
                  />
                </div>
              </div>
              <div className={styles.searchField}>
                <div className={styles.searchLabel}>{t.notes}:</div>
                <div className={styles.searchValue}>
                  <input
                    className={styles.searchInput}
                    type="text"
                    name="notes"
                    placeholder={t.notes}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
              </div>
              <div className={styles.searchField}>
                <div className={styles.searchLabel}>{t.diagnosis}:</div>
                <div className={styles.searchValue}>
                  <input
                    className={styles.searchInput}
                    type="text"
                    name="diagnosis"
                    placeholder={t.diagnosis}
                    value={diagnosis}
                    onChange={(e) => setDiagnosis(e.target.value)}
                  />
                </div>
              </div>
            </>
          )}
          <div className={styles.searchField}>
            <div className={styles.searchLabel}>{t.selectAppointmentHour}:</div>
            <div className={styles.searchValue}>
              <TimePicker onTimeChange={setSelectedHour}></TimePicker>
            </div>
          </div>
          <div className={styles.searchField}>
            <div className={styles.searchLabel}>{t.selectDate}:</div>
            <div className={styles.searchValue}>
              {format(selectedDate, "dd MMMM yyyy")}
            </div>
          </div>
          <Calendar onDateSelect={setSelectedDate} />
          <div className={styles.searchField}>
            <button className={styles.submitButton} onClick={validateAndSubmit}>
              {t.scheduleAppointmentButton}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const AppointmentSchedulerButton = ({ onClick, title }) => {
  return (
    <div className={styles.appointmentSchedulerButton}>
      <VscPersonAdd onClick={onClick} title={title} />
    </div>
  );
};

export default AppointmentScheduler;
