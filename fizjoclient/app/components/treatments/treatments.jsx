import React, { useContext, useState, useCallback, useEffect } from "react";
import styles from "./treatments.module.scss";
import apiService from "@/app/services/apiService/apiService";
import { LanguageContext } from "@/app/contexts/lang/langContext";
import { UserContext } from "@/app/contexts/user/userContext";
import { AsyncPaginate } from "react-select-async-paginate";
import pl from "./locales/pl.json";
import en from "./locales/en.json";
import useSelectedItems from "@/app/appointments/utils/useSelectedItems";
import { AppointmentContext } from "@/app/appointments/AppointmentContext";

const locales = { en, pl };

const TreatmentsAutoComplete = () => {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [includeSelectedBodyParts, setIncludeSelectedBodyParts] = useState(true);
    const [refreshKey, setRefreshKey] = useState(0);
    const { language } = useContext(LanguageContext);
    const { user } = useContext(UserContext);
    const t = locales[language];
    const { selectedItems } = useSelectedItems();
    const { gender } = useContext(AppointmentContext);
    const [selectedTreatments, setSelectedTreatments] = useState([]);

    // Nowe stany dla edycji czasu trwania
    const [editingTreatmentId, setEditingTreatmentId] = useState(null);
    const [newDuration, setNewDuration] = useState("");

    const prepareRequestPayload = (inputValue, page, bodyParts, userId, gender) => ({
        ownerId: userId || "",
        searchTerm: inputValue,
        limit: 50,
        page,
        bodyParts,
        gender,
    });

    const mapTreatmentsToOptions = (treatments, language) =>
        treatments.map((treatment) => ({
            value: treatment.id,
            label:
                language === "en"
                    ? `${treatment.name} (${treatment.bodySectionName}, ${treatment.viewName})`
                    : `${treatment.namePL} (${treatment.bodySectionNamePL}, ${treatment.viewNamePL})`,
        }));

    const fetchTreatments = async (payload) => {
        try {
            const response = await apiService.post(`/Treatments`, payload, true);
            return response.success ? response.data : [];
        } catch (error) {
            console.error(error);
            return [];
        }
    };

    const loadOptions = useCallback(
        async (inputValue, prevOptions, { page }) => {
            const bodyParts = includeSelectedBodyParts
                ? selectedItems.map((item) => item.sectionName)
                : [];

            const payload = prepareRequestPayload(inputValue, page, bodyParts, user?.id, gender);

            const treatments = await fetchTreatments(payload);
            const options = mapTreatmentsToOptions(treatments, language);

            const hasMore = treatments.length === 50;

            return {
                options,
                hasMore,
                additional: {
                    page: page + 1,
                },
            };
        },
        [user?.id, includeSelectedBodyParts, selectedItems, language, gender]
    );

    const handleTreatmentSelectChange = (options) => {
        if (options && options.length > selectedOptions.length) {
            const newOption = options[options.length - 1];
            fetchTreatmentDetail(newOption.value);
        }
        setSelectedOptions(options || []);
    };

    const fetchTreatmentDetail = async (id) => {
        try {
            const response = await apiService.post(
                `/Treatments/Treatment`,
                {
                    id: id,
                    gender: gender,
                },
                true
            );
            if (response.success) {
                setSelectedTreatments((prev) => [...prev, response.data]);
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    const handleCheckboxChange = (event) => {
        setIncludeSelectedBodyParts(event.target.checked);
        setSelectedOptions([]);
        setRefreshKey((prevKey) => prevKey + 1);
    };

    const handleDurationChange = (treatmentId) => {
        // Aktualizuj czas trwania w stanie selectedTreatments
        setSelectedTreatments((prevTreatments) =>
            prevTreatments.map((treatment) =>
                treatment.id === treatmentId ? { ...treatment, duration: newDuration } : treatment
            )
        );
        // Resetuj stan edycji
        setEditingTreatmentId(null);
        setNewDuration("");
    };

    useEffect(() => {
        setRefreshKey((prevKey) => prevKey + 1);
    }, [language]);

    useEffect(() => {
        setSelectedOptions([]);
    }, [refreshKey]);

    return (
        <div className={styles.container}>
            <label className={styles.checkboxLabel}>
                <input
                    type="checkbox"
                    checked={includeSelectedBodyParts}
                    onChange={handleCheckboxChange}
                />
                {t.includeSelectedTreatmentsOnly}
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
                debounceTimeout={500}
                key={refreshKey}
            />
            <div className={styles.selectedTreatmentsContainer}>
                {selectedTreatments.map((treatment) => (
                    <div key={treatment.id} className={styles.selectedTreatment}>
                        <div className={styles.treatmentInfo}>
              <span className={styles.treatmentName}>
                {language === "en" ? treatment.name : treatment.namePL}
              </span>
                            {editingTreatmentId === treatment.id ? (
                                <input
                                    type="text"
                                    className={styles.durationInput}
                                    value={newDuration}
                                    onChange={(e) => setNewDuration(e.target.value)}
                                    onBlur={() => handleDurationChange(treatment.id)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handleDurationChange(treatment.id);
                                        }
                                    }}
                                    autoFocus
                                />
                            ) : (
                                <span
                                    className={styles.treatmentDuration}
                                    onDoubleClick={() => {
                                        setEditingTreatmentId(treatment.id);
                                        setNewDuration(treatment.duration);
                                    }}
                                >
                  {treatment.duration}
                </span>
                            )}
                        </div>
                        <div className={styles.hoverDetails}>
              <span className={styles.detailsElement}>
                {language === "en"
                    ? treatment.bodySectionName
                    : treatment.bodySectionNamePL}
                  &nbsp;
                  {treatment.bodySide &&
                      (language === "en" ? treatment.bodySide : treatment.bodySidePL)}
                  &nbsp;
                  {treatment.viewName &&
                      (language === "en" ? treatment.viewName : treatment.viewNamePL)}
              </span>
                            <span className={styles.detailsElement}>
                {language === "en" ? treatment.description : treatment.descriptionPL}
              </span>
                        </div>
                        <button
                            className={styles.deleteButton}
                            onClick={() => {
                                setSelectedTreatments((prev) =>
                                    prev.filter((item) => item.id !== treatment.id)
                                );
                                setSelectedOptions((prev) =>
                                    prev.filter((option) => option.value !== treatment.id)
                                );
                            }}
                        >
                            &times;
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TreatmentsAutoComplete;
