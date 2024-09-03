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
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      apiService
        .get(`/Appointments/${appointmentId}`, {}, true)
        .then((response) => setAppointment(response.data))
        .catch((error) =>
          console.error("Failed to fetch appointment details:", error)
        );
    }
    if (isFirstLoad) {
      fetchSavedMusclesAndJoints();
      setIsFirstLoad(false);
    }
  }, [isAuthenticated, appointmentId, isFirstLoad]);

  const fetchSavedMusclesAndJoints = useCallback(async () => {
    try {
      const response = await apiService.post(
        `/Appointments/${appointmentId}/LoadSelectedBodyDetails`,
        null,
        true
      );

      const uniqueMusclesAndJoints = new Set();
      const uniqueSelectedMusclesAndJoints = new Set();
      const updatedSelectedParts = { front: [], back: [] };

      response.data.forEach((element) => {
        uniqueMusclesAndJoints.add(element.bodyPartMusclesAndJoints);
        updatedSelectedParts[
          element.bodyPartMusclesAndJoints.viewId == (1 || 3) ? "front" : "back"
        ].push({
          slug: element.bodyPartMusclesAndJoints.name,
        });
      });

      response.data
        .flatMap((element) => element.selectedMuscles)
        .forEach((muscle) => {
          uniqueSelectedMusclesAndJoints.add(muscle);
        });

      response.data
        .flatMap((element) => element.selectedJoints)
        .forEach((joint) => {
          uniqueSelectedMusclesAndJoints.add(joint);
        });

      setMusclesAndJoints(Array.from(uniqueMusclesAndJoints));
      setSelectedParts(updatedSelectedParts);
      setLoadedMusclesAndJoints(Array.from(uniqueSelectedMusclesAndJoints));
    } catch (error) {
      console.error("Failed to fetch appointment details:", error);
    }
  }, [appointmentId, viewPosition]);

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
        if (!response.success) {
          throw new Error(response.message);
        }
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
        <AppointmentDetails appointment={appointment} />
      </div>
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
          musclesAndJoints={musclesAndJoints}
          appointmentId={appointmentId}
          loadedMusclesAndJoints={loadedMusclesAndJoints}
        />
      </div>
    </>
  );
};

export default Appointments;
