import React from "react";
import styles from "./appointmentDetails.module.scss";

const SelectedItemsList = React.memo(({ selectedItems, handleRemove }) => (
  <div className={styles.selectedItemsList}>
    <span className={styles.selectedItemsHeader}>Selected items:</span>
    {Object.entries(selectedItems).map(([sectionName, items]) => (
      <div key={sectionName} className={styles.selectedSection}>
        <div className={styles.selectedSectionHeader}>
          {sectionName.replace("-", " ")}:
        </div>
        {["muscles", "joints"].map((type) =>
          items[type]?.map((item) => (
            <div key={item.value} className={styles.selectedItem}>
              <div className={styles.selectedItemLabel}>{item.label}</div>
              <button
                onClick={() => handleRemove(sectionName, type, item.value)}
                className={styles.removeButton}
              >
                &times;
              </button>
            </div>
          ))
        )}
      </div>
    ))}
  </div>
));

export default SelectedItemsList;
