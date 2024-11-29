import { useState, useEffect, useCallback, useContext } from "react";
import apiService from "@/app/services/apiService/apiService";
import { UserContext } from "@/app/contexts/user/userContext";

const useTreatments = (appointmentId, language, gender, selectedItems) => {
    const { user } = useContext(UserContext);
    const [selectedTreatments, setSelectedTreatments] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [isSaving, setIsSaving] = useState(false);
    const [includeSelectedBodyParts, setIncludeSelectedBodyParts] = useState(true);

    const handleChangeIncludeSelectedBodyParts = () => {
        setIncludeSelectedBodyParts((prev) => !prev);
    };

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
            bodyParts: !includeSelectedBodyParts
                ? selectedItems.map((item) => item.sectionName)
                : [],
            gender,
        }),
        [user?.id, includeSelectedBodyParts, selectedItems, gender]
    );

    const loadOptions = useCallback(
        async (inputValue, _, { page }) => {
            const payload = preparePayload(inputValue, page);
            const treatments = await fetchTreatments(payload);
            const options = treatments.map((treatment) => ({
                value: treatment.id,
                label:
                    language === "en"
                        ? `${treatment.name} (${treatment.bodySectionName}, ${treatment.viewName}, ${treatment.bodySide}) [${treatment.duration}]`
                        : `${treatment.namePL} (${treatment.bodySectionNamePL}, ${treatment.viewNamePL}, ${treatment.bodySidePL}) [${treatment.duration}]`,
            }));

            return {
                options,
                hasMore: treatments.length === 50,
                additional: { page: page + 1 },
            };
        },
        [fetchTreatments, preparePayload, language, includeSelectedBodyParts]
    );

    const fetchSavedTreatments = useCallback(async () => {
        if (!appointmentId) return;
        try {
            const response = await apiService.get(`/Treatments/${appointmentId}`, {}, true);
            if (response.success) {
                const uniqueTreatments = response.data.treatments.map((item) => ({
                    ...item.treatment,
                    notes: item.notes,
                    duration: item.duration,
                }));
                setSelectedTreatments(uniqueTreatments);
                setSelectedOptions(
                    uniqueTreatments.map((treatment) => ({
                        value: treatment.id,
                        label:
                            language === "en"
                                ? `${treatment.name} (${treatment.bodySectionName}, ${treatment.viewName}, ${treatment.bodySide}) [${treatment.duration}]`
                                : `${treatment.namePL} (${treatment.bodySectionNamePL}, ${treatment.viewNamePL}, ${treatment.bodySidePL}) [${treatment.duration}]`,
                    }))
                );
            }
        } catch (error) {
            console.error("Failed to fetch saved treatments:", error);
        }
    }, [appointmentId, language]);

    useEffect(() => {
        fetchSavedTreatments();
    }, [fetchSavedTreatments]);

    const handleSelectionChange = (options) => {
        setSelectedOptions(options || []);
        if (options && options.length > selectedOptions.length) {
            const newOption = options[options.length - 1];
            fetchTreatmentDetail(newOption.value);
        }
    };

    const fetchTreatmentDetail = async (id) => {
        try {
            const response = await apiService.post("/Treatments/Treatment", { id, gender }, true);
            if (response.success) {
                setSelectedTreatments((prev) =>
                    prev.some((treatment) => treatment.id === id)
                        ? prev
                        : [...prev, { ...response.data, notes: "" }]
                );
            }
        } catch (error) {
            console.error("Failed to fetch treatment details:", error);
        }
    };

    const updateTreatment = (id, updatedFields) => {
        setSelectedTreatments((prev) =>
            prev.map((treatment) =>
                treatment.id === id ? { ...treatment, ...updatedFields } : treatment
            )
        );
    };

    const removeTreatment = (id) => {
        setSelectedTreatments((prev) => prev.filter((treatment) => treatment.id !== id));
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
            setIsSaving(true);
            await apiService.post("/Treatments/Save", payload, true);
        } catch (error) {
            console.error("Failed to save treatments:", error);
        } finally {
            setIsSaving(false);
        }
    };

    return {
        selectedTreatments,
        selectedOptions,
        loadOptions,
        handleSelectionChange,
        updateTreatment,
        removeTreatment,
        saveTreatments,
        handleChangeIncludeSelectedBodyParts,
        includeSelectedBodyParts,
        isSaving,
    };
};

export default useTreatments;