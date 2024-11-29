import React, { useContext, useEffect } from "react";
import Select from "react-select";
import styles from "./appointmentDetails.module.scss";
import pl from "./locales/pl.json";
import en from "./locales/en.json";
import { AppointmentContext } from "../appointmentContext";
import mapData from "../utils/mapData";
import useSelectedItems from "../utils/useSelectedItems";
const locales = { en, pl };

const BodyPartSelector = () => {
  const {
    currentIndex,
    setCurrentIndex,
    handleNavigation,
    musclesAndJoints,
    selectedItems,
    language,
  } = useContext(AppointmentContext);
  const { handleChange } = useSelectedItems();
  const t = locales[language];
  const mappedData = mapData(musclesAndJoints, language);
  const {
    sectionName = "",
    sectionNamePL = "",
    muscles = [],
    joints = [],
  } = mappedData[currentIndex] || {};

  const selectedSection = selectedItems.find(
    (item) => item.sectionName === sectionName
  );

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
      setCurrentIndex(total > 0 ? total - 1 : 0);
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
