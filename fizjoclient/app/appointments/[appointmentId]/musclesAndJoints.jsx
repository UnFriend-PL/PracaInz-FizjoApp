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
  // console.log(musclesAndJoints);
  // console.log(loadedMusclesAndJoints);
  const mappedData = mapData(musclesAndJoints);

  const handleChange = useCallback((selected, sectionName, type) => {
    setSelectedItems((prevState) => {
      const updatedSection = {
        ...prevState[sectionName],
        [type]: selected || [],
      };
      if (!updatedSection.muscles?.length && !updatedSection.joints?.length) {
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
      if (!updatedSection.muscles?.length && !updatedSection.joints?.length) {
        const { [sectionName]: _, ...rest } = prevState;
        return rest;
      }
      return {
        ...prevState,
        [sectionName]: updatedSection,
      };
    });
  }, []);

  const handleNavigation = useCallback(
    (direction) => {
      setCurrentIndex((prevIndex) => {
        const maxIndex = mappedData.length - 1;
        if (direction === "prev")
          return prevIndex === 0 ? maxIndex : prevIndex - 1;
        return prevIndex === maxIndex ? 0 : prevIndex + 1;
      });
    },
    [mappedData.length]
  );

  const validateSelectedItems = useCallback(() => {
    const currentIds = new Set(
      musclesAndJoints.flatMap((section) => [
        ...section.muscles.map((m) => m.id),
        ...section.joints.map((j) => j.id),
      ])
    );

    setSelectedItems((prevSelectedItems) => {
      const newSelectedItems = {};
      for (const [sectionName, items] of Object.entries(prevSelectedItems)) {
        const muscles = (items.muscles || []).filter((item) =>
          currentIds.has(item.muscleId)
        );
        const joints = (items.joints || []).filter((item) =>
          currentIds.has(item.jointId)
        );
        if (muscles.length || joints.length)
          newSelectedItems[sectionName] = { muscles, joints };
      }
      return newSelectedItems;
    });
  }, [musclesAndJoints]);

  useEffect(() => {
    validateSelectedItems();
  }, [musclesAndJoints, validateSelectedItems]);

  useEffect(() => {
    if (mappedData.length && currentIndex >= mappedData.length) {
      setCurrentIndex(0);
    }
  }, [currentIndex, mappedData.length]);

  useEffect(() => {
    musclesAndJoints.forEach((section) => {
      const initialSelectedMuscles = section.muscles
        .filter((muscle) =>
          loadedMusclesAndJoints.some((item) => item.id === muscle.id)
        )
        .map((muscle) => ({
          section: section.name,
          label: muscle.name,
          value: muscle.name.toLowerCase().replace(/\s+/g, "-"),
          description: `Muscle in the ${section.name} section`,
          bodySectionId: section.bodySectionId,
          viewId: section.viewId,
          muscleId: muscle.id,
        }));

      const initialSelectedJoints = section.joints
        .filter((joint) =>
          loadedMusclesAndJoints.some((item) => item.id === joint.id)
        )
        .map((joint) => ({
          section: section.name,
          label: joint.name,
          value: joint.name.toLowerCase().replace(/\s+/g, "-"),
          description: `Joint in the ${section.name} section`,
          bodySectionId: section.bodySectionId,
          viewId: section.viewId,
          jointId: joint.id,
        }));

      console.log(initialSelectedMuscles);
      handleChange(initialSelectedMuscles, section.name, "muscles");
      handleChange(initialSelectedJoints, section.name, "joints");
    });
  }, [loadedMusclesAndJoints]);

  const handleSave = async () => {
    const bodyDetailsPayload = createBodyDetails(selectedItems);
    try {
      const response = await apiService.post(
        `/appointments/${appointmentId}/SaveBodyDetails`,
        bodyDetailsPayload,
        true
      );
      if (!response.success) throw new Error("Network response was not ok");
    } catch (error) {
      console.error("Save failed:", error);
    }
  };

  if (!mappedData.length)
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
        <button onClick={() => handleNavigation("prev")}>&lt;</button>
        <span>{`${currentIndex + 1} / ${mappedData.length}`}</span>
        <button onClick={() => handleNavigation("next")}>&gt;</button>
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
