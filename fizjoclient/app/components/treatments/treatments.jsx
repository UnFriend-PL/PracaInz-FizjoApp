import React, { useContext, useState, useRef, useCallback } from "react";
import styles from "./treatments.module.scss";
import apiService from "@/app/services/apiService/apiService";
import { LanguageContext } from "@/app/contexts/lang/langContext";
import { UserContext } from "@/app/contexts/user/userContext";
import AsyncSelect from "react-select/async";
import useSelectedItems from "@/app/appointments/utils/useSelectedItems";
import debounce from "lodash.debounce";
import pl from "./locales/pl.json";
import en from "./locales/en.json";

const locales = { en, pl };

const TreatmentsAutoComplete = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [treatments, setTreatments] = useState([]);
  const { language } = useContext(LanguageContext);
  const [options, setOptions] = useState([]);
  const { user } = useContext(UserContext);
  const treatmentDetailsCache = useRef({});
  const treatmentsCache = useRef(null);
  const { selectedItems, handleChange } = useSelectedItems();
  const t = locales[language];

  const fetchTreatments = async () => {
    if (treatmentsCache.current) {
      setTreatments(treatmentsCache.current);
      setOptions(
        treatmentsCache.current.map((treatment) => ({
          value: treatment.id,
          label:
            language === "en"
              ? `${treatment.name} (${treatment.bodySectionName}, ${treatment.viewName})`
              : `${treatment.namePL} (${
                  treatment.bodySectionNamePL
                }, ${treatment.viewName
                  .replace("front", "przód")
                  .replace("back", "tył")})`,
        }))
      );
      return;
    }

    try {
      const response = await apiService.get(`/Treatments`, {}, true);
      if (response.success) {
        treatmentsCache.current = response.data;
        setTreatments(response.data);
        setOptions(
          response.data.map((treatment) => ({
            value: treatment.id,
            label:
              language === "en"
                ? `${treatment.name} (${treatment.bodySectionName}, ${treatment.viewName})`
                : `${treatment.namePL} (${
                    treatment.bodySectionNamePL
                  }, ${treatment.viewName
                    .replace("front", "przód")
                    .replace("back", "tył")})`,
          }))
        );
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
    if (options && options.length > 0) {
      const selectedTreatment = await fetchTreatment(options[0].value);
    }
  };

  const filterTreatments = (inputValue) => {
    return options
      .filter((i) => i.label.toLowerCase().includes(inputValue.toLowerCase()))
      .slice(0, 50);
  };

  const loadOptions = useCallback(
    debounce((inputValue, callback) => {
      let filteredOptions = filterTreatments(inputValue);
      callback(filteredOptions);
    }, 300),
    [options]
  );

  return (
    <div className={styles.container}>
      <AsyncSelect
        className={styles.selectTreatments}
        cacheOptions
        loadOptions={loadOptions}
        value={selectedOptions}
        onChange={handleTreatmentSelectChange}
        onMenuOpen={fetchTreatments}
        placeholder={t.treatmentSearch}
        noOptionsMessage={() => t.treatmentTypeToSearch}
        isClearable
        isMulti
      />
    </div>
  );
};

export default TreatmentsAutoComplete;
