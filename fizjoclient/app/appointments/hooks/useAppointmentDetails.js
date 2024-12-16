import {useState, useEffect, useCallback, useContext} from "react";
import apiService from "@/app/services/apiService/apiService";
import { format } from "date-fns";
import {UserContext} from "@/app/contexts/user/userContext";

const useAppointmentDetails = (appointmentId, isAuthenticated) => {
    const [appointment, setAppointment] = useState(null);
    const [gender, setGender] = useState(null);
    const [readOnly, setReadOnly] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [appointmentsDetailsFormData, setAppointmentsDetailsFormData] = useState({});
    const [selectedNewHour, setSelectedNewHour] = useState("");
    const [selectedNewStatus, setSelectedNewStatus] = useState(null);
    const [isAppointmentStatusEditing, setIsAppointmentStatusEditing] = useState(false);
    const [isPatientModalOpen, setPatientModalOpen] = useState(false);
    const [isPhysioModalOpen, setPhysioModalOpen] = useState(false);
    const { user } = useContext(UserContext);
    const [availableTimes, setAvailableTimes] = useState([]);
    const fetchAppointmentDetails = useCallback(async () => {
        try {
            const response = await apiService.get(`/Appointments/${appointmentId}`, {}, true);
            setAppointment(response.data);
            setGender(response.data.patient.gender);
            setReadOnly(
                response.data.appointmentStatusName !== "Scheduled" &&
                response.data.appointmentStatusName !== "Completed"
            );
        } catch (error) {
            console.error("Failed to fetch appointment details:", error);
        }
    }, [appointmentId]);

    useEffect(() => {
        if (isAuthenticated) {
            fetchAppointmentDetails();
        }
    }, [isAuthenticated, fetchAppointmentDetails]);

    useEffect(() => {
        if (appointment) {
            setAppointmentsDetailsFormData({
                appointmentDescription: appointment.appointmentDescription || "",
                notes: appointment.notes || "",
                diagnosis: appointment.diagnosis || "",
                isPaid: appointment.isPaid || false,
                appointmentDate: new Date(appointment.appointmentDate),
                status: appointment.appointmentStatus,
                price: appointment.price || 0,
            });
            setSelectedNewHour(format(new Date(appointment.appointmentDate), "HH:mm"));
            setSelectedNewStatus(appointment.appointmentStatus);
        }
    }, [appointment]);

    const handleInputChange = (e, date) => {
        if (date) {
            const [hour, minute] = selectedNewHour.split(":").map(Number);
            const newAppointmentDate = new Date(date);
            newAppointmentDate.setHours(hour);
            newAppointmentDate.setMinutes(minute);
            setAppointmentsDetailsFormData((prev) => ({
                ...prev,
                appointmentDate: newAppointmentDate,
            }));
            try {
                const formattedDate = format(date, "yyyy-MM-dd");

                const payload = {
                    date: formattedDate,
                    physiotherapistId: user.id
                };
                apiService.post(`/Staff/AvailableSlots`, payload, true).then((response) => {
                    if (response.success) {
                        setAvailableTimes(response.data);
                    } else {
                        console.error(response.message);
                    }
                });
            } catch (error) {
                console.error(error);
            }

        } else {
            const { name, value, type, checked } = e.target;
            setAppointmentsDetailsFormData((prev) => ({
                ...prev,
                [name]: type === "checkbox" ? checked : value,
            }));
        }
    };

    const handleStatusChange = (newStatus) => {
        setSelectedNewStatus(newStatus);
        setAppointmentsDetailsFormData((prev) => ({
            ...prev,
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
                fetchAppointmentDetails();
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

    return {
        appointment,
        gender,
        readOnly,
        isSaving,
        appointmentsDetailsFormData,
        setAppointmentsDetailsFormData,
        selectedNewHour,
        setSelectedNewHour,
        selectedNewStatus,
        setSelectedNewStatus,
        isAppointmentStatusEditing,
        setIsAppointmentStatusEditing,
        isPatientModalOpen,
        setPatientModalOpen,
        isPhysioModalOpen,
        setPhysioModalOpen,
        handleInputChange,
        handleStatusChange,
        handleFormSubmit,
        handleStatusEdit,
        fetchAppointmentDetails,
        availableTimes
    };
};

export default useAppointmentDetails;