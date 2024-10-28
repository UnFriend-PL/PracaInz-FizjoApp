import React, { useContext } from "react";
import Select from "react-select";
import styles from "./appointmentDetails.module.scss";
import { LanguageContext } from "@/app/contexts/lang/langContext";

import pl from "./locales/pl.json";
import en from "./locales/en.json";

const locales = { en, pl };

const BodyPartSelector = ({
  sectionName,
  sectionNamePL,
  muscles,
  joints,
  selectedItems,
  handleChange,
}) => {
  const { language } = useContext(LanguageContext);
  const t = locales[language];

  const selectedSection = selectedItems.find(
    (item) => item.sectionName === sectionName
  );

  return (
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
  );
};

export default BodyPartSelector;
