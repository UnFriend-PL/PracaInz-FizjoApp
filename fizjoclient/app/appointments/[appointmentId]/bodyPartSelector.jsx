import React, { useContext, useState, useCallback, useEffect } from "react";
import Select from "react-select";
import styles from "./appointmentDetails.module.scss";
import { LanguageContext } from "@/app/contexts/lang/langContext";
import pl from "./locales/pl.json";
import en from "./locales/en.json";
import { AppointmentContext } from "./appointmentContext";
import mapData from "../utils/mapData";
import useSelectedItems from "../utils/useSelectedItems";
import createBodyDetails from "../utils/createBodyDetails";
import apiService from "@/app/services/apiService/apiService";

const locales = { en, pl };

const BodyPartSelector = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { language } = useContext(LanguageContext);
  const t = locales[language];
  const [isSaving, setIsSaving] = useState(false);
  const { musclesAndJoints, appointmentId } = useContext(AppointmentContext);
  const { selectedItems, handleChange } = useSelectedItems();
  const mappedData = mapData(musclesAndJoints);
  const {
    sectionName = "",
    sectionNamePL = "",
    muscles = [],
    joints = [],
  } = mappedData[currentIndex] || {};

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

  const handleNavigation = useCallback(
    (direction) => {
      if (mappedData.length === 0) return;

      setCurrentIndex((prevIndex) => {
        return direction === "prev"
          ? (prevIndex - 1 + mappedData.length) % mappedData.length
          : (prevIndex + 1) % mappedData.length;
      });
    },
    [mappedData.length]
  );

  const selectedSection = selectedItems.find(
    (item) => item.sectionName === sectionName
  );
  console.log(selectedSection, "selectedSection");
  console.log(selectedItems, "selectedItems");

  useEffect(() => {}, [selectedItems]);

  return (
    <>
      {selectedItems && (
        <Navigation
          currentIndex={currentIndex}
          total={mappedData.length}
          onNavigate={handleNavigation}
          setCurrentIndex={setCurrentIndex}
          t={t}
        />
      )}
      <div className={styles.bodyPartContainer}>
        <div className={styles.bodyPart}>
          <div className={styles.bodyPartHeader}>
            {language == "en"
              ? sectionName.replace("-", " ")
              : sectionNamePL
                  .replace("-", " ")
                  .replace("front", "przód")
                  .replace("back", "tył")}
          </div>
          <div className={styles.bodyPartSubHeader}>{t.muscles}:</div>
          <Select
            options={muscles}
            isMulti
            onChange={(selected) =>
              handleChange(
                selected.map((option) => ({
                  ...option,
                  value: option.value,
                  label: option.label,
                })),
                { sectionName },
                "muscles"
              )
            }
            value={selectedSection?.muscles || []}
            className={styles.select}
            placeholder={t.selectMuscles}
          />
          <div className={styles.bodyPartSubHeader}>{t.joints}:</div>
          <Select
            options={joints}
            isMulti
            onChange={(selected) =>
              handleChange(
                selected.map((option) => ({
                  ...option,
                  value: option.value,
                  label: option.label,
                })),
                { sectionName },
                "joints"
              )
            }
            value={selectedSection?.joints || []}
            className={styles.select}
            placeholder={t.selectJoints}
          />
        </div>
      </div>
      <button
        onClick={handleSave}
        disabled={isSaving}
        className={styles.saveButton}
      >
        {isSaving ? t.savingBodyDetails : t.saveBodyDetails}
      </button>
    </>
  );
};

export default BodyPartSelector;

const Navigation = ({
  setCurrentIndex,
  currentIndex,
  total,
  onNavigate,
  t,
}) => {
  useEffect(() => {
    if (currentIndex >= total) {
      console.log(currentIndex);
      setCurrentIndex(total > 0 ? total - 1 : 0);
      console.log(currentIndex);
    }
  }, [total, currentIndex]);

  return (
    <div className={styles.navigation}>
      <button onClick={() => onNavigate("prev")}>{t.prev}</button>
      <span>{`${total == 0 ? 0 : currentIndex + 1} / ${total}`}</span>
      <button onClick={() => onNavigate("next")}>{t.next}</button>
    </div>
  );
};
