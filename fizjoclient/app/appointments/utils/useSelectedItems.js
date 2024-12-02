import { useCallback, useContext } from "react";
import { AppointmentContext} from "@/app/appointments/appointmentContext";
const useSelectedItems = () => {
  const { selectedItems, setSelectedItems } = useContext(AppointmentContext);

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
  }, [setSelectedItems]);

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
  }, [setSelectedItems]);

  return {
    selectedItems,
    handleChange,
    handleRemove,
  };
};

export default useSelectedItems;