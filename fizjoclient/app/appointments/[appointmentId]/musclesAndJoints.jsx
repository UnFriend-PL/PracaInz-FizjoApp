import React, { useEffect, useCallback, useContext } from "react";
import { useState } from "react";
import styles from "./appointmentDetails.module.scss";
import apiService from "@/app/services/apiService/apiService";
import mapData from "../utils/mapData";
import createBodyDetails from "../utils/createBodyDetails";
import SelectedItemsList from "./SelectedItemsList";
import BodyPartSelector from "./BodyPartSelector";
import useSelectedItems from "../utils/useSelectedItems";
import { LanguageContext } from "@/app/contexts/lang/langContext";
import pl from "./locales/pl.json";
import en from "./locales/en.json";
import TreatmentsAutoComplete from "@/app/components/treatments/treatments";

const locales = { en, pl };

const MusclesAndJoints = ({
  musclesAndJoints,
  appointmentId,
  loadedMusclesAndJoints,
  readOnly,
}) => {
  const { language } = useContext(LanguageContext);
  const t = locales[language];

  const {
    selectedItems,
    handleChange,
    handleRemove,
    setSelectedItems,
    validateSelectedItems,
    setInitialValues,
  } = useSelectedItems(musclesAndJoints, loadedMusclesAndJoints);

  const [isSaving, setIsSaving] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const mappedData = mapData(musclesAndJoints);

  const handleNavigation = useCallback(
    (direction) => {
      setCurrentIndex((prevIndex) => {
        return direction === "prev"
          ? (prevIndex - 1 + mappedData.length) % mappedData.length
          : (prevIndex + 1) % mappedData.length;
      });
    },
    [mappedData.length]
  );

  useEffect(() => {
    validateSelectedItems();
  }, [musclesAndJoints, validateSelectedItems]);

  useEffect(() => {
    if (mappedData.length && currentIndex >= mappedData.length) {
      setCurrentIndex(0);
    }
  }, [currentIndex, mappedData.length]);

  useEffect(() => {
    setInitialValues(mappedData);
  }, [loadedMusclesAndJoints, language]);

  const handleSave = async () => {
    setIsSaving(true);
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
    } finally {
      setIsSaving(false);
    }
  };

  if (!mappedData.length)
    return <div className={styles.musclesAndJointsWrapper}></div>;

  const {
    sectionName = "",
    sectionNamePL = "",
    muscles = [],
    joints = [],
  } = mappedData[currentIndex] || {};

  return (
    <div className={styles.musclesAndJointsWrapper}>
      <TreatmentsAutoComplete />
      <SelectedItemsList
        selectedItems={selectedItems}
        handleRemove={handleRemove}
        readOnly={readOnly}
      />
      {!readOnly && (
        <>
          <Navigation
            currentIndex={currentIndex}
            total={mappedData.length}
            onNavigate={handleNavigation}
            t={t}
          />
          <BodyPartSelector
            sectionName={sectionName}
            sectionNamePL={sectionNamePL}
            muscles={muscles}
            joints={joints}
            selectedItems={selectedItems}
            handleChange={handleChange}
          />
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={styles.saveButton}
          >
            {isSaving ? t.savingBodyDetails : t.saveBodyDetails}
          </button>
        </>
      )}
    </div>
  );
};

export default MusclesAndJoints;

const Navigation = ({ currentIndex, total, onNavigate, t }) => (
  <div className={styles.navigation}>
    <button onClick={() => onNavigate("prev")}>{t.prev}</button>
    <span>{`${currentIndex + 1} / ${total}`}</span>
    <button onClick={() => onNavigate("next")}>{t.next}</button>
  </div>
);
