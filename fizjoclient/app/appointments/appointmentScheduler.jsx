import React, { useState, useContext } from "react";
import apiService from "@/app/services/apiService/apiService";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import styles from "./appointmentScheduler.module.scss";
import { VscPersonAdd } from "react-icons/vsc";
import Modal from "../components/common/modal/modal";
import Calendar from "../components/common/calendar/calendar";
import PatientDeails from "./patientDetails";
import TimePicker from "../components/common/timePicker/timePicker";
import { LanguageContext } from "@/app/contexts/lang/langContext";
import polish from "./locales/pl.json";
import english from "./locales/en.json";

const locales = { english, polish };

const AppointmentScheduler = () => {
  const { language } = useContext(LanguageContext);
  const t = locales[language];
  const [openSchedulerModal, setOpenSchedulerModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [error, setError] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [showPatientDetails, setShowPatientDetails] = useState(false);
  const [selectedHour, setSelectedHour] = useState("12:00");
  const [appointmentDescription, setAppointmentDescription] = useState("");
  const [notes, setNotes] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [isPaid, setIsPaid] = useState(false);
  const [price, setPrice] = useState(99.99);
  const router = useRouter();

  const searchPatient = async () => {
    if (!searchValue) return;
    console.log(searchValue);
    try {
      const searchPayload = { searchParam: searchValue };
      const response = await apiService.post(
        `/User/FindPatient`,
        searchPayload,
        true
      );
      if (response.success) {
        setSelectedPatient(response.data);
        setError(null);
        console.log(response.data);
      } else {
        setError(response.message);
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred while searching for the patient.");
    }
  };

  const validateAndSubmit = async () => {
    if (
      !selectedPatient ||
      !selectedHour ||
      !price
    ) {
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
      <div className={styles.appointmentSchedulerButton}>
        <VscPersonAdd
          onClick={() => setOpenSchedulerModal(true)}
          title={t.scheduleAppointment}
        />
      </div>

      <Modal
        isOpen={openSchedulerModal}
        header={t.scheduleAppointment}
        size="medium"
        onClose={() => setOpenSchedulerModal(false)}
      >
        {error && <div className={styles.errorMessage}>{error}</div>}
        <div className={styles.searchPanel}>
          <label htmlFor="search" className={styles.searchLabel}>
            {t.patient}:
          </label>
          {selectedPatient ? (
            <div className={styles.searchField}>
              <div className={styles.searchValue}>
                {selectedPatient.firstName} {selectedPatient.lastName}{" "}
                <span
                  className={styles.deletePatient}
                  onClick={() => setSelectedPatient(null)}
                >
                  &times;
                </span>
                <span
                  className={styles.showDetails}
                  onClick={() => {
                    setShowPatientDetails((prev) => !prev);
                  }}
                >
                  {showPatientDetails ? t.showLess : t.showMore}
                </span>
                {showPatientDetails && (
                  <PatientDeails
                    patient={selectedPatient}
                    className={styles.patientDeails}
                  />
                )}
              </div>
            </div>
          ) : (
            <div className={styles.searchField}>
              <input
                className={styles.searchInput}
                type="text"
                name="search"
                placeholder={t.typeEmailPeselPhone}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <button className={styles.searchButton} onClick={searchPatient}>
                {t.search}
              </button>
            </div>
          )}
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

export default AppointmentScheduler;
