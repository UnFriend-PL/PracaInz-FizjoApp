"use client";
import { useParams } from "next/navigation";
import { useState } from "react";
import styles from "./appointmentDetails.module.scss";
import HumanBodyV2 from "@/app/components/common/humanBody/humanBodyv2";
const Appointments = () => {
  const params = useParams();
  const appointment = params.appointment;
  const [selectedParts, setSelectedParts] = useState([]);

  const handleBodyPartPress = (bodyPart) => {
    setSelectedParts((prevSelectedParts) => {
      if (prevSelectedParts.some((part) => part.slug === bodyPart.slug)) {
        return prevSelectedParts.filter((part) => part.slug !== bodyPart.slug);
      } else {
        return [...prevSelectedParts, bodyPart];
      }
    });
  };

  return (
    <>
      <HumanBodyV2
        side={"front"}
        gender={"female"}
        scale={1.5}
        data={[]}
        onBodyPartPress={handleBodyPartPress}
      />
      <div>
        <h3>Selected Body Parts:</h3>
        <ul>
          {selectedParts.map((part) => (
            <li key={part.slug}>{part.slug}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Appointments;
