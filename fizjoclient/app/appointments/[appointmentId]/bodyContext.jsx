"use client";
import React, { createContext, useState, useEffect, useContext } from "react";
import useSelectedItems from "../utils/useSelectedItems";
import mapData from "../utils/mapData";
import { useParams } from "next/navigation";
import createBodyDetails from "../utils/createBodyDetails";
import { LanguageContext } from "@/app/contexts/lang/langContext";
import apiService from "@/app/services/apiService/apiService";

export const BodyContext = createContext();

const BodyProvider = ({ children }) => {
  const { appointmentId } = useParams(); // Odczytanie appointmentId z URL
  const [isSaving, setIsSaving] = useState(false);
  const [viewPosition, setViewPosition] = useState("front");
  const [appointment, setAppointment] = useState(null);
  const [mappedData, setMappedData] = useState(null);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const { language } = useContext(LanguageContext);

  const { selectedItems, handleChange, handleRemove, setInitialValues } =
    useSelectedItems([], []);

  // Funkcja ładowania szczegółów spotkania
  const fetchAppointmentDetails = async () => {
    if (!appointmentId) return; // Jeśli brak appointmentId, przerwij

    try {
      const response = await apiService.get(
        `/Appointments/${appointmentId}`,
        {},
        true
      );
      console.log("Fetched Appointment Details:", response.data);
      setAppointment(response.data);
    } catch (error) {
      console.error("Failed to fetch appointment details:", error);
    }
  };

  // Funkcja ładowania szczegółów mięśni i stawów
  const fetchSavedMusclesAndJoints = async () => {
    if (!appointmentId) return; // Jeśli brak appointmentId, przerwij

    try {
      console.log(
        "Fetching saved muscles and joints for appointment:",
        appointmentId
      );
      const response = await apiService.post(
        `/Appointments/${appointmentId}/LoadSelectedBodyDetails`,
        null,
        true
      );
      console.log("Response from LoadSelectedBodyDetails:", response.data);

      const processedData = processBodyPartData(response.data);
      console.log("Processed data:", processedData);

      const mapped = mapData(processedData, language);
      console.log("Mapped data before setting:", mapped);

      setMappedData(mapped);
      setInitialValues(mapped);
      setIsDataLoaded(true);
    } catch (error) {
      console.error("Failed to fetch saved muscles and joints:", error);
    }
  };

  // Funkcja przetwarzająca dane odpowiedzi
  const processBodyPartData = (data) => {
    return data.map((item) => ({
      viewId: item.bodyPartMusclesAndJoints.viewId,
      bodySectionId: item.bodyPartMusclesAndJoints.bodySectionId,
      name: item.bodyPartMusclesAndJoints.name,
      namePL: item.bodyPartMusclesAndJoints.namePL,
      muscles: item.bodyPartMusclesAndJoints.muscles,
      joints: item.bodyPartMusclesAndJoints.joints,
      selectedMuscles: item.selectedMuscles,
      selectedJoints: item.selectedJoints,
    }));
  };

  // useEffect do załadowania szczegółów spotkania przy pierwszym renderze
  useEffect(() => {
    fetchAppointmentDetails();
  }, [appointmentId]);

  // useEffect do załadowania szczegółów mięśni i stawów, gdy appointment jest dostępne
  useEffect(() => {
    if (appointment) {
      fetchSavedMusclesAndJoints();
    }
  }, [appointment]);

  useEffect(() => {
    console.log("Current mappedData:", mappedData); // Logowanie mappedData
  }, [mappedData]);

  const saveBodyDetails = async () => {
    setIsSaving(true);
    const bodyDetailsPayload = createBodyDetails(selectedItems);
    try {
      await apiService.post(
        `/appointments/${appointmentId}/SaveBodyDetails`,
        bodyDetailsPayload,
        true
      );
    } catch (error) {
      console.error("Failed to save body details:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <BodyContext.Provider
      value={{
        appointment,
        selectedItems,
        mappedData,
        handleChange,
        handleRemove,
        viewPosition,
        setViewPosition,
        saveBodyDetails,
        isSaving,
        isDataLoaded,
      }}
    >
      {children}
    </BodyContext.Provider>
  );
};

export default BodyProvider;
