import React, { useContext } from "react";
import styles from "./appointmentDetails.module.scss";
import useSelectedItems from "../utils/useSelectedItems";
import { AppointmentContext } from "./appointmentContext";
import { LanguageContext } from "@/app/contexts/lang/langContext";
import pl from "./locales/pl.json";
import en from "./locales/en.json";

const locales = { en, pl };
const SelectedItemsList = () => {
  const { readOnly } = useContext(AppointmentContext);
  const { language } = useContext(LanguageContext);
  const t = locales[language];

  const { selectedItems, handleRemove } = useSelectedItems();
  console.log(selectedItems)
  return (
    <div className={styles.selectedItemsList}>
      <span className={styles.selectedItemsHeader}>{t.selectedItems}:</span>
      {selectedItems.map(({ sectionName, sectionNamePL, muscles, joints }) => (
        <div key={sectionName} className={styles.selectedSection}>
          <div className={styles.selectedSectionHeader}>
            {language === "pl"
              ? sectionNamePL?.replace("front", "przód").replace("back", "tył")
              : sectionName}
          </div>
          {["muscles", "joints"].map((type) =>
            (type === "muscles" ? muscles : joints)?.map((item, index) => (
              <div
                key={item?.value || `index-${index}`}
                className={styles.selectedItem}
              >
                <div className={styles.selectedItemLabel}>
                  {item?.label || "Unknown"}
                </div>
                {!readOnly && item && (
                  <button
                    onClick={() =>
                      handleRemove(
                        { sectionName, sectionNamePL },
                        type,
                        item.value
                      )
                    }
                    className={styles.removeButton}
                  >
                    &times;
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      ))}
    </div>
  );
};

export default SelectedItemsList;
