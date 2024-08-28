import { useState, useCallback, useEffect } from "react";
import styles from "./appointmentDetails.module.scss";
import apiService from "@/app/services/apiService/apiService";
import mapData from "../utils/mapData";
import createBodyDetails from "../utils/createBodyDetails";
import SelectedItemsList from "./SelectedItemsList";
import BodyPartSelector from "./bodyPartSelector";

const MusclesAndJoints = ({
  musclesAndJoints,
  appointmentId,
  loadedMusclesAndJoints,
  setMusclesAndJoints,
}) => {
  const [selectedItems, setSelectedItems] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);

  const mappedData = mapData(musclesAndJoints);

  const handleChange = useCallback((selected, sectionName, type) => {
    setSelectedItems((prevState) => {
      const updatedSection = {
        ...prevState[sectionName],
        [type]: selected || [],
      };

      if (
        (!updatedSection.muscles || updatedSection.muscles.length === 0) &&
        (!updatedSection.joints || updatedSection.joints.length === 0)
      ) {
        const { [sectionName]: _, ...rest } = prevState;
        return rest;
      }

      return {
        ...prevState,
        [sectionName]: updatedSection,
      };
    });
  }, []);

  const handleRemove = useCallback((sectionName, type, value) => {
    setSelectedItems((prevState) => {
      const updatedSection = {
        ...prevState[sectionName],
        [type]: prevState[sectionName][type].filter(
          (item) => item.value !== value
        ),
      };

      if (
        (!updatedSection.muscles || updatedSection.muscles.length === 0) &&
        (!updatedSection.joints || updatedSection.joints.length === 0)
      ) {
        const { [sectionName]: _, ...rest } = prevState;
        return rest;
      }

      return {
        ...prevState,
        [sectionName]: updatedSection,
      };
    });
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? mappedData.length - 1 : prevIndex - 1
    );
  }, [mappedData.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === mappedData.length - 1 ? 0 : prevIndex + 1
    );
  }, [mappedData.length]);

  const validateSelectedItems = useCallback(() => {
    const currentIds = new Set();
    musclesAndJoints.forEach((section) => {
      section.muscles.forEach((muscle) => currentIds.add(muscle.id));
      section.joints.forEach((joint) => currentIds.add(joint.id));
    });

    setSelectedItems((prevSelectedItems) => {
      const newSelectedItems = {};
      Object.entries(prevSelectedItems).forEach(([sectionName, items]) => {
        const newItems = {
          muscles: (items.muscles || []).filter((item) =>
            currentIds.has(item.muscleId)
          ),
          joints: (items.joints || []).filter((item) =>
            currentIds.has(item.jointId)
          ),
        };

        if (
          (newItems.muscles && newItems.muscles.length > 0) ||
          (newItems.joints && newItems.joints.length > 0)
        ) {
          newSelectedItems[sectionName] = newItems;
        }
      });
      return newSelectedItems;
    });
  }, [musclesAndJoints]);

  useEffect(() => {
    validateSelectedItems();
  }, [musclesAndJoints, validateSelectedItems]);

  useEffect(() => {
    if (mappedData.length === 0) return;
    if (currentIndex >= mappedData.length) {
      setCurrentIndex(0);
    }
  }, [currentIndex, mappedData.length]);

  const handleSave = async () => {
    const bodyDetailsPayload = createBodyDetails(selectedItems);
    console.log("Sending data:", bodyDetailsPayload);

    try {
      const response = await apiService.post(
        `/appointments/${appointmentId}/SaveBodyDetails`,
        bodyDetailsPayload,
        true
      );
      if (!response.success) {
        throw new Error("Network response was not ok");
      }

      console.log("Data saved:", response);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  if (mappedData.length === 0)
    return <div className={styles.musclesAndJointsWrapper}></div>;

  const {
    sectionName = "",
    muscles = [],
    joints = [],
  } = mappedData[currentIndex] || {};

  return (
    <div className={styles.musclesAndJointsWrapper}>
      <SelectedItemsList
        selectedItems={selectedItems}
        handleRemove={handleRemove}
      />
      <div className={styles.navigation}>
        <button onClick={handlePrev}>&lt;</button>
        <span>{`${currentIndex + 1} / ${mappedData.length}`}</span>
        <button onClick={handleNext}>&gt;</button>
      </div>
      <BodyPartSelector
        sectionName={sectionName}
        muscles={muscles}
        joints={joints}
        selectedItems={selectedItems}
        handleChange={handleChange}
      />
      <button onClick={handleSave} className={styles.saveButton}>
        SAVE
      </button>
    </div>
  );
};

export default MusclesAndJoints;
