import React, { useEffect, useState } from "react";
import styles from "./treatments.module.scss";
import Select from "react-select";
import apiService from "@/app/services/apiService/apiService";

const TreatmentsAutoComplete = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [treatments, setTreatments] = useState([]);

  const fetchTreatments = async () => {
    try {
      const response = await apiService.get(`/Treatments`, {}, true);
      if (response.success) {
        setTreatments(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTreatments();
  }, []);
  const options = treatments.map((treatment) => ({
    value: treatment.id,
    label: `${treatment.name} (${treatment.bodySectionName}, ${treatment.viewName})`,
  }));
  const handleChange = (options) => {
    setSelectedOptions(options);
  };

  return (
    <>
      <div className={styles.container}>
        <Select
          options={options}
          value={selectedOptions}
          onChange={handleChange}
          placeholder="Wyszukaj i wybierz zabiegi..."
          isClearable
          isMulti
        />
      </div>
    </>
  );
};

export default TreatmentsAutoComplete;
