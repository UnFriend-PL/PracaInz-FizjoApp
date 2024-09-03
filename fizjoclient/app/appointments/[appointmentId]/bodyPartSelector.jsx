import React from "react";
import Select from "react-select";
import styles from "./appointmentDetails.module.scss";

const BodyPartSelector = React.memo(
  ({ sectionName, muscles, joints, selectedItems, handleChange }) => (
    <div className={styles.bodyPartContainer}>
      <div className={styles.bodyPart}>
        <div className={styles.bodyPartHeader}>
          {sectionName.replace("-", " ")}
        </div>
        <div className={styles.bodyPartSubHeader}>Muscles:</div>
        <Select
          options={muscles}
          isMulti
          onChange={(selected) =>
            handleChange(selected, sectionName, "muscles")
          }
          value={selectedItems[sectionName]?.muscles || []}
          className={styles.select}
          placeholder="Select muscles"
        />
        <div className={styles.bodyPartSubHeader}>Joints:</div>
        <Select
          options={joints}
          isMulti
          onChange={(selected) => handleChange(selected, sectionName, "joints")}
          value={selectedItems[sectionName]?.joints || []}
          className={styles.select}
          placeholder="Select joints"
        />
      </div>
    </div>
  )
);

export default BodyPartSelector;
