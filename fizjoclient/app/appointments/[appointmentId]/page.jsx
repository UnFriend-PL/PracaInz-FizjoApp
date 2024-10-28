"use client";
import { useParams } from "next/navigation";
import React, { useState, useEffect, useContext, useCallback } from "react";
import HumanBody from "@/app/components/common/humanBody/humanBody";
import { AuthContext } from "@/app/contexts/auth/authContext";
import styles from "./appointmentDetails.module.scss";
import apiService from "@/app/services/apiService/apiService";
import SwitchSelector from "react-switch-selector";
import MusclesAndJoints from "./musclesAndJoints";
import AppointmentDetails from "./appointmentDetails";
import { LanguageContext } from "@/app/contexts/lang/langContext";
import pl from "./locales/pl.json";
import en from "./locales/en.json";
import BodyProvider from "./bodyContext";

const locales = { en, pl };

const Appointments = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const { appointmentId } = useParams();
  const [selectedParts, setSelectedParts] = useState({ front: [], back: [] });
  const [appointment, setAppointment] = useState(null);
  const [viewPosition, setViewPosition] = useState("front");
  const [musclesAndJoints, setMusclesAndJoints] = useState([]);
  const [loadedMusclesAndJoints, setLoadedMusclesAndJoints] = useState([]);
  const { language } = useContext(LanguageContext);
  const t = locales[language];
  const [readOnly, setReadOnly] = useState(false);
  useEffect(() => {
    if (isAuthenticated) {
      fetchAppointmentDetails();
      fetchSavedMusclesAndJoints();
    }
  }, [isAuthenticated, appointmentId]);

  const fetchAppointmentDetails = async () => {
    try {
      const response = await apiService.get(
        `/Appointments/${appointmentId}`,
        {},
        true
      );
      console.log("Fetched Appointment Details:", response.data);
      setAppointment(response.data);
      setReadOnly(
        response.data.appointmentStatusName !== "Scheduled" &&
          response.data.appointmentStatusName !== "Completed"
      );
    } catch (error) {
      console.error("Failed to fetch appointment details:", error);
    }
  };

  const fetchSavedMusclesAndJoints = useCallback(async () => {
    try {
      const response = await apiService.post(
        `/Appointments/${appointmentId}/LoadSelectedBodyDetails`,
        null,
        true
      );

      const uniqueMusclesAndJoints = new Set();
      const updatedSelectedParts = { front: [], back: [] };
      const loadedMusclesAndJointsArray = [];

      response.data.forEach((element) => {
        uniqueMusclesAndJoints.add(element.bodyPartMusclesAndJoints);

        const viewKey =
          element.bodyPartMusclesAndJoints.viewId == 1 ||
          element.bodyPartMusclesAndJoints.viewId == 3
            ? "front"
            : "back";

        updatedSelectedParts[viewKey].push({
          slug: element.bodyPartMusclesAndJoints.name,
          slugPL: element.bodyPartMusclesAndJoints.namePL,
        });

        const { bodyPartMusclesAndJoints, selectedMuscles, selectedJoints } =
          element;
        const { viewId, bodySectionId } = bodyPartMusclesAndJoints;

        selectedMuscles.forEach((muscle) => {
          loadedMusclesAndJointsArray.push({
            muscleId: muscle.id,
            viewId: viewId,
            bodySectionId: bodySectionId,
          });
        });

        selectedJoints.forEach((joint) => {
          loadedMusclesAndJointsArray.push({
            jointId: joint.id,
            viewId: viewId,
            bodySectionId: bodySectionId,
          });
        });
      });

      setMusclesAndJoints(Array.from(uniqueMusclesAndJoints));
      setSelectedParts(updatedSelectedParts);
      setLoadedMusclesAndJoints(loadedMusclesAndJointsArray);
    } catch (error) {
      console.error("Failed to fetch saved muscles and joints:", error);
    }
  }, [appointmentId]);

  const fetchMusclesAndJoints = useCallback(
    async (bodyPart) => {
      const existingPart = musclesAndJoints.find(
        (part) => part.name === bodyPart.slug
      );
      if (existingPart) {
        setMusclesAndJoints((prev) =>
          prev.filter((part) => part.name !== bodyPart.slug)
        );
        return;
      }
      const [viewSide, bodySectionName] = bodyPart.slug.includes("-")
        ? bodyPart.slug.split(/-(.+)/)
        : [null, bodyPart.slug];
      const requestBody = {
        bodySectionName,
        viewPosition,
        viewSide,
        gender: appointment.patient.gender,
      };
      try {
        const response = await apiService.post(
          `/BodyVisualizer/GetBodyPartDetails`,
          requestBody,
          true
        );
        if (!response.success) throw new Error(response.message);
        setMusclesAndJoints((prev) => [...prev, response.data]);
      } catch (error) {
        console.error("Failed to fetch muscles and joints details:", error);
      }
    },
    [musclesAndJoints, viewPosition, appointment, readOnly]
  );

  const handleBodyPartPress = (bodyPart) => {
    if (readOnly) return;
    fetchMusclesAndJoints(bodyPart);
    setSelectedParts((prev) => {
      const updated = { ...prev };
      const parts = prev[viewPosition];
      if (parts.some((part) => part.slug === bodyPart.slug)) {
        updated[viewPosition] = parts.filter(
          (part) => part.slug !== bodyPart.slug
        );
      } else {
        updated[viewPosition] = [...parts, bodyPart];
      }
      return updated;
    });
  };

  if (!isAuthenticated || !appointment) return null;

  return (
    <>
      <BodyProvider>
        <div className={styles.container}>
          <AppointmentDetails
            key={appointment.appointmentDate}
            appointment={appointment}
            appointmentId={appointmentId}
            fetchAppointmentDetails={fetchAppointmentDetails}
          />
        </div>
        <div className={`${styles.container} ${styles.spaceAtBottom}`}>
          <div className={styles.bodyContainer}>
            <SwitchSelector
              onChange={setViewPosition}
              options={[
                { label: t.front, value: "front" },
                { label: t.back, value: "back" },
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
            musclesAndJoints={musclesAndJoints}
            appointmentId={appointmentId}
            loadedMusclesAndJoints={loadedMusclesAndJoints}
            readOnly={readOnly}
          />
        </div>
      </BodyProvider>
    </>
  );
};

export default Appointments;
