import React from "react";
import styles from "./detailGroup.module.scss";

const DetailGroup = ({ title, name, onShowDetails, t }) => (
  <div className={styles.detailsGroup}>
    <div className={styles.detailGroupName}>{title}:</div>
    <div className={styles.name}>{name}</div>
    <button className={styles.detailGroupButton} onClick={onShowDetails}>
      {t.showDetails}
    </button>
  </div>
);

export default DetailGroup;
