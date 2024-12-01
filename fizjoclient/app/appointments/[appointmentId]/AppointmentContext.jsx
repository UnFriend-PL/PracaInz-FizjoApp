import { AuthContext } from "@/app/contexts/auth/authContext";
import { LanguageContext } from "@/app/contexts/lang/langContext";
import { useParams } from "next/navigation";
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import pl from "./locales/pl.json";
import en from "./locales/en.json";
import apiService from "@/app/services/apiService/apiService";
import mapData from "../utils/mapData";
const locales = { en, pl };

export const AppointmentContext = createContext();

export const AppointmentProvider = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const { language } = useContext(LanguageContext);
  const { appointmentId } = useParams();
  const t = locales[language];
  const [selectedItems, setSelectedItems] = useState([]);
  const [appointment, setAppointment] = useState(null);
  const [selectedParts, setSelectedParts] = useState({
    front: [],
    back: [],
  });
  const [viewPosition, setViewPosition] = useState("front");
  const [musclesAndJoints, setMusclesAndJoints] = useState([]);
  const [loadedMusclesAndJoints, setLoadedMusclesAndJoints] = useState([]);
  const [readOnly, setReadOnly] = useState(false);

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

  // Fetch appointment details
  const fetchAppointmentDetails = async () => {
    try {
      const response = await apiService.get(
        `/Appointments/${appointmentId}`,
        {},
        true
      );
      setAppointment(response.data);
      setReadOnly(
        response.data.appointmentStatusName !== "Scheduled" &&
          response.data.appointmentStatusName !== "Completed"
      );
    } catch (error) {
      console.error("Failed to fetch appointment details:", error);
    }
  };

  // Fetch saved muscles and joints
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

        const { bodyPartMusclesAndJoints, selectedMuscles, selectedJoints } =
          element;
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

  // useEffect to fetch data when component mounts or appointmentId changes
  useEffect(() => {
    if (isAuthenticated) {
      fetchAppointmentDetails();
      fetchSavedMusclesAndJoints();
    }
  }, [isAuthenticated, appointmentId, fetchSavedMusclesAndJoints]);

  //
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
        // Remove the body part if it's already selected
        updated[viewPosition] = parts.filter(
          (part) => part.slug !== bodyPart.slug
        );
      } else {
        // Add the new body part to selectedParts
        updated[viewPosition] = [...parts, bodyPart];
      }
      return updated;
    });
  };

  const removeBodyPartData = (bodyPart) => {
    // Remove the body part from musclesAndJoints if it's deselected
    setMusclesAndJoints((prev) =>
      prev.filter((part) => part.name !== bodyPart.slug)
    );

    // Also remove related muscles and joints from loadedMusclesAndJoints
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
      gender: appointment.patient.gender,
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
    [
      readOnly,
      selectedParts,
      setLoadedMusclesAndJoints,
      setMusclesAndJoints,
      setSelectedParts,
      viewPosition,
    ]
  );

  return (
    <AppointmentContext.Provider
      value={{
        appointment,
        appointmentId,
        fetchAppointmentDetails,
        selectedParts,
        setSelectedParts,
        viewPosition,
        setViewPosition,
        musclesAndJoints,
        loadedMusclesAndJoints,
        readOnly,
        t,
        handleBodyPartPress,
        selectedItems,
        setSelectedItems,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};
