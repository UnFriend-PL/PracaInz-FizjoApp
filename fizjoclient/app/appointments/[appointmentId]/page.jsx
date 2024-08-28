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

const Appointments = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const { appointmentId } = useParams();
  const [selectedParts, setSelectedParts] = useState({ front: [], back: [] });
  const [appointment, setAppointment] = useState(null);
  const [viewPosition, setViewPosition] = useState("front");
  const [musclesAndJoints, setMusclesAndJoints] = useState([]);
  const [loadedMusclesAndJoints, setLoadedMusclesAndJoints] = useState([]);

  useEffect(() => {
    if (isAuthenticated) {
      apiService
        .get(`/Appointments/${appointmentId}`, {}, true)
        .then((response) => setAppointment(response.data))
        .catch((error) =>
          console.error("Failed to fetch appointment details:", error)
        );
      fetchSavedMusclesAndJoints();
    }
  }, [isAuthenticated, appointmentId]);

  const fetchSavedMusclesAndJoints = useCallback(async () => {
    await apiService
      .post(
        `/Appointments/${appointmentId}/LoadSelectedBodyDetails`,
        null,
        true
      )
      .then((response) => {
        setLoadedMusclesAndJoints(response.data);
        console.log(response.data);
      })
      .catch((error) =>
        console.error("Failed to fetch appointment details:", error)
      );
  }, []);

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
      const { slug } = bodyPart;
      const [viewSide, bodySectionName] = slug.includes("-")
        ? slug.split(/-(.+)/)
        : [null, slug];
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
        setMusclesAndJoints((prev) => [...prev, response.data]);
      } catch (error) {
        console.error("Failed to fetch muscles and joints details:", error);
      }
    },
    [musclesAndJoints, viewPosition, appointment]
  );

  const handleBodyPartPress = (bodyPart) => {
    fetchMusclesAndJoints(bodyPart);
    setSelectedParts((prev) => ({
      ...prev,
      [viewPosition]: prev[viewPosition].some(
        (part) => part.slug === bodyPart.slug
      )
        ? prev[viewPosition].filter((part) => part.slug !== bodyPart.slug)
        : [...prev[viewPosition], bodyPart],
    }));
  };

  if (!isAuthenticated || !appointment) return null;

  return (
    <>
      <div className={styles.container}>
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
          musclesAndJoints={musclesAndJoints}
          appointmentId={appointmentId}
          loadedMusclesAndJoints={loadedMusclesAndJoints}
          setMusclesAndJoints={setMusclesAndJoints}
        />
      </div>
      <div className={styles.container}>
        <AppointmentDetails appointment={appointment} />
      </div>
    </>
  );
};

export default Appointments;
