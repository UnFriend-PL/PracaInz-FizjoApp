"use client";
import { useParams } from "next/navigation";
import { useState } from "react";
import styles from "./appointmentDetails.module.scss";
import HumanBodyV2 from "@/app/components/common/humanBody/humanBody";

const Appointments = () => {
  const params = useParams();
  const appointment = params.appointment;
  const [selectedParts, setSelectedParts] = useState([]);

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

  return (
    <>
      <HumanBodyV2
        side={"front"}
        gender={"female"}
        data={selectedParts}
        scale={1.5}
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
    </>
  );
};

export default Appointments;
