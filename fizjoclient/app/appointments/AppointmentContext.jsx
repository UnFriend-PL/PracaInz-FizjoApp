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
import pl from "./[appointmentId]/locales/pl.json";
import en from "./[appointmentId]/locales/en.json";
import apiService from "@/app/services/apiService/apiService";
import mapData from "./utils/mapData";
import { format } from "date-fns";
import useSelectedItems from "./utils/useSelectedItems";
import createBodyDetails from "./utils/createBodyDetails";
import {UserContext} from "@/app/contexts/user/userContext";
const locales = { en, pl };

export const AppointmentContext = createContext();

export const AppointmentProvider = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const { language } = useContext(LanguageContext);
  const { appointmentId } = useParams();
  const t = locales[language];
  const [selectedItems, setSelectedItems] = useState([]);
  const [appointment, setAppointment] = useState(null);
  const [gender, setGender] = useState(null);
  const [selectedParts, setSelectedParts] = useState({
    front: [],
    back: [],
  });
  const [viewPosition, setViewPosition] = useState("front");
  const [musclesAndJoints, setMusclesAndJoints] = useState([]);
  const [loadedMusclesAndJoints, setLoadedMusclesAndJoints] = useState([]);
  const [readOnly, setReadOnly] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isPatientModalOpen, setPatientModalOpen] = useState(false);
  const [isPhysioModalOpen, setPhysioModalOpen] = useState(false);
  const [selectedNewStatus, setSelectedNewStatus] = useState(null);
  const [appointmentsDetailsFormData, setAppointmentsDetailsFormData] =
    useState({});
  const [selectedNewHour, setSelectedNewHour] = useState("");
  const [isAppointmentStatusEditing, setIsAppointmentStatusEditing] =
    useState(false);

  useEffect(() => {
    if (appointment) {
      setAppointmentsDetailsFormData({
        appointmentDescription: appointment.appointmentDescription || "",
        notes: appointment.notes || "",
        diagnosis: appointment.diagnosis || "",
        isPaid: appointment.isPaid || false,
        appointmentDate: new Date(appointment.appointmentDate),
        status: appointment.appointmentStatus,
      });
      setSelectedNewHour(
        format(new Date(appointment.appointmentDate), "HH:mm")
      );
      setSelectedNewStatus(appointment.appointmentStatus);
    }
  }, [appointment]);

  // Funkcje przeniesione z AppointmentDetails
  const handleInputChange = (e, date) => {
    if (date) {
      const [hour, minute] = selectedNewHour.split(":").map(Number);
      const newAppointmentDate = new Date(date);
      newAppointmentDate.setHours(hour);
      newAppointmentDate.setMinutes(minute);
      setAppointmentsDetailsFormData({
        ...appointmentsDetailsFormData,
        appointmentDate: newAppointmentDate,
      });
    } else {
      const { name, value, type, checked } = e.target;
      setAppointmentsDetailsFormData({
        ...appointmentsDetailsFormData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleStatusChange = (newStatus) => {
    setSelectedNewStatus(newStatus);
    setAppointmentsDetailsFormData((prevFormData) => ({
      ...prevFormData,
      status: newStatus,
    }));
  };

  const handleFormSubmit = async () => {
    try {
      setIsSaving(true);
      const response = await apiService.put(
        `/Appointments/${appointmentId}/Edit`,
        appointmentsDetailsFormData,
        true
      );
      if (response.success) {
        await fetchAppointmentDetails();
      }
    } catch (error) {
      console.error("Failed to save appointment details:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleStatusEdit = () => {
    setIsAppointmentStatusEditing((prev) => !prev);
  };

  // ----------------- Stan przeniesiony z AppointmentDetails

  // AppointmentContext.jsx
  const saveBodyDetails = async () => {
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
  };

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
    [musclesAndJoints.length]
  );

  // ----------------- Stan przeniesiony z BodyPartSelector

  const saveAll = async () => {
    setIsSaving((prev) => !prev);
  };

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

  const fetchAppointmentDetails = async () => {
    try {
      const response = await apiService.get(
        `/Appointments/${appointmentId}`,
        {},
        true
      );
      setAppointment(response.data);
      setGender(response.data.patient.gender);
      setReadOnly(
        response.data.appointmentStatusName !== "Scheduled" &&
          response.data.appointmentStatusName !== "Completed"
      );
    } catch (error) {
      console.error("Failed to fetch appointment details:", error);
    }
  };

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

  // ----------------- Treatments

    const [selectedTreatments, setSelectedTreatments] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [includeSelectedBodyParts, setIncludeSelectedBodyParts] =
        useState(true);
    const { user } = useContext(UserContext);
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
                label: language === "en" ? `${treatment.name} (${treatment.bodySectionName}, ${treatment.viewName}, ${treatment.bodySide}) [${treatment.duration}]`
                    : `${treatment.namePL} (${treatment.bodySectionNamePL}, ${treatment.viewNamePL}, ${treatment.bodySidePL}) [${treatment.duration}]`
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
                        duration: item.duration,
                    }));
                    setSelectedTreatments(uniqueTreatments);
                    setSelectedOptions(
                        uniqueTreatments.map((treatment) => ({
                            value: treatment.id,
                            label: language === "en" ? `${treatment.name} (${treatment.bodySectionName}, ${treatment.viewName}, ${treatment.bodySide}) [${treatment.duration}]`
                                : `${treatment.namePL} (${treatment.bodySectionNamePL}, ${treatment.viewNamePL}, ${treatment.bodySidePL}) [${treatment.duration}]`
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

    const updateTreatment = (id, updatedFields) => {
        setSelectedTreatments((prev) =>
            prev.map((treatment) =>
                treatment.id === id ? { ...treatment, ...updatedFields } : treatment
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
    <AppointmentContext.Provider
      value={{
        removeTreatment,
          selectedTreatments,
        loadOptions,
        updateTreatment,
        handleSelectionChange,
        saveTreatments,
        handleChangeIncludeSelectedBodyParts,
        appointment,
        appointmentId,
        fetchAppointmentDetails,
        selectedParts,
        setSelectedParts,
        viewPosition,
        setViewPosition,
        loadedMusclesAndJoints,
        readOnly,
        handleBodyPartPress,
        setSelectedItems,
        gender,
        language,
        saveAll,
        isPatientModalOpen,
        setPatientModalOpen,
        isPhysioModalOpen,
        setPhysioModalOpen,
        selectedNewStatus,
        setSelectedNewStatus,
        appointmentsDetailsFormData,
        setAppointmentsDetailsFormData,
        selectedNewHour,
        setSelectedNewHour,
        isAppointmentStatusEditing,
        setIsAppointmentStatusEditing,
        handleInputChange,
        handleStatusChange,
        handleFormSubmit,
        handleStatusEdit,
        currentIndex,
        setCurrentIndex,
        isSaving,
        saveBodyDetails,
        handleNavigation,
        t,
        musclesAndJoints,
        selectedItems,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};
