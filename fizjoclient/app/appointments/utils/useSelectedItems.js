import { useState, useCallback } from "react";

const useSelectedItems = (musclesAndJoints, loadedMusclesAndJoints) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleChange = useCallback((selected, section, type) => {
    setSelectedItems((prevState) => {
      const sectionIndex = prevState.findIndex(
        (item) => item.sectionName === section.sectionName
      );

      if (sectionIndex > -1) {
        const updatedSection = { ...prevState[sectionIndex] };
        updatedSection[type] = selected || [];

        if (!updatedSection.muscles?.length && !updatedSection.joints?.length) {
          return prevState.filter((_, index) => index !== sectionIndex);
        }

        return prevState.map((item, index) =>
          index === sectionIndex ? updatedSection : item
        );
      } else {
        return [
          ...prevState,
          {
            ...section,
            [type]: selected || [],
          },
        ];
      }
    });
  }, []);

  const handleRemove = useCallback((section, type, value) => {
    setSelectedItems((prevState) => {
      const sectionIndex = prevState.findIndex(
        (item) => item.sectionName === section.sectionName
      );

      if (sectionIndex > -1) {
        const updatedSection = {
          ...prevState[sectionIndex],
          [type]: prevState[sectionIndex][type].filter(
            (item) => item.value !== value
          ),
        };

        if (!updatedSection.muscles.length && !updatedSection.joints.length) {
          return prevState.filter((_, index) => index !== sectionIndex);
        }

        return prevState.map((item, index) =>
          index === sectionIndex ? updatedSection : item
        );
      }

      return prevState;
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
      return prevSelectedItems
        .map((section) => {
          const muscles = section.muscles.filter((item) =>
            currentIds.has(item.muscleId)
          );
          const joints = section.joints.filter((item) =>
            currentIds.has(item.jointId)
          );

          return {
            ...section,
            muscles,
            joints,
          };
        })
        .filter((section) => section.muscles.length || section.joints.length);
    });
  }, [musclesAndJoints]);

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
