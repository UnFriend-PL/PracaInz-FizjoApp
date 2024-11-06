import React, { useContext } from "react";
import Select from "react-select";
import styles from "./appointmentDetails.module.scss";
import { LanguageContext } from "@/app/contexts/lang/langContext";
import pl from "./locales/pl.json";
import en from "./locales/en.json";
import { AppointmentContext } from "./AppointmentContext";

const locales = { en, pl };

const BodyPartSelector = () => {
  const { language } = useContext(LanguageContext);
  const { selectedParts, musclesAndJoints, t, setSelectedParts } =
    useContext(AppointmentContext);

  const handleChange = (selected, section, type) => {
    const updatedParts = { ...selectedParts };
    updatedParts[section.sectionName][type] = selected;
    setSelectedParts(updatedParts);
  };

  return (
    <div className={styles.bodyPartContainer}>
      {Object.keys(selectedParts).map((sectionName) => {
        const selectedSection = selectedParts[sectionName];
        const section =
          musclesAndJoints.find((part) => part.slug === sectionName) || {};
        return (
          <div key={sectionName} className={styles.bodyPart}>
            <div className={styles.bodyPartHeader}>
              {language === "en"
                ? sectionName.replace("-", " ")
                : (section.slugPL || "")
                    .replace("-", " ")
                    .replace("front", "przód")
                    .replace("back", "tył")}
            </div>
            <div className={styles.bodyPartSubHeader}>{t.muscles}:</div>
            <Select
              options={musclesAndJoints}
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
              value={selectedSection.muscles || []}
              className={styles.select}
              placeholder={t.selectMuscles}
            />
            <div className={styles.bodyPartSubHeader}>{t.joints}:</div>
            <Select
              options={musclesAndJoints}
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
              value={selectedSection.joints || []}
              className={styles.select}
              placeholder={t.selectJoints}
            />
          </div>
        );
      })}
    </div>
  );
};

export default BodyPartSelector;
