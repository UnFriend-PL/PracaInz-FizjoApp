"use client";
import { useParams } from "next/navigation";
import React, { useState, useContext, useEffect } from "react";
import HumanBody from "@/app/components/common/humanBody/humanBody";
import { AuthContext } from "@/app/contexts/auth/authContext";
import styles from "./appointmentDetails.module.scss";
import apiService from "@/app/services/apiService/apiService";

const Appointments = () => {
  const { isAuthenticated } = React.useContext(AuthContext);
  const params = useParams();
  const appointmentId = params.appointmentId;
  const [selectedParts, setSelectedParts] = useState([]);
  const [appointment, setAppointment] = useState(null);
  const handleBodyPartPress = (bodyPart) => {
    setSelectedParts((prevSelectedParts) => {
      const existingPart = prevSelectedParts.find(
        (part) => part.slug === bodyPart.slug
      );
      if (existingPart) {
        // Remove the part if it exists
        return prevSelectedParts.filter((part) => part.slug !== bodyPart.slug);
      } else {
        // Add the part if it doesn't exist
        return [...prevSelectedParts, bodyPart];
      }
    });
  };

  useEffect(() => {
    if (isAuthenticated) {
      apiService
        .get(`/Appointments/${appointmentId}`, {}, true)
        .then((response) => {
          setAppointment(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [isAuthenticated]);

  if (isAuthenticated && appointment)
    return (
      <>
        <div className={styles.container}>
          {console.log(appointment)}
          <AppointmentDetails appointment={appointment} />
          <HumanBody
            side={"back"}
            gender={appointment.patient.gender}
            data={selectedParts}
            scale={1.6}
            onBodyPartPress={handleBodyPartPress}
          />
          <div>
            <h3>Selected Body Parts:</h3>
            <ul>
              {selectedParts.map((part) => (
                <li key={part.slug}>
                  {part.slug} - Intensity: {part.intensity}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </>
    );
};

export default Appointments;

const AppointmentDetails = ({ appointment }) => {
  return (
    <div className={styles.appointmentCard}>
      <div className={styles.header}>
        <span className={styles.status}>
          Status: {appointment.appointmentStatusName}
        </span>
      </div>

      <div className={styles.details}>
        <div className={styles.detailGroup}>
          <span className={styles.label}>Patient:</span>
          <span className={styles.value}>
            {appointment.patient.firstName} {appointment.patient.lastName}
          </span>
        </div>
        <div className={styles.detailGroup}>
          <span className={styles.label}>Email:</span>
          <span className={styles.value}>{appointment.patient.email}</span>
          <span className={styles.label}>Phone:</span>
          <span className={styles.value}>
            {appointment.patient.phoneNumber}
          </span>
        </div>
        <div className={styles.detailGroup}>
          <span className={styles.label}>Address:</span>
          <span className={styles.value}>
            {appointment.patient.streetWithHouseNumber},{" "}
            {appointment.patient.postCode} {appointment.patient.city},{" "}
            {appointment.patient.country}
          </span>
        </div>
        <div className={styles.detailGroup}>
          <span className={styles.label}>DOB:</span>
          <span className={styles.value}>
            {new Date(appointment.patient.dateOfBirth).toLocaleDateString()}
          </span>
          <span className={styles.label}>Insurance:</span>
          <span className={styles.value}>
            {appointment.patient.healthInsuranceNumber}
          </span>
        </div>
      </div>

      <div className={styles.details}>
        <div className={styles.detailGroup}>
          <span className={styles.label}>Physiotherapist:</span>
          <span className={styles.value}>
            {appointment.physiotherapist.firstName}{" "}
            {appointment.physiotherapist.lastName}
          </span>
        </div>
        <div className={styles.detailGroup}>
          <span className={styles.label}>Email:</span>
          <span className={styles.value}>
            {appointment.physiotherapist.email}
          </span>
          <span className={styles.label}>Phone:</span>
          <span className={styles.value}>
            {appointment.physiotherapist.phoneNumber}
          </span>
        </div>
        <div className={styles.detailGroup}>
          <span className={styles.label}>License Number:</span>
          <span className={styles.value}>
            {appointment.physiotherapist.licenseNumber}
          </span>
        </div>
      </div>

      <div className={styles.details}>
        <div className={styles.detailGroup}>
          <span className={styles.label}>Date:</span>
          <span className={styles.value}>
            {new Date(appointment.appointmentDate).toLocaleString()}
          </span>
        </div>
        <div className={styles.detailGroup}>
          <span className={styles.label}>Description:</span>
          <span className={styles.value}>
            {appointment.appointmentDescription || "No description provided"}
          </span>
        </div>
        <div className={styles.detailGroup}>
          <span className={styles.label}>Notes:</span>
          <span className={styles.value}>
            {appointment.notes || "No notes provided"}
          </span>
        </div>
        <div className={styles.detailGroup}>
          <span className={styles.label}>Diagnosis:</span>
          <span className={styles.value}>
            {appointment.diagnosis || "No diagnosis provided"}
          </span>
        </div>
        <div className={styles.detailGroup}>
          <span className={styles.label}>Paid:</span>
          <span className={styles.value}>
            {appointment.isPaid ? "Yes" : "No"}
          </span>
        </div>
      </div>
    </div>
  );
};
