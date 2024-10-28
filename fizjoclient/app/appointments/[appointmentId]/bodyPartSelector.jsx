// bodyPartSelector.jsx
import React, { useContext } from "react";
import Select from "react-select";
import styles from "./appointmentDetails.module.scss";
import { LanguageContext } from "@/app/contexts/lang/langContext";
import pl from "./locales/pl.json";
import en from "./locales/en.json";
import { BodyContext } from "./bodyContext";

const locales = { en, pl };

const BodyPartSelector = () => {
  const { mappedData, selectedItems, handleChange } = useContext(BodyContext);
  const { language } = useContext(LanguageContext);
  const t = locales[language];

  if (!mappedData || mappedData.length === 0) {
    return <div>{t.noData}</div>; // Wyświetl komunikat, jeśli brak danych
  }

  return (
    <div className={styles.bodyPartContainer}>
      {mappedData.map((section) => (
        <div key={section.sectionName} className={styles.bodyPart}>
          <div className={styles.bodyPartHeader}>
            {language === "en" ? section.sectionName : section.sectionNamePL}
          </div>
          <div className={styles.bodyPartSubHeader}>{t.muscles}:</div>
          <Select
            options={section.muscles}
            isMulti
            onChange={(selected) => handleChange(selected, section, "muscles")}
            value={
              selectedItems.find(
                (item) => item.sectionName === section.sectionName
              )?.muscles || []
            }
            className={styles.select}
            placeholder={t.selectMuscles}
          />
          <div className={styles.bodyPartSubHeader}>{t.joints}:</div>
          <Select
            options={section.joints}
            isMulti
            onChange={(selected) => handleChange(selected, section, "joints")}
            value={
              selectedItems.find(
                (item) => item.sectionName === section.sectionName
              )?.joints || []
            }
            className={styles.select}
            placeholder={t.selectJoints}
          />
        </div>
      ))}
    </div>
  );
};

export default BodyPartSelector;
