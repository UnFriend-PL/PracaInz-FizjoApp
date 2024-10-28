import React, { useContext, useEffect } from "react";
import styles from "./appointmentDetails.module.scss";
import { LanguageContext } from "@/app/contexts/lang/langContext";
import pl from "./locales/pl.json";
import en from "./locales/en.json";
import SelectedItemsList from "./SelectedItemsList";
import BodyPartSelector from "./BodyPartSelector";
import { BodyContext } from "./bodyContext";

const locales = { en, pl };

const MusclesAndJoints = () => {
  const {
    mappedData,
    selectedItems,
    handleChange,
    handleRemove,
    saveBodyDetails,
    isSaving,
    isDataLoaded, // Dodano do sprawdzenia stanu
  } = useContext(BodyContext);
  const { language } = useContext(LanguageContext);
  const t = locales[language];
  useEffect(() => {
    console.log("Mapped data in MusclesAndJoints:", mappedData); // Log sprawdzający dane w komponencie
  }, [mappedData]);

  if (!isDataLoaded || !mappedData) {
    return <div>{t.loadingData}</div>; // Wyświetla komunikat o ładowaniu, gdy dane nie są jeszcze dostępne
  }

  return (
    <div className={styles.musclesAndJointsWrapper}>
      <SelectedItemsList
        selectedItems={selectedItems}
        handleRemove={handleRemove}
      />
      {mappedData.map((data, index) => (
        <BodyPartSelector
          key={index}
          sectionName={data.sectionName}
          sectionNamePL={data.sectionNamePL}
          muscles={data.muscles}
          joints={data.joints}
        />
      ))}
      <button
        onClick={saveBodyDetails}
        disabled={isSaving}
        className={styles.saveButton}
      >
        {isSaving ? t.savingBodyDetails : t.saveBodyDetails}
      </button>
    </div>
  );
};

export default MusclesAndJoints;
