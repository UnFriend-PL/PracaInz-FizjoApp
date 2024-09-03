import { useState, useCallback } from "react";

const useSelectedItems = () => {
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

  return { selectedItems, handleChange, handleRemove, setSelectedItems };
};

export default useSelectedItems;
