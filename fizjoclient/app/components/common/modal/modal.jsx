import { useState } from "react";
import styles from "./modal.module.scss";

const Modal = ({ isOpen, onClose, children, size, header }) => {
  if (!isOpen) return null;

  const getSizeClass = (size) => {
    switch (size) {
      case "small":
        return styles.small;
      case "medium":
        return styles.medium;
      case "large":
        return styles.large;
      default:
        return styles.small;
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={`${styles.modalContent} ${getSizeClass(size)}`}>
        <div className={styles.modalNavigation}>
          <button className={styles.closeButton} onClick={onClose}>
            &times;
          </button>
          <div className={styles.header}>{header}</div>
        </div>

        {children}
      </div>
    </div>
  );
};

export default Modal;
