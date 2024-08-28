import { useState, useCallback, useEffect } from "react";
import Select from "react-select";
import styles from "./appointmentDetails.module.scss";
import apiService from "@/app/services/apiService/apiService";

const mapData = (data) => {
  return data.map((section) => {
    const muscles = section.muscles.map((muscle) => ({
      label: muscle.name,
      value: muscle.name.toLowerCase().replace(/\s+/g, "-"),
      description: `Muscle in the ${section.name} section`,
      bodySectionId: section.bodySectionId,
      viewId: section.viewId,
      muscleId: muscle.id,
    }));

    const joints = section.joints.map((joint) => ({
      label: joint.name,
      value: joint.name.toLowerCase().replace(/\s+/g, "-"),
      description: `Joint in the ${section.name} section`,
      bodySectionId: section.bodySectionId,
      viewId: section.viewId,
      jointId: joint.id,
    }));

    return {
      sectionName: section.name,
      muscles,
      joints,
    };
  });
};

const createBodyDetails = (selectedItems) => {
  const bodyDetails = [];

  for (const [bodySide, details] of Object.entries(selectedItems)) {
    // Przetwarzanie mięśni
    if (details.muscles && details.muscles.length > 0) {
      details.muscles.forEach((muscle) => {
        bodyDetails.push({
          bodySectionId: muscle.bodySectionId,
          viewId: muscle.viewId,
          muscleId: muscle.muscleId,
          jointId: null,
          bodySide: bodySide,
        });
      });
    }

    // Przetwarzanie stawów
    if (details.joints && details.joints.length > 0) {
      details.joints.forEach((joint) => {
        bodyDetails.push({
          bodySectionId: joint.bodySectionId,
          viewId: joint.viewId,
          muscleId: null,
          jointId: joint.jointId,
          bodySide: bodySide,
        });
      });
    }
  }

  return { bodyDetails };
};

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
      const response = apiService.post(
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
      <div className={styles.selectedItemsList}>
        <span className={styles.selectedItemsHeader}>Selected items:</span>
        {Object.entries(selectedItems).map(([sectionName, items]) => (
          <div key={sectionName} className={styles.selectedSection}>
            <div className={styles.selectedSectionHeader}>
              {sectionName.replace("-", " ")}:
            </div>
            {["muscles", "joints"].map((type) =>
              items[type]?.map((item) => (
                <div key={item.value} className={styles.selectedItem}>
                  <div className={styles.selectedItemLabel}>{item.label}</div>
                  <button
                    onClick={() => handleRemove(sectionName, type, item.value)}
                    className={styles.removeButton}
                  >
                    &times;
                  </button>
                </div>
              ))
            )}
          </div>
        ))}
      </div>
      <div className={styles.navigation}>
        <button onClick={handlePrev}>&lt;</button>
        <span>{`${currentIndex + 1} / ${mappedData.length}`}</span>
        <button onClick={handleNext}>&gt;</button>
      </div>
      <div className={styles.bodyPartContainer}>
        <div className={styles.bodyPart}>
          <div className={styles.bodyPartHeader}>
            {sectionName.replace("-", " ")}
          </div>
          <div className={styles.bodyPartSubHeader}>Muscles:</div>
          <Select
            options={muscles}
            isMulti
            onChange={(selected) =>
              handleChange(selected, sectionName, "muscles")
            }
            value={selectedItems[sectionName]?.muscles || []}
            className={styles.select}
            placeholder="Select muscles"
          />
          <div className={styles.bodyPartSubHeader}>Joints:</div>
          <Select
            options={joints}
            isMulti
            onChange={(selected) =>
              handleChange(selected, sectionName, "joints")
            }
            value={selectedItems[sectionName]?.joints || []}
            className={styles.select}
            placeholder="Select joints"
          />
        </div>
      </div>
      <button onClick={handleSave} className={styles.saveButton}>
        SAVE
      </button>
    </div>
  );
};

export default MusclesAndJoints;
