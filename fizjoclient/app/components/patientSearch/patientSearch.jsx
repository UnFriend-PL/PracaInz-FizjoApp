import React, { useContext, useState } from "react";
import apiService from "@/app/services/apiService/apiService";
import PatientDeails from "@/app/components/patientSearch/patientDetails";
import styles from "./patientSearch.module.scss";
import pl from "./locales/pl.json";
import en from "./locales/en.json";
import { LanguageContext } from "@/app/contexts/lang/langContext";

const locales = { en, pl };

const PatientSearch = ({
  onPatientSelect,
  buttonText,
  displayLabel = true,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showPatientDetails, setShowPatientDetails] = useState(false);
  const [error, setError] = useState(null);

  const { language } = useContext(LanguageContext);

  const t = locales[language];
  const searchPatient = async () => {
    if (!searchValue) return;
    try {
      const searchPayload = { searchParam: searchValue };
      const response = await apiService.post(
        `/User/FindPatient`,
        searchPayload,
        true
      );
      if (response.success) {
        setSelectedPatient(response.data);
        setError(null);
        if (onPatientSelect) {
          onPatientSelect(response.data);
        }
      } else {
        setError(response.message);
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred while searching for the patient.");
    }
  };

  const removeSelectedPatient = () => {
    setSelectedPatient(null);
    if (onPatientSelect) {
      onPatientSelect(null);
    }
  };

  return (
    <div className={styles.patientSearch}>
      <div className={styles.searchField}>
        {displayLabel && <div className={styles.searchLabel}>{t.patient}:</div>}

        {selectedPatient ? (
          <div className={styles.searchValue}>
            {selectedPatient.firstName} {selectedPatient.lastName}{" "}
            <span
              className={styles.deletePatient}
              onClick={removeSelectedPatient}
            >
              &times;
            </span>
            <span
              className={styles.showDetails}
              onClick={() => {
                setShowPatientDetails((prev) => !prev);
              }}
            >
              {showPatientDetails ? t.showLess : t.showMore}
            </span>
            {showPatientDetails && (
              <PatientDeails
                patient={selectedPatient}
                className={styles.patientDeails}
              />
            )}
          </div>
        ) : (
          <>
            <input
              className={styles.searchInput}
              type="text"
              name="search"
              placeholder={t.searchPatient}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button className={styles.searchButton} onClick={searchPatient}>
              {buttonText ?? t.search}
            </button>
          </>
        )}
        {error && <div className={styles.error}>{error}</div>}
      </div>
    </div>
  );
};

export default PatientSearch;
