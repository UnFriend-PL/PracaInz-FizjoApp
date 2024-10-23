"use client";
import React, { useContext, useState, useEffect } from "react";
import apiService from "@/app/services/apiService/apiService";
import { AuthContext } from "@/app/contexts/auth/authContext";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { pl as plDate } from "date-fns/locale";
import styles from "./appointments.module.scss";
import AppointmentScheduler from "./appointmentScheduler";
import { LanguageContext } from "@/app/contexts/lang/langContext";
import pl from "./locales/pl.json";
import en from "./locales/en.json";
import AppointmentStatusButtons from "../components/common/appointmentStatusButtons/appointmentStatusButtons";
import PatientSearch from "../components/patientSearch/patientSearch";
const locales = { en, pl };

const Appointments = () => {
  const router = useRouter();
  const { isAuthenticated } = useContext(AuthContext);
  const { role } = useContext(AuthContext);
  const { language } = useContext(LanguageContext);
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const t = locales[language];

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
              locale: language === "pl" ? plDate : undefined,
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

  const [selectedPatient, setSelectedPatient] = useState(null);
  return (
    <>
      <div className={styles.container}>
        <div className={styles.appointmentsNav}>
          <AppointmentStatusButtons getAppointments={getAppointments} />
          {role == "Physiotherapist" && <AppointmentScheduler />}
          <div className={styles.searchPanel}>
            <PatientSearch onPatientSelect={setSelectedPatient} />
          </div>
        </div>
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
                    locale: language === "pl" ? plDate : undefined,
                  })}
                </span>
                {role === "Physiotherapist" ? (
                  <span>
                    {appointment.patientFirstName} {appointment.patientLastName}
                  </span>
                ) : (
                  <span>
                    {appointment.physiotherapistFirstName}{" "}
                    {appointment.physiotherapistLastName}
                  </span>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default Appointments;
