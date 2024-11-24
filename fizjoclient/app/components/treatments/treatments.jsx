import React, { useContext, useState, useCallback } from "react";
import styles from "./treatments.module.scss";
import apiService from "@/app/services/apiService/apiService";
import { LanguageContext } from "@/app/contexts/lang/langContext";
import { UserContext } from "@/app/contexts/user/userContext";
import { AsyncPaginate } from "react-select-async-paginate";
import pl from "./locales/pl.json";
import en from "./locales/en.json";
import useSelectedItems from "@/app/appointments/utils/useSelectedItems";
import {AppointmentContext} from "@/app/appointments/AppointmentContext";

const locales = { en, pl };

const TreatmentsAutoComplete = () => {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [includeSelectedBodyParts, setIncludeSelectedBodyParts] = useState(true);
    const { language } = useContext(LanguageContext);
    const { user } = useContext(UserContext);
    const t = locales[language];
    const { selectedItems } = useSelectedItems();
    const { gender } = useContext(AppointmentContext)
    const loadOptions = useCallback(
        async (inputValue, prevOptions, { page }) => {
            try {
                const bodyParts = includeSelectedBodyParts
                    ? selectedItems.map((item) => item.sectionName)
                    : [];

                const response = await apiService.post(
                    `/Treatments`,
                    {
                        ownerId: user?.id || "",
                        searchTerm: inputValue,
                        limit: 50,
                        page: page,
                        bodyParts: bodyParts,
                        gender: gender
                    },
                    true
                );

                if (response.success) {
                    const treatments = response.data;
                    const options = treatments.map((treatment) => ({
                        value: treatment.id,
                        label:
                            language === "en"
                                ? `${treatment.name} (${treatment.bodySectionName}, ${treatment.viewName})`
                                : `${treatment.namePL} (${treatment.bodySectionNamePL}, ${treatment.viewNamePL})`,
                    }));

                    const hasMore = treatments.length === 50;

                    return {
                        options,
                        hasMore,
                        additional: {
                            page: page + 1,
                        },
                    };
                } else {
                    return {
                        options: [],
                        hasMore: false,
                    };
                }
            } catch (error) {
                console.error(error);
                return {
                    options: [],
                    hasMore: false,
                };
            }
        },
        [user?.id, language, includeSelectedBodyParts, selectedItems]
    );

    const handleTreatmentSelectChange = (options) => {
        setSelectedOptions(options);
        // Additional logic after selecting options
    };

    const handleCheckboxChange = (event) => {
        setIncludeSelectedBodyParts(event.target.checked);
        setSelectedOptions([]);
    };

    return (
        <div className={styles.container}>
            <label className={styles.checkboxLabel}>
                <input
                    type="checkbox"
                    checked={includeSelectedBodyParts}
                    onChange={handleCheckboxChange}
                />
                {t.includeSelectedBodyParts || "Uwzględnij tylko zaznaczone partie ciała"}
            </label>
            <AsyncPaginate
                className={styles.selectTreatments}
                cacheOptions
                loadOptions={loadOptions}
                value={selectedOptions}
                onChange={handleTreatmentSelectChange}
                placeholder={t.treatmentSearch}
                noOptionsMessage={() => t.treatmentTypeToSearch}
                isClearable
                isMulti
                additional={{
                    page: 1,
                }}
                debounceTimeout={500} // Add this line to debounce typing input by 500ms
            />
        </div>
    );
};

export default TreatmentsAutoComplete;
