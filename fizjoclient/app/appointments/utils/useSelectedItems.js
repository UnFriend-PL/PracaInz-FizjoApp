import { useState, useCallback } from "react";

const useSelectedItems = (musclesAndJoints, loadedMusclesAndJoints) => {
  const [selectedItems, setSelectedItems] = useState({});

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

  const setInitialValues = useCallback(
    (mappedData) => {
      mappedData.forEach((section) => {
        const initialSelectedMuscles = section.muscles.filter((muscle) =>
          loadedMusclesAndJoints.some((item) => item.id === muscle.muscleId)
        );

        const initialSelectedJoints = section.joints.filter((joint) =>
          loadedMusclesAndJoints.some((item) => item.id === joint.jointId)
        );

        handleChange(initialSelectedMuscles, section.sectionName, "muscles");
        handleChange(initialSelectedJoints, section.sectionName, "joints");
      });
    },
    [handleChange, loadedMusclesAndJoints]
  );

  return {
    selectedItems,
    handleChange,
    handleRemove,
    setSelectedItems,
    validateSelectedItems,
    setInitialValues,
  };
};

export default useSelectedItems;
