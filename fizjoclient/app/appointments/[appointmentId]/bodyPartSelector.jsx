import React, { useContext } from "react";
import Select from "react-select";
import styles from "./appointmentDetails.module.scss";
import { LanguageContext } from "@/app/contexts/lang/langContext";

import pl from "./locales/pl.json";
import en from "./locales/en.json";

const locales = { en, pl };

const BodyPartSelector = ({
  sectionName,
  muscles,
  joints,
  selectedItems,
  handleChange,
}) => {
  const { language } = useContext(LanguageContext);
  const t = locales[language];

  return (
    <div className={styles.bodyPartContainer}>
      <div className={styles.bodyPart}>
        <div className={styles.bodyPartHeader}>
          {sectionName.replace("-", " ")}
        </div>
        <div className={styles.bodyPartSubHeader}>{t.muscles}:</div>
        <Select
          options={muscles}
          isMulti
          onChange={(selected) =>
            handleChange(selected, sectionName, "muscles")
          }
          value={selectedItems[sectionName]?.muscles || []}
          className={styles.select}
          placeholder={t.selectMuscles}
        />
        <div className={styles.bodyPartSubHeader}>{t.joints}:</div>
        <Select
          options={joints}
          isMulti
          onChange={(selected) => handleChange(selected, sectionName, "joints")}
          value={selectedItems[sectionName]?.joints || []}
          className={styles.select}
          placeholder={t.selectJoints}
        />
      </div>
    </div>
  );
};

export default BodyPartSelector;
