import React, { createContext, useState } from "react";
import pl from "./[appointmentId]/locales/pl.json";
import en from "./[appointmentId]/locales/en.json";
import { useContext } from "react";
import { LanguageContext } from "@/app/contexts/lang/langContext";
import useAppointmentDetails from "@/app/appointments/hooks/useAppointmentDetails";
import useBodyParts from "@/app/appointments/hooks/useBodyParts";
import useTreatments from "@/app/appointments/hooks/useTreatments";
import {useParams} from "next/navigation";
import {AuthContext} from "@/app/contexts/auth/authContext";
export const AppointmentContext = createContext();

const locales = { en, pl };

export const AppointmentProvider = ({ children }) => {
    const { language } = useContext(LanguageContext);
    const { appointmentId } = useParams();
    const { isAuthenticated } = useContext(AuthContext)

    const {
        appointment,
        gender,
        readOnly,
        isSaving: isDetailsSaving,
        appointmentsDetailsFormData,
        setAppointmentsDetailsFormData,
        selectedNewHour,
        setSelectedNewHour,
        selectedNewStatus,
        setSelectedNewStatus,
        isAppointmentStatusEditing,
        setIsAppointmentStatusEditing,
        handleInputChange,
        handleStatusChange,
        handleFormSubmit,
        handleStatusEdit,
        fetchAppointmentDetails,
        availableTimes
    } = useAppointmentDetails(appointmentId, isAuthenticated);


    const {
        selectedItems,
        setSelectedItems,
        selectedParts,
        setSelectedParts,
        viewPosition,
        setViewPosition,
        musclesAndJoints,
        loadedMusclesAndJoints,
        currentIndex,
        setCurrentIndex,
        isSaving: isBodyPartsSaving,
        saveBodyDetails,
        handleNavigation,
        handleBodyPartPress,
    } = useBodyParts(appointmentId, gender, language, readOnly);

    const {
        selectedTreatments,
        loadOptions,
        handleSelectionChange,
        updateTreatment,
        removeTreatment,
        saveTreatments,
        handleChangeIncludeSelectedBodyParts,
        includeSelectedBodyParts,
        isSaving: isTreatmentsSaving,
    } = useTreatments(appointmentId, language, gender, selectedItems);

    const [isPatientModalOpen, setPatientModalOpen] = useState(false);
    const [isPhysioModalOpen, setPhysioModalOpen] = useState(false);

    const t = locales[language];

    const saveAll = async () => {
        try {
            await Promise.all([saveBodyDetails(), saveTreatments(), handleFormSubmit()]);
        } catch (error) {
            console.error("Failed to save all data:", error);
        }
    };

    return (
        <AppointmentContext.Provider
            value={{
                removeTreatment,
                selectedTreatments,
                loadOptions,
                updateTreatment,
                handleSelectionChange,
                saveTreatments,
                handleChangeIncludeSelectedBodyParts,
                includeSelectedBodyParts,
                appointment,
                appointmentId,
                fetchAppointmentDetails,
                selectedParts,
                setSelectedParts,
                viewPosition,
                setViewPosition,
                loadedMusclesAndJoints,
                readOnly,
                handleBodyPartPress,
                setSelectedItems,
                gender,
                language,
                saveAll,
                isPatientModalOpen,
                setPatientModalOpen,
                isPhysioModalOpen,
                setPhysioModalOpen,
                selectedNewStatus,
                setSelectedNewStatus,
                appointmentsDetailsFormData,
                setAppointmentsDetailsFormData,
                selectedNewHour,
                setSelectedNewHour,
                isAppointmentStatusEditing,
                setIsAppointmentStatusEditing,
                handleInputChange,
                handleStatusChange,
                handleFormSubmit,
                handleStatusEdit,
                currentIndex,
                setCurrentIndex,
                isSaving: isDetailsSaving || isBodyPartsSaving || isTreatmentsSaving,
                saveBodyDetails,
                handleNavigation,
                t,
                musclesAndJoints,
                selectedItems,
                availableTimes
            }}
        >
            {children}
        </AppointmentContext.Provider>
    );
};
