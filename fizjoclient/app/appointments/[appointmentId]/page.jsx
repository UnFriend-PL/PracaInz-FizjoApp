"use client";
import React, { useContext } from "react";
import HumanBody from "@/app/components/common/humanBody/humanBody";
import styles from "./appointmentDetails.module.scss";
import SwitchSelector from "react-switch-selector";
import AppointmentDetails from "./appointmentDetails";
import { AppointmentContext, AppointmentProvider } from "../AppointmentContext";
import { AuthContext } from "@/app/contexts/auth/authContext";
import SelectedItemsList from "./selectedItemsList";
import BodyPartSelector from "./bodyPartSelector";
import TreatmentsAutoComplete from "@/app/components/treatments/treatments";

const Appointments = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const {
    setViewPosition,
    viewPosition,
    appointment,
    gender,
    selectedParts,
    handleBodyPartPress,
    readOnly,
  } = useContext(AppointmentContext);

  if (!isAuthenticated || !appointment) return null;

  return (
    <div className={styles.container}>
      <AppointmentDetails />
      <div className={`${styles.container} ${styles.spaceAtBottom}`}>
        <div className={styles.treatmentsWrapper}>
          <TreatmentsAutoComplete />
        </div>
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
            gender={gender}
            data={selectedParts[viewPosition]}
            scale={1.6}
            onBodyPartPress={handleBodyPartPress}
          />
        </div>
        <div className={styles.sectionWrapper}>
          <SelectedItemsList />
          {!readOnly && <BodyPartSelector />}
        </div>
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
