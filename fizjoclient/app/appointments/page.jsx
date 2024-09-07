"use client";
import React, { useState, useEffect } from "react";
import apiService from "@/app/services/apiService/apiService";
import { AuthContext } from "@/app/contexts/auth/authContext";
import { useRouter } from "next/navigation";
import { format, set } from "date-fns";
import { pl } from "date-fns/locale";
import styles from "./appointments.module.scss";
import { VscPersonAdd } from "react-icons/vsc";
import Modal from "../components/common/modal/modal";
import Select from "react-select";
import Calendar from "../components/common/calendar/calendar";
import DetailElement from "../components/common/detailElement/detailElement";
import PatientDeails from "./patientDetails";
import TimePicker from "../components/common/timePicker/timePicker";

const Appointments = () => {
  const router = useRouter();
  const { isAuthenticated } = React.useContext(AuthContext);
  const { role } = React.useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const getAppointments = async (status = "Scheduled") => {
    try {
      const response = await apiService.get(
        `/Appointments/All?Status=${status}&?Page=${page}`,
        {},
        true
      );

      const formattedAppointments = response.data.appointments.reduce(
        (acc, appointment) => {
          const date = format(
            new Date(appointment.appointmentDate),
            "dd.MM.yyyy",
            {
              locale: pl,
            }
          );
          if (!acc[date]) {
            acc[date] = [];
          }
          acc[date].push(appointment);
          return acc;
        },
        {}
      );
      setAppointments(formattedAppointments);
      setPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const showDetails = (appointment) => () => {
    router.push(`/appointments/${appointment.appointmentId}`);
  };

  useEffect(() => {
    if (isAuthenticated) {
      getAppointments();
    }
  }, [isAuthenticated]);

  return (
    <>
      {role == "Physiotherapist" && (
        <>
          <div className={styles.container}>
            <AppointmentScheduler />
          </div>
          <div className={styles.container}>
            {Object.keys(appointments).map((date) => (
              <div key={date} className={styles.dateGroup}>
                <span className={styles.date}>{date}</span>
                {appointments[date].map((appointment) => (
                  <div
                    key={appointment.appointmentId}
                    className={styles.appointmentCard}
                    onClick={showDetails(appointment)}
                  >
                    <span>
                      {format(new Date(appointment.appointmentDate), "HH:mm", {
                        locale: pl,
                      })}
                    </span>
                    <span>Appointment title</span>
                    {role === "physiotherapist" ? (
                      <span>{appointment.patientFirstName}</span>
                    ) : (
                      <span>{appointment.physiotherapistFirstName}</span>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Appointments;

const AppointmentScheduler = () => {
  const [openSchedulerModal, setOpenSchedulerModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [error, setError] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [showPatientDetails, setShowPatientDetails] = useState(false);
  const [selectedHour, setSelectedHour] = useState(null);
  const [appointmentDescription, setAppointmentDescription] = useState("");
  const [notes, setNotes] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [isPaid, setIsPaid] = useState(false);
  const [price, setPrice] = useState(0);
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
      !appointmentDescription ||
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
          data-title={"Schedule an appointment"}
        />
      </div>

      <Modal
        isOpen={openSchedulerModal}
        header={"Schedule an appointment"}
        size="medium"
        onClose={() => setOpenSchedulerModal(false)}
      >
        {error && <div className={styles.errorMessage}>{error}</div>}
        <div className={styles.searchPanel}>
          <label htmlFor="search" className={styles.searchLabel}>
            Patient:
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
                  {showPatientDetails ? "show less" : "show more"}
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
                placeholder="Type email, pesel or phone number"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <button className={styles.searchButton} onClick={searchPatient}>
                Search
              </button>
            </div>
          )}
          <div className={styles.searchField}>
            <div className={styles.searchLabel}>Price:</div>
            <div className={styles.searchValue}>
              <input
                className={styles.searchInput}
                type="number"
                name="price"
                placeholder="Price in pln"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.searchField}>
            <div className={styles.searchLabel}>Description:</div>
            <div className={styles.searchValue}>
              <input
                className={styles.searchInput}
                type="text"
                name="description"
                placeholder="Appointment description"
                value={appointmentDescription}
                onChange={(e) => setAppointmentDescription(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.searchField}>
            <div className={styles.searchLabel}>Notes:</div>
            <div className={styles.searchValue}>
              <input
                className={styles.searchInput}
                type="text"
                name="notes"
                placeholder="Notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.searchField}>
            <div className={styles.searchLabel}>Diagnosis:</div>
            <div className={styles.searchValue}>
              <input
                className={styles.searchInput}
                type="text"
                name="diagnosis"
                placeholder="Diagnosis"
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.searchField}>
            <div className={styles.searchLabel}>Is Paid:</div>
            <div className={styles.searchValue}>
              <input
                type="checkbox"
                name="isPaid"
                checked={isPaid}
                onChange={(e) => setIsPaid(e.target.checked)}
              />
            </div>
          </div>
          <div className={styles.searchLabel}>Select appointment hour:</div>
          <div className={styles.searchValue}>
            <TimePicker onTimeChange={setSelectedHour}></TimePicker>
          </div>
          <div className={styles.searchLabel}>Select date:</div>
          <div className={styles.searchValue}>
            {format(selectedDate, "dd MMMM yyyy")}
          </div>
          <Calendar onDateSelect={setSelectedDate} />
          <div className={styles.searchField}>
            <button className={styles.submitButton} onClick={validateAndSubmit}>
              Schedule Appointment
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
