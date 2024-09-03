"use client";
import React, { useState, useEffect } from "react";
import apiService from "@/app/services/apiService/apiService";
import { AuthContext } from "@/app/contexts/auth/authContext";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import styles from "./appointments.module.scss";
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
  );
};

export default Appointments;
