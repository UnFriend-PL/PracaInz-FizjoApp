import React, {
    useContext,
    useState,
    useCallback,
    useEffect,
} from "react";
import {AsyncPaginate} from "react-select-async-paginate";
import styles from "./treatments.module.scss";
import apiService from "@/app/services/apiService/apiService";
import {LanguageContext} from "@/app/contexts/lang/langContext";
import {UserContext} from "@/app/contexts/user/userContext";
import {AppointmentContext} from "@/app/appointments/AppointmentContext";
import useSelectedItems from "@/app/appointments/utils/useSelectedItems";
import {CiCircleChevUp} from "react-icons/ci";
import {CiCircleChevDown} from "react-icons/ci";

import pl from "./locales/pl.json";
import en from "./locales/en.json";

const locales = {en, pl};

const TreatmentItem = ({treatment, onEdit, onDelete, language}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newValue, setNewValue] = useState("");
    const [showDetails, setShowDetails] = useState(false);

    const handleEdit = () => {
        setIsEditing(true);
        setNewValue(treatment.notes || "");
    };

    const saveEdit = () => {
        onEdit(treatment.id, newValue);
        setIsEditing(false);
    };

    return (
        <div className={styles.treatmentItem} key={treatment.id}>
            <div className={styles.treatmentHeader}>
        <span className={styles.treatmentName}>
          {language === "en" ? treatment.name : treatment.namePL}
        </span>
                <span className={styles.treatmentDuration}>{treatment.duration}</span>
                <div className={styles.treatmentBodyDetails}>
          <span>
            {language === "en"
                ? treatment.bodySectionName
                : treatment.bodySectionNamePL}
          </span>
                    <span>
            {language === "en" ? treatment.viewName : treatment.viewNamePL}
          </span>
                    <span>
            {language === "en" ? treatment.bodySide : treatment.bodySidePL}
          </span>
                </div>
                {showDetails ? (
                    <CiCircleChevUp
                        className={styles.showMore}
                        onClick={() => {
                            setShowDetails((prev) => !prev);
                        }}
                    />
                ) : (
                    <CiCircleChevDown
                        className={styles.showMore}
                        onClick={() => {
                            setShowDetails((prev) => !prev);
                        }}
                    />
                )}
            </div>
            {showDetails && (
                <>
                    <div className={styles.treatmentDetails}>
            <span className={styles.treatmentDetailsElement}>
              {language == "en"
                  ? treatment.description
                  : treatment.descriptionPL}
            </span>
                        {isEditing ? (
                            <textarea
                                value={newValue}
                                onChange={(e) => setNewValue(e.target.value)}
                                onBlur={saveEdit}
                                onKeyDown={(e) => e.key === "Enter" && saveEdit()}
                                autoFocus
                            />
                        ) : (
                            <span
                                onDoubleClick={handleEdit}
                                className={styles.treatmentDetailsElement}
                                style={{cursor: "pointer"}}
                            >
                {treatment.notes || "Add notes"}
              </span>
                        )}
                        <button onClick={() => onDelete(treatment.id)}>Delete</button>
                    </div>
                </>
            )}
        </div>
    );
};

const TreatmentsAutoComplete = () => {
    const [selectedTreatments, setSelectedTreatments] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [includeSelectedBodyParts, setIncludeSelectedBodyParts] =
        useState(true);
    const {language} = useContext(LanguageContext);
    const {user} = useContext(UserContext);
    const {gender, appointmentId} = useContext(AppointmentContext);
    const {selectedItems} = useSelectedItems();
    const t = locales[language];

    const fetchTreatments = useCallback(async (payload) => {
        try {
            const response = await apiService.post("/Treatments", payload, true);
            return response.success ? response.data : [];
        } catch (error) {
            console.error("Failed to fetch treatments:", error);
            return [];
        }
    }, []);

    const preparePayload = useCallback(
        (inputValue, page) => ({
            ownerId: user?.id || "",
            searchTerm: inputValue,
            limit: 50,
            page,
            bodyParts: includeSelectedBodyParts
                ? selectedItems.map((item) => item.sectionName)
                : [],
            gender,
        }),
        [user?.id, includeSelectedBodyParts, selectedItems, gender]
    );


    const loadOptions = useCallback(
        async (inputValue, _, {page}) => {
            const payload = preparePayload(inputValue, page);
            const treatments = await fetchTreatments(payload);
            const options = treatments.map((treatment) => ({
                value: treatment.id,
                label: language === "en" ? `${treatment.name} (${treatment.bodySectionName}, ${treatment.viewName}, ${treatment.bodySide})`
                    : `${treatment.namePL} (${treatment.bodySectionNamePL}, ${treatment.viewNamePL}, ${treatment.bodySidePL})`
                ,
            }));

            return {
                options,
                hasMore: treatments.length === 50,
                additional: {page: page + 1},
            };
        },
        [fetchTreatments, preparePayload, language]
    );

    useEffect(() => {
        if (!appointmentId) return;

        const fetchSavedTreatments = async () => {
            try {
                const response = await apiService.get(
                    `/Treatments/${appointmentId}`,
                    {},
                    true
                );
                if (response.success) {
                    const uniqueTreatments = response.data.treatments.map((item) => ({
                        ...item.treatment,
                        notes: item.notes,
                    }));
                    setSelectedTreatments(uniqueTreatments);
                    setSelectedOptions(
                        uniqueTreatments.map((treatment) => ({
                            value: treatment.id,
                            label: language === "en" ? `${treatment.name} (${treatment.bodySectionName}, ${treatment.viewName}, ${treatment.bodySide})`
                                : `${treatment.namePL} (${treatment.bodySectionNamePL}, ${treatment.viewNamePL}, ${treatment.bodySidePL})`
                        }))
                    );
                }
            } catch (error) {
                console.error("Failed to fetch saved treatments:", error);
            }
        };

        fetchSavedTreatments();
    }, [appointmentId, language]);

    const handleSelectionChange = (options) => {
        setSelectedOptions(options || []);
        if (options && options.length > selectedOptions.length) {
            const newOption = options[options.length - 1];
            fetchTreatmentDetail(newOption.value);
        }
    };

    const fetchTreatmentDetail = async (id) => {
        try {
            const response = await apiService.post(
                "/Treatments/Treatment",
                {id, gender},
                true
            );
            if (response.success) {
                setSelectedTreatments((prev) =>
                    prev.some((treatment) => treatment.id === id)
                        ? prev
                        : [...prev, {...response.data, notes: ""}]
                );
            }
        } catch (error) {
            console.error("Failed to fetch treatment details:", error);
        }
    };

    const updateTreatmentNotes = (id, notes) => {
        setSelectedTreatments((prev) =>
            prev.map((treatment) =>
                treatment.id === id ? {...treatment, notes} : treatment
            )
        );
    };

    const removeTreatment = (id) => {
        setSelectedTreatments((prev) =>
            prev.filter((treatment) => treatment.id !== id)
        );
        setSelectedOptions((prev) => prev.filter((option) => option.value !== id));
    };

    const saveTreatments = async () => {
        const payload = {
            appointmentId,
            treatments: selectedTreatments.map((treatment) => ({
                treatmentId: treatment.id,
                duration: treatment.duration,
                notes: treatment.notes,
                updateDate: new Date().toISOString(),
            })),
        };

        try {
            await apiService.post("/Treatments/Save", payload, true);
        } catch (error) {
            console.error("Failed to save treatments:", error);
        }
    };

    const handleChangeIncludeSelectedBodyParts = () => {
        setIncludeSelectedBodyParts((prev) => !prev)
        fetchTreatments()
    }

    return (
        <div className={styles.container}>
            <label>
                <input
                    type="checkbox"
                    checked={includeSelectedBodyParts}
                    onChange={handleChangeIncludeSelectedBodyParts}
                />
                {t.includeSelectedTreatmentsOnly}
            </label>

            <AsyncPaginate
                key={language}
                loadOptions={loadOptions}
                value={selectedOptions}
                onChange={handleSelectionChange}
                isMulti
                placeholder={t.treatmentSearch}
                debounceTimeout={500}
                additional={{page: 1}}
                className={styles.treatmentSelect}
            />

            <div className={styles.treatmentList}>
                {selectedTreatments.map((treatment) => (
                    <TreatmentItem
                        key={treatment.id}
                        treatment={treatment}
                        onEdit={updateTreatmentNotes}
                        onDelete={removeTreatment}
                        language={language}
                    />
                ))}
            </div>

            <button className={styles.treatmentSave} onClick={saveTreatments}>
                {t.save}
            </button>
        </div>
    );
};

export default TreatmentsAutoComplete;
