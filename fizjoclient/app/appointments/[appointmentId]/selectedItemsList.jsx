// selectedItemsList.jsx
import React, { useContext } from "react";
import styles from "./appointmentDetails.module.scss";
import { LanguageContext } from "@/app/contexts/lang/langContext";
import pl from "./locales/pl.json";
import en from "./locales/en.json";
import { BodyContext } from "./bodyContext";

const locales = { en, pl };

const SelectedItemsList = () => {
  const { selectedItems, handleRemove } = useContext(BodyContext);
  const { language } = useContext(LanguageContext);
  const t = locales[language];

  if (!selectedItems || selectedItems.length === 0) {
    return <div>{t.noSelectedItems}</div>; // Komunikat, jeśli brak wybranych elementów
  }

  return (
    <div className={styles.selectedItemsList}>
      <span className={styles.selectedItemsHeader}>{t.selectedItems}:</span>
      {selectedItems.map(({ sectionName, sectionNamePL, muscles, joints }) => (
        <div key={sectionName} className={styles.selectedSection}>
          <div className={styles.selectedSectionHeader}>
            {language === "pl"
              ? sectionNamePL.replace("front", "przód").replace("back", "tył")
              : sectionName}
          </div>
          {muscles?.map((muscle) => (
            <div key={muscle.value} className={styles.selectedItem}>
              <span className={styles.selectedItemLabel}>{muscle.label}</span>
              <button
                onClick={() =>
                  handleRemove(
                    { sectionName, sectionNamePL },
                    "muscles",
                    muscle.value
                  )
                }
                className={styles.removeButton}
              >
                &times;
              </button>
            </div>
          ))}
          {joints?.map((joint) => (
            <div key={joint.value} className={styles.selectedItem}>
              <span className={styles.selectedItemLabel}>{joint.label}</span>
              <button
                onClick={() =>
                  handleRemove(
                    { sectionName, sectionNamePL },
                    "joints",
                    joint.value
                  )
                }
                className={styles.removeButton}
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SelectedItemsList;
