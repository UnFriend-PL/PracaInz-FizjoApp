import React, { useContext, useEffect, useState } from "react";
import styles from "./treatments.module.scss";
import Select from "react-select";
import apiService from "@/app/services/apiService/apiService";
import { LanguageContext } from "@/app/contexts/lang/langContext";
import { AppointmentContext } from "@/app/appointments/[appointmentId]/appointmentContext";
import useSelectedItems from "@/app/appointments/utils/useSelectedItems";
import { UserContext } from "@/app/contexts/user/userContext";

const TreatmentsAutoComplete = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [treatments, setTreatments] = useState([]);
  const { language } = useContext(LanguageContext);
  const [options, setOptions] = useState([]);
  const { user } = useContext(UserContext);
  console.log(user, "user");
  const { selectedItems, handleChange } = useSelectedItems();

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

  const fetchTreatment = async (id) => {
    try {
      const response = await apiService.post(
        `/Treatments/Treatment`,
        {
          id: id,
          gender: user.gender,
        },
        true
      );
      if (response.success) {
        return response.data;
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTreatments();
  }, []);

  useEffect(() => {
    setOptions(
      treatments.map((treatment) => ({
        value: treatment.id,
        label:
          language == "en"
            ? `${treatment.name} (${treatment.bodySectionName}, ${treatment.viewName})`
            : `${treatment.namePL} (${
                treatment.bodySectionNamePL
              }, ${treatment.viewName
                .replace("front", "przód")
                .replace("back", "tył")})`,
      }))
    );
    setSelectedOptions((prevSelectedOptions) =>
      prevSelectedOptions.map((option) => {
        const treatment = treatments.find((t) => t.id === option.value);
        if (!treatment) return option;
        return {
          ...option,
          label:
            language === "en"
              ? `${treatment.name} (${treatment.bodySectionName}, ${treatment.viewName})`
              : `${treatment.namePL} (${
                  treatment.bodySectionNamePL
                }, ${treatment.viewName
                  .replace("front", "przód")
                  .replace("back", "tył")})`,
        };
      })
    );
  }, [language, treatments]);

  const getTreatmentDetails = async (id) => {
    if (treatmentDetailsCache.current[id]) {
      return treatmentDetailsCache.current[id];
    }
    const data = await fetchTreatment(id);
    if (data) {
      treatmentDetailsCache.current[id] = data;
    }
    return data;
  };

  const handleTreatmentSelectChange = async (options) => {
    setSelectedOptions(options);
    console.log(options, "treatments");
    const selectedTreatment = await fetchTreatment(options[0].value);
    console.log(selectedTreatment, "selectedTreatment");
  };

  return (
    <>
      <div className={styles.container}>
        <Select
          options={options}
          value={selectedOptions}
          onChange={handleTreatmentSelectChange}
          placeholder="Wyszukaj i wybierz zabiegi..."
          isClearable
          isMulti
        />
      </div>
    </>
  );
};

export default TreatmentsAutoComplete;
