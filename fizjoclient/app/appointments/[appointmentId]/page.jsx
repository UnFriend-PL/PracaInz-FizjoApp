"use client";
import { useParams } from "next/navigation";
import React, { useState, useEffect, useContext, useCallback } from "react";
import HumanBody from "@/app/components/common/humanBody/humanBody";
import styles from "./appointmentDetails.module.scss";
import apiService from "@/app/services/apiService/apiService";
import SwitchSelector from "react-switch-selector";
import MusclesAndJoints from "./musclesAndJoints";
import AppointmentDetails from "./appointmentDetails";
import { LanguageContext } from "@/app/contexts/lang/langContext";
import pl from "./locales/pl.json";
import en from "./locales/en.json";
import {
  AppointmentContext,
  AppointmentProvider,
  useAppointmentContext,
} from "./AppointmentContext";
import { AuthContext } from "@/app/contexts/auth/authContext";

const locales = { en, pl };

const Appointments = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const {
    setViewPosition,
    viewPosition,
    appointment,
    selectedParts,
    handleBodyPartPress,
  } = useContext(AppointmentContext);

  if (!isAuthenticated || !appointment) return null;

  return (
    <div className={styles.container}>
      <AppointmentDetails />
      <div className={`${styles.container} ${styles.spaceAtBottom}`}>
        <div className={styles.bodyContainer}>
          <SwitchSelector
            onChange={setViewPosition}
            options={[
              { label: "Front", value: "front" },
              { label: "Back", value: "back" },
            ]}
          />
          <HumanBody
            side={viewPosition}
            gender={appointment.patient.gender}
            data={selectedParts[viewPosition]}
            scale={1.6}
            onBodyPartPress={handleBodyPartPress}
          />
        </div>
        <MusclesAndJoints
        // musclesAndJoints={musclesAndJoints}
        // appointmentId={appointmentId}
        // loadedMusclesAndJoints={loadedMusclesAndJoints}
        // readOnly={readOnly}
        />
      </div>
    </div>
  );
};

const AppointmentsPage = () => (
  <AppointmentProvider>
    <Appointments />
  </AppointmentProvider>
);

export default AppointmentsPage;
