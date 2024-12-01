"use client";
import React, {useContext} from "react";
import HumanBody from "@/app/components/common/humanBody/humanBody";
import styles from "./appointmentDetails.module.scss";
import SwitchSelector from "react-switch-selector";
import AppointmentDetails from "./appointmentDetails";
import {AuthContext} from "@/app/contexts/auth/authContext";
import SelectedItemsList from "./selectedItemsList";
import BodyPartSelector from "./bodyPartSelector";
import Treatments from "@/app/components/treatments/treatments";
import pl from "./locales/pl.json";
import en from "./locales/en.json";
import {AppointmentContext, AppointmentProvider} from "@/app/appointments/appointmentContext";

const locales = {en, pl};

const Appointments = () => {
    const {isAuthenticated} = useContext(AuthContext);
    const {
        setViewPosition,
        viewPosition,
        appointment,
        gender,
        selectedParts,
        handleBodyPartPress,
        readOnly,
        language,
        saveAll,
        isSaving
    } = useContext(AppointmentContext);
    const t = locales[language];
    if (!isAuthenticated || !appointment) return null;

    return (
        <div className={styles.container}>
            <button className={styles.buttonSaveAll} onClick={saveAll}>{isSaving ? t.saving : t.saveAll}</button>

            <AppointmentDetails/>
            <div className={`${styles.container} ${styles.spaceAtBottom}`}>
                <div className={styles.treatmentsWrapper}>
                    <Treatments/>
                </div>
                <div className={styles.bodyContainer}>
                    <div className={styles.switchSelector}>
                        <SwitchSelector
                            onChange={setViewPosition}
                            options={[
                                {label: "Front", value: "front", optionClassName: styles.switchLabel},
                                {label: "Back", value: "back", optionClassName: styles.switchLabel},
                            ]}
                        />
                    </div>
                    <HumanBody
                        className={styles.humanBody}
                        side={viewPosition}
                        gender={gender}
                        data={selectedParts[viewPosition]}
                        scale={1.6}
                        onBodyPartPress={handleBodyPartPress}
                    />
                </div>
                <div className={styles.sectionWrapper}>
                    <SelectedItemsList/>
                    {!readOnly && <BodyPartSelector/>}
                </div>
            </div>
        </div>
    );
};

const AppointmentsPage = () => (
    <AppointmentProvider>
        <Appointments/>
    </AppointmentProvider>
);

export default AppointmentsPage;
