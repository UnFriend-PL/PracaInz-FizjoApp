import { useState, useEffect, useCallback } from "react";
import apiService from "@/app/services/apiService/apiService";
import mapData from "../utils/mapData";
import createBodyDetails from "@/app/appointments/utils/createBodyDetails";

const useBodyParts = (appointmentId, gender, language, readOnly) => {
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedParts, setSelectedParts] = useState({
        front: [],
        back: [],
    });
    const [viewPosition, setViewPosition] = useState("front");
    const [musclesAndJoints, setMusclesAndJoints] = useState([]);
    const [loadedMusclesAndJoints, setLoadedMusclesAndJoints] = useState([]);
    const [isSaving, setIsSaving] = useState(false);

    const fetchSavedMusclesAndJoints = useCallback(async () => {
        try {
            const response = await apiService.post(
                `/Appointments/${appointmentId}/LoadSelectedBodyDetails`,
                null,
                true
            );

            const uniqueMusclesAndJoints = new Set();
            const updatedSelectedParts = { front: [], back: [] };
            const loadedMusclesAndJointsArray = [];

            response.data.forEach((element) => {
                uniqueMusclesAndJoints.add(element.bodyPartMusclesAndJoints);

                const viewKey =
                    element.bodyPartMusclesAndJoints.viewId === 1 ||
                    element.bodyPartMusclesAndJoints.viewId === 3
                        ? "front"
                        : "back";

                updatedSelectedParts[viewKey].push({
                    slug: element.bodyPartMusclesAndJoints.name,
                    slugPL: element.bodyPartMusclesAndJoints.namePL,
                });

                const { bodyPartMusclesAndJoints, selectedMuscles, selectedJoints } = element;
                const { viewId, bodySectionId } = bodyPartMusclesAndJoints;

                selectedMuscles.forEach((muscle) => {
                    loadedMusclesAndJointsArray.push({
                        muscleId: muscle.id,
                        viewId: viewId,
                        bodySectionId: bodySectionId,
                    });
                });

                selectedJoints.forEach((joint) => {
                    loadedMusclesAndJointsArray.push({
                        jointId: joint.id,
                        viewId: viewId,
                        bodySectionId: bodySectionId,
                    });
                });
            });

            setMusclesAndJoints(Array.from(uniqueMusclesAndJoints));
            setSelectedParts(updatedSelectedParts);
            setLoadedMusclesAndJoints(loadedMusclesAndJointsArray);
        } catch (error) {
            console.error("Failed to fetch saved muscles and joints:", error);
        }
    }, [appointmentId]);

    useEffect(() => {
        if (appointmentId) {
            fetchSavedMusclesAndJoints();
        }
    }, [appointmentId, fetchSavedMusclesAndJoints]);

    useEffect(() => {
        if (musclesAndJoints.length > 0 && loadedMusclesAndJoints.length > 0) {
            initializeSelectedItems();
        }
    }, [musclesAndJoints, loadedMusclesAndJoints, language]);

    const initializeSelectedItems = () => {
        const mappedData = mapData(musclesAndJoints, language);

        const initialSelectedItems = mappedData
            .map((section) => {
                const initialSelectedMuscles = section.muscles.filter((muscle) =>
                    loadedMusclesAndJoints.some(
                        (item) =>
                            item.muscleId === muscle.muscleId && item.viewId === muscle.viewId
                    )
                );

                const initialSelectedJoints = section.joints.filter((joint) =>
                    loadedMusclesAndJoints.some(
                        (item) =>
                            item.jointId === joint.jointId && item.viewId === joint.viewId
                    )
                );

                return {
                    ...section,
                    muscles: initialSelectedMuscles,
                    joints: initialSelectedJoints,
                };
            })
            .filter((section) => section.muscles.length || section.joints.length);

        setSelectedItems(initialSelectedItems);
    };

    const isBodyPartSelected = (bodyPart) => {
        return selectedParts[viewPosition].some(
            (part) => part.slug === bodyPart.slug
        );
    };

    const updateSelectedParts = (bodyPart, isSelected) => {
        setSelectedParts((prev) => {
            const updated = { ...prev };
            const parts = prev[viewPosition];

            if (isSelected) {
                updated[viewPosition] = parts.filter(
                    (part) => part.slug !== bodyPart.slug
                );
            } else {
                updated[viewPosition] = [...parts, bodyPart];
            }
            return updated;
        });
    };

    const removeBodyPartData = (bodyPart) => {
        setMusclesAndJoints((prev) =>
            prev.filter((part) => part.name !== bodyPart.slug)
        );

        setLoadedMusclesAndJoints((prev) =>
            prev.filter(
                (item) =>
                    item.bodySectionId !== bodyPart.bodySectionId ||
                    item.viewId !== bodyPart.viewId
            )
        );
    };

    const fetchBodyPartDetails = async (bodyPart) => {
        const [viewSide, bodySectionName] = bodyPart.slug.includes("-")
            ? bodyPart.slug.split(/-(.+)/)
            : [null, bodyPart.slug];

        const requestBody = {
            bodySectionName,
            viewPosition,
            viewSide,
            gender: gender,
        };

        const response = await apiService.post(
            `/BodyVisualizer/GetBodyPartDetails`,
            requestBody,
            true
        );

        if (!response.success) throw new Error(response.message);

        return response.data;
    };

    const updateMusclesAndJoints = (bodyPartData) => {
        setMusclesAndJoints((prev) => {
            const updatedMusclesAndJoints = [...prev, bodyPartData];
            const uniqueMusclesAndJoints = Array.from(
                new Map(
                    updatedMusclesAndJoints.map((item) => [item.name, item])
                ).values()
            );
            return uniqueMusclesAndJoints;
        });
    };

    const handleBodyPartPress = useCallback(
        async (bodyPart) => {
            if (readOnly) return;

            const isSelected = isBodyPartSelected(bodyPart);

            updateSelectedParts(bodyPart, isSelected);

            if (isSelected) {
                removeBodyPartData(bodyPart);
                return;
            }

            try {
                const bodyPartData = await fetchBodyPartDetails(bodyPart);
                updateMusclesAndJoints(bodyPartData);
            } catch (error) {
                console.error("Failed to fetch muscles and joints details:", error);
            }
        },
        [readOnly, fetchBodyPartDetails, updateSelectedParts, removeBodyPartData]
    );
     const [currentIndex, setCurrentIndex] = useState(0);

        const handleNavigation = useCallback(
            (direction) => {
                if (musclesAndJoints.length === 0) return;

                setCurrentIndex((prevIndex) => {
                    return direction === "prev"
                        ? (prevIndex - 1 + musclesAndJoints.length) % musclesAndJoints.length
                        : (prevIndex + 1) % musclesAndJoints.length;
                });
            },
            [musclesAndJoints]
        );


    return {
        currentIndex,
        setCurrentIndex,
        handleNavigation,
        selectedItems,
        setSelectedItems,
        selectedParts,
        setSelectedParts,
        viewPosition,
        setViewPosition,
        musclesAndJoints,
        loadedMusclesAndJoints,
        handleBodyPartPress,
        isBodyPartSelected,
        isSaving,
        saveBodyDetails: async () => {
            setIsSaving(true);
            const bodyDetailsPayload = createBodyDetails(selectedItems);
            try {
                const response = await apiService.post(
                    `/appointments/${appointmentId}/SaveBodyDetails`,
                    bodyDetailsPayload,
                    true
                );
                if (!response.success) throw new Error("Network response was not ok");
            } catch (error) {
                console.error("Save failed:", error);
            } finally {
                setIsSaving(false);
            }
        },
    };
};


export default useBodyParts;