"use client";
import React, {useContext, useEffect, useState} from "react";
import apiService from "@/app/services/apiService/apiService";
import {AuthContext} from "@/app/contexts/auth/authContext";
import {useRouter} from "next/navigation";
import {format} from "date-fns";
import {pl as plDate} from "date-fns/locale";
import styles from "./appointments.module.scss";
import AppointmentScheduler from "./appointmentScheduler";
import {LanguageContext} from "@/app/contexts/lang/langContext";
import pl from "./locales/pl.json";
import en from "./locales/en.json";
import AppointmentStatusButtons from "../components/common/appointmentStatusButtons/appointmentStatusButtons";
import PatientSearch from "../components/patientSearch/patientSearch";

const locales = {en, pl};

const Appointments = () => {
    const router = useRouter();
    const {isAuthenticated} = useContext(AuthContext);
    const {role} = useContext(AuthContext);
    const {language} = useContext(LanguageContext);
    const [loading, setLoading] = useState(true);
    const [appointments, setAppointments] = useState({});
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedPatient, setSelectedPatient] = useState(null);
    const t = locales[language];

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const mergeAppointmentsByDate = (oldAppointments, newAppointments) => {
        const merged = {...oldAppointments};
        for (const date in newAppointments) {
            if (!merged[date]) {
                merged[date] = newAppointments[date];
            } else {
                merged[date] = [...merged[date], ...newAppointments[date]];
            }
        }
        return merged;
    };

    const getAppointments = async (status = 0, currentPage = 0) => {
        try {
            const formattedDate = selectedDate
                ? format(new Date(selectedDate), "yyyy-MM-dd")
                : null;

            const payload = {
                status: status,
                page: currentPage,
            };
            if (selectedPatient) {
                payload.patientId = selectedPatient.id;
            }
            if (formattedDate) {
                payload.date = formattedDate;
            }

            const response = await apiService.post(`/Appointments/All`, payload, true);

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

            setAppointments((prevAppointments) => {
                return currentPage === 0
                    ? formattedAppointments
                    : mergeAppointmentsByDate(prevAppointments, formattedAppointments);
            });

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
    }, [isAuthenticated, selectedDate, selectedPatient]);

    useEffect(() => {
        const handleScroll = () => {
            const bottomOffset = 200; // margines od dołu, po którym ładujemy kolejną stronę
            if (
                window.innerHeight + window.scrollY >=
                document.body.offsetHeight - bottomOffset &&
                page < totalPages - 1
            ) {
                getAppointments(0, page + 1);
            }
        };

        if (totalPages > 1) {
            window.addEventListener("scroll", handleScroll);
        }

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [page, totalPages, selectedDate, selectedPatient]);

    return (
        <>
            <div className={styles.container}>
                <div className={styles.appointmentsNav}>
                    <AppointmentStatusButtons getAppointments={getAppointments}/>
                    <div className={styles.searchPanel}>
                        <div className={styles.searchPanelSection}>
                            <div className={styles.element}>
                                <input type="date" value={selectedDate} onChange={handleDateChange}/>
                            </div>
                            {role == "Physiotherapist" && (
                                <>
                                    <div className={styles.element}>
                                        <PatientSearch
                                            onPatientSelect={setSelectedPatient}
                                            buttonText={t.select}
                                            displayLabel={false}
                                        />
                                    </div>
                                    <div className={styles.element}>

                                        <AppointmentScheduler className={styles.element}/>
                                    </div>
                                </>
                            )}

                        </div>

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
                  {format(new Date(appointment.appointmentDate).toISOString(), "HH:mm", {
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
