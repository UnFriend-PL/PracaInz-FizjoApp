import { useState, useCallback, useContext } from "react";
import { AppointmentContext } from "../[appointmentId]/AppointmentContext";

const useSelectedItems = () => {
  const { musclesAndJoints, loadedMusclesAndJoints } =
    useContext(AppointmentContext);

  const [selectedItems, setSelectedItems] = useState([]);

  // Helper function to find the index of a section
  const findSectionIndex = (sections, sectionName) =>
    sections.findIndex((item) => item.sectionName === sectionName);

  // Helper function to check if a section is empty
  const isSectionEmpty = (section) =>
    !section.muscles?.length && !section.joints?.length;

  // Helper function to update a section in the selectedItems array
  const updateSelectedItems = (prevState, sectionIndex, updatedSection) =>
    prevState.map((item, index) =>
      index === sectionIndex ? updatedSection : item
    );

  // Handle change when muscles or joints are selected or deselected
  const handleChange = useCallback((selected, section, type) => {
    setSelectedItems((prevState) => {
      const sectionIndex = findSectionIndex(prevState, section.sectionName);

      if (sectionIndex > -1) {
        const updatedSection = {
          ...prevState[sectionIndex],
          [type]: selected || [],
        };

        if (isSectionEmpty(updatedSection)) {
          // Remove the section if both muscles and joints are empty
          return prevState.filter((_, index) => index !== sectionIndex);
        }

        // Update the existing section
        return updateSelectedItems(prevState, sectionIndex, updatedSection);
      } else {
        // Add a new section
        const newSection = { ...section, [type]: selected || [] };
        return [...prevState, newSection];
      }
    });
  }, []);

  // Handle removal of a specific muscle or joint
  const handleRemove = useCallback((section, type, value) => {
    setSelectedItems((prevState) => {
      const sectionIndex = findSectionIndex(prevState, section.sectionName);

      if (sectionIndex > -1) {
        const updatedSection = {
          ...prevState[sectionIndex],
          [type]: prevState[sectionIndex][type].filter(
            (item) => item.value !== value
          ),
        };

        if (isSectionEmpty(updatedSection)) {
          // Remove the section if both muscles and joints are empty
          return prevState.filter((_, index) => index !== sectionIndex);
        }

        // Update the existing section
        return updateSelectedItems(prevState, sectionIndex, updatedSection);
      }

      return prevState;
    });
  }, []);

  // Validate selected items against the current muscles and joints
  const validateSelectedItems = useCallback(() => {
    const currentMuscleIds = new Set(
      musclesAndJoints.flatMap((section) => section.muscles.map((m) => m.id))
    );
    const currentJointIds = new Set(
      musclesAndJoints.flatMap((section) => section.joints.map((j) => j.id))
    );

    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems
        .map((section) => {
          const muscles = section.muscles.filter((item) =>
            currentMuscleIds.has(item.muscleId)
          );
          const joints = section.joints.filter((item) =>
            currentJointIds.has(item.jointId)
          );

          return { ...section, muscles, joints };
        })
        .filter((section) => section.muscles.length || section.joints.length)
    );
  }, [musclesAndJoints]);

  // Set initial values based on loaded muscles and joints
  const setInitialValues = useCallback(
    (mappedData) => {
      const initialSelectedItems = mappedData
        .map((section) => {
          const initialSelectedMuscles = section.muscles.filter((muscle) =>
            loadedMusclesAndJoints.some(
              (item) =>
                item.muscleId === muscle.muscleId &&
                item.viewId === muscle.viewId
            )
          );

          const initialSelectedJoints = section.joints.filter((joint) =>
            loadedMusclesAndJoints.some(
              (item) =>
                item.jointId === joint.jointId && item.viewId === joint.viewId
            )
          );

          return {
            ...section,
            muscles: initialSelectedMuscles,
            joints: initialSelectedJoints,
          };
        })
        .filter((section) => section.muscles.length || section.joints.length);

      setSelectedItems(initialSelectedItems);
    },
    [loadedMusclesAndJoints]
  );

  return {
    selectedItems,
    handleChange,
    handleRemove,
    validateSelectedItems,
    setInitialValues,
  };
};

export default useSelectedItems;
