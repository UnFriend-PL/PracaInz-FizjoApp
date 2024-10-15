import React, { useState, useRef, useEffect } from "react";
import styles from "./detailField.module.scss";

const DetailField = ({ label, name, value, onChange, type, t, readOnly }) => {
  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useRef(null);

  const handleDoubleClick = () => {
    if (!readOnly) {
      setIsEditing(true);
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    onChange(e);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  const displayValue =
    type === "checkbox"
      ? value
        ? t.yes
        : t.no
      : value ||
        t[`no${name.charAt(0).toUpperCase() + name.slice(1)}Provided`] ||
        t.noDataProvided;

  return (
    <div className={styles.detailField}>
      <label className={styles.label}>{label}:</label>
      {isEditing && !readOnly ? (
        type === "checkbox" ? (
          <div className={styles.checkboxContainer}>
            <input
              type="checkbox"
              name={name}
              checked={value}
              onChange={onChange}
              className={styles.checkbox}
              onBlur={handleBlur}
              autoFocus
            />
            <span>{t.paid}</span>
          </div>
        ) : (
          <textarea
            name={name}
            value={value}
            onChange={handleInputChange}
            className={styles.textarea}
            onBlur={handleBlur}
            autoFocus
            ref={textareaRef}
            style={{ height: "auto", overflowY: "hidden" }}
          />
        )
      ) : (
        <div
          onDoubleClick={handleDoubleClick}
          className={styles.nonEditableField}
        >
          <span className={styles.value}>{displayValue}</span>
        </div>
      )}
    </div>
  );
};

export default DetailField;
