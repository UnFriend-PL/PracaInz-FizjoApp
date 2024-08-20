"use client";
import { useParams } from "next/navigation";
import React, { useState, useContext } from "react";
import HumanBody from "@/app/components/common/humanBody/humanBody";
import { UserContext } from "@/app/contexts/user/userContext";
import { AuthContext } from "@/app/contexts/auth/authContext";
import styles from "./appointmentDetails.module.scss";

const Appointments = () => {
  const { user } = React.useContext(UserContext);
  const { isAuthenticated } = React.useContext(AuthContext);
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

  if (isAuthenticated && user)
    return (
      <>
        {console.log(user)}
        <HumanBody
          side={"front"}
          gender={user.gender}
          data={selectedParts}
          scale={1.6}
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
