import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";
import styles from "./treatments.module.scss";
import apiService from "@/app/services/apiService/apiService";
import { LanguageContext } from "@/app/contexts/lang/langContext";
import { AppointmentContext } from "@/app/appointments/[appointmentId]/appointmentContext";
import AsyncSelect from "react-select/async";
import useSelectedItems from "@/app/appointments/utils/useSelectedItems";
import { UserContext } from "@/app/contexts/user/userContext";
import debounce from "lodash.debounce";

const TreatmentsAutoComplete = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [treatments, setTreatments] = useState([]);
  const { language } = useContext(LanguageContext);
  const [options, setOptions] = useState([]);
  const { user } = useContext(UserContext);
  const treatmentDetailsCache = useRef({});
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

    if (options && options.length > 0) {
      const selectedTreatment = await fetchTreatment(options[0].value);
      console.log(selectedTreatment, "selectedTreatment");
    }
  };

  const filterTreatments = (inputValue) => {
    return options
      .filter((i) => i.label.toLowerCase().includes(inputValue.toLowerCase()))
      .slice(0, 50); // Limit results to 50
  };

  const loadOptions = useCallback(
    debounce((inputValue, callback) => {
      let filteredOptions = filterTreatments(inputValue);
      console.log(filteredOptions.length, "filteredOptions");
      callback(filteredOptions);
    }, 300), // Debounce with 300ms delay
    [options]
  );

  return (
    <>
      <div className={styles.container}>
        <AsyncSelect
          cacheOptions
          loadOptions={loadOptions}
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
