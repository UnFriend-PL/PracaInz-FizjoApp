import React, { useCallback, useContext, useEffect, useState } from "react";
import styles from "./appointmentDetails.module.scss";
import Modal from "@/app/components/common/modal/modal";
import { format } from "date-fns";
import { pl as plDate } from "date-fns/locale";
import PatientDetails from "../../components/patientSearch/patientDetails";
import pl from "./locales/pl.json";
import en from "./locales/en.json";
import DetailField from "@/app/components/common/detailField/detailField";
import DetailGroup from "@/app/components/detailGroup/DetailGroup";
import DetailElement from "@/app/components/common/detailElement/detailElement";
import Calendar from "@/app/components/common/calendar/calendar";
import TimePicker from "@/app/components/common/timePicker/timePicker";
import AppointmentStatusButtons from "@/app/components/common/appointmentStatusButtons/appointmentStatusButtons";
import { AppointmentContext } from "@/app/appointments/appointmentContext";
import apiService from "@/app/services/apiService/apiService";

import { FaRegSave, FaRegStar, FaRegTrashAlt, FaStar } from "react-icons/fa";
import { AuthContext } from "@/app/contexts/auth/authContext";

const locales = { en, pl };

const addOpinion = async (newOpinion, physiotherapistId) => {
  try {
    const response = await apiService.post(
      `/Opinion/AddOpinion`,
      {
        physiotherapistId: physiotherapistId,
        rating: newOpinion.rating,
        comment: newOpinion.comment,
      },
      true
    );

    if (response.success) {
      console.log("Opinia została pomyślnie dodana!");
    } else {
      console.error("Nie udało się dodać opinii");
    }
  } catch (error) {
    console.error("Błąd podczas dodawania opinii:", error);
  }
};
const doesOpinionExist = async (physiotherapistId) => {
  try {
    const response = await apiService.get(
      `/Opinion/exists?physiotherapistId=${physiotherapistId}`,
      null,
      true
    );
    if (response.success) {
      return response.data;
    } else {
      console.error(
        "Nie udało się sprawdzić istnienia opinii:",
        response.errors
      );
      return false;
    }
  } catch (error) {
    console.error("Błąd podczas sprawdzania istnienia opinii:", error);
    return false;
  }
};

const OpinionChecker = ({ physiotherapistId, onOpinionCheck }) => {
  useEffect(() => {
    const checkOpinion = async () => {
      try {
        const opinion = await doesOpinionExist(physiotherapistId);
        console.log("exists:", opinion);
        onOpinionCheck(opinion);
      } catch (error) {
        console.error("Błąd podczas sprawdzania opinii:", error);
      }
    };

    if (physiotherapistId) {
      checkOpinion();
    }
  }, [physiotherapistId, onOpinionCheck]);

  return null;
};
const AppointmentDetails = () => {
  const [Opinion, setOpinion] = useState({
    rating: null,
    comment: "",
    opinionId: "",
  });
  const [newOpinion, setNewOpinion] = useState({
    rating: null,
    comment: "",
  });
  const [doesExist, setDoesExist] = useState(null);
  const handleOpinionCheck = useCallback((opinionData) => {
    console.log("Result from doesOpinionExist:", opinionData);
    setOpinion({
      rating: opinionData.rating,
      comment: opinionData.comment,
      opinionId: opinionData.opinionId,
    });
    setDoesExist(opinionData.exists);
  }, []);
  const {
    appointment,
    isPatientModalOpen,
    setPatientModalOpen,
    isPhysioModalOpen,
    setPhysioModalOpen,
    selectedNewStatus,
    appointmentsDetailsFormData,
    selectedNewHour,
    setSelectedNewHour,
    isAppointmentStatusEditing,
    setIsAppointmentStatusEditing,
    handleInputChange,
    handleStatusChange,
    handleStatusEdit,
    language,
    availableTimes,
  } = useContext(AppointmentContext);
  const { role } = useContext(AuthContext);
  const t = locales[language] || locales.en;
  const [isOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const onClose = () => setIsModalOpen(false);
  if (!appointment) {
    return <div>{t.loading}</div>;
  }
  const handleRatingChange = (rating) => {
    console.log("Selected rating:", rating);
    setNewOpinion((prev) => ({ ...prev, rating }));
  };

  const handleCommentChange = (event) => {
    setNewOpinion((prev) => ({ ...prev, comment: event.target.value }));
  };

  const handleSave = async () => {
    try {
      console.log(appointment);

      await addOpinion(newOpinion, appointment.physiotherapistId);
      const opinion = await doesOpinionExist(appointment.physiotherapistId);
      setOpinion({
        opinionId: opinion.opinionId,
        rating: opinion.rating,
        comment: opinion.comment,
      });
      setDoesExist(true);

      onClose();
    } catch (error) {
      console.error("Błąd podczas zapisywania opinii:", error);
    }
  };
  const handleDelete = async (opinionId) => {
    await onDelete(opinionId);
    setDoesExist(false);

    onClose();
  };
  const onDelete = async (opinionId) => {
    try {
      const endpoint = `/Opinion/${opinionId}`;
      const response = await apiService.delete(endpoint, null, true);

      if (response.success) {
        console.log("Opinia została pomyślnie usunięta");
      } else {
        console.error("Wystąpił błąd podczas usuwania opinii");
      }
    } catch (error) {
      console.error("Błąd połączenia:", error);
    }
  };

  const OpinionDisplay = ({ rating, comment, opinionId, onDelete }) => {
    return (
      <div className={styles.viewOpinion}>
        <div className={styles.rating}>
          <strong>{t.yourOpinion}:</strong>
          <div className={styles.stars}>
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star}>
                {star <= rating ? (
                  <FaStar className={styles.filledStar} />
                ) : (
                  <FaRegStar className={styles.emptyStar} />
                )}
              </span>
            ))}
          </div>
        </div>
        <div className={styles.commentInput}>
          <p className={styles.comment}>
            <strong></strong> {comment}
          </p>
        </div>
        <div className={styles.deleteButtonContainer}>
          <button
            className={styles.deleteButton}
            onClick={() => onDelete(opinionId)}
          >
            <FaRegTrashAlt className={styles.deleteIcon} />
          </button>
        </div>
      </div>
    );
  };

  const { appointmentStatusName, patient, physiotherapist, appointmentDate } =
    appointment;
  return (
    <div className={styles.appointmentCard}>
      <span className={styles.appointmentDate}>
        {format(new Date(appointmentDate), "dd.MM.yyyy HH:mm", {
          locale: language === "pl" ? plDate : undefined,
        })}
      </span>
      <div className={styles.header}>
        <div className={styles.status}>
          <span
            className={styles.status}
            onClick={role === "Physiotherapist" ? handleStatusEdit : undefined}
          >
            {t.appointment}: {appointmentStatusName}
          </span>
        </div>
        {appointmentStatusName === "Completed" && role === "Patient" && (
          <div className={styles.OpinionButton}>
            <OpinionChecker
              physiotherapistId={appointment.physiotherapistId}
              onOpinionCheck={handleOpinionCheck}
            />
            {doesExist === false ? (
              <button
                onClick={() => {
                  setNewOpinion({
                    rating: 0,
                    comment: "",
                  });
                  openModal();
                }}
                className={styles.addOpinionButton}
              >
                {t.addOpinion}
              </button>
            ) : (
              <button className={styles.viewOpinionButton} onClick={openModal}>
                {t.viewOpinion}
              </button>
            )}
            <Modal
              isOpen={isOpen}
              onClose={onClose}
              size="medium"
              header={doesExist ? t.viewOpinionTitle : t.addOpinionTitle}
            >
              {doesExist === true ? (
                <OpinionDisplay
                  rating={Opinion.rating}
                  comment={Opinion.comment}
                  opinionId={Opinion.opinionId}
                  onDelete={handleDelete}
                />
              ) : (
                <div className={styles.addOpinionForm}>
                  <div className={styles.rating}>
                    <span>{t.yourRating}</span>
                    <div className={styles.stars}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          onClick={() => handleRatingChange(star)}
                        >
                          {star <= newOpinion.rating ? (
                            <FaStar className={styles.filledStar} />
                          ) : (
                            <FaRegStar className={styles.emptyStar} />
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                  <textarea
                    onChange={handleCommentChange}
                    className={styles.commentInput}
                    placeholder={t.yourCommentPlaceholder}
                  />
                  <div className={styles.buttonContainer}>
                    <button
                      onClick={handleSave}
                      className={styles.saveOpinionButton}
                    >
                      <FaRegSave className={styles.saveIcon} />
                      {t.save}
                    </button>
                    <button
                      onClick={() => {
                        setNewOpinion({
                          rating: 0,
                          comment: "",
                        });

                        onClose();
                      }}
                      className={styles.cancelOpinionButton}
                    >
                      <FaRegTrashAlt className={styles.cancelIcon} />
                      {t.cancel}
                    </button>
                  </div>
                </div>
              )}
            </Modal>
          </div>
        )}

        {isAppointmentStatusEditing && (
          <Modal
            isOpen={isAppointmentStatusEditing}
            header={t.selectNewStatus}
            onClose={() => setIsAppointmentStatusEditing((prev) => !prev)}
            size="medium"
          >
            <div className={styles.statusChangeContainer}>
              <div className={styles.statusButtons}>
                <AppointmentStatusButtons
                  defaultStatus={selectedNewStatus}
                  onStatusChange={handleStatusChange}
                />
              </div>
              <TimePicker
                key={availableTimes}
                availableTimes={availableTimes}
                onTimeChange={setSelectedNewHour}
              ></TimePicker>

              <Calendar
                onDateSelect={(date) => {
                  handleInputChange(null, date);
                }}
              />
            </div>
          </Modal>
        )}
      </div>
      <div className={styles.details}>
        <DetailGroup
          title={t.patient}
          name={`${patient.firstName} ${patient.lastName}`}
          onShowDetails={() => setPatientModalOpen(true)}
          t={t}
        />
        <DetailGroup
          title={t.physiotherapist}
          name={`${physiotherapist.firstName} ${physiotherapist.lastName}`}
          onShowDetails={() => setPhysioModalOpen(true)}
          t={t}
        />
      </div>
      <Modal
        isOpen={isPatientModalOpen}
        onClose={() => setPatientModalOpen(false)}
        size="medium"
        header={t.patientDetails}
      >
        <PatientDetails patient={patient} />
      </Modal>
      <Modal
        isOpen={isPhysioModalOpen}
        onClose={() => setPhysioModalOpen(false)}
        size="medium"
        header={t.physiotherapistDetails}
      >
        <DetailElement label={t.firstName} value={physiotherapist.firstName} />
        <DetailElement label={t.lastName} value={physiotherapist.lastName} />
        <DetailElement
          label={t.licenseNumber}
          value={physiotherapist.licenseNumber}
        />
      </Modal>
      <div className={styles.editableDetails}>
        <div className={styles.detailsGroup}>
          {role === "Physiotherapist" && (
            <div className={styles.detailsGroup}>
              <DetailField
                label={t.diagnosis}
                name="diagnosis"
                value={appointmentsDetailsFormData.diagnosis}
                onChange={handleInputChange}
                type="textarea"
                t={t}
              />
              <DetailField
                label={t.notes}
                name="notes"
                value={appointmentsDetailsFormData.notes}
                onChange={handleInputChange}
                type="textarea"
                t={t}
              />
            </div>
          )}
        </div>
        <div className={styles.detailsGroup}>
          <DetailField
            label={t.description}
            name="appointmentDescription"
            value={appointmentsDetailsFormData.appointmentDescription}
            onChange={handleInputChange}
            type="textarea"
            t={t}
          />
          <DetailField
            label={t.paid}
            name="isPaid"
            value={appointmentsDetailsFormData.isPaid}
            onChange={handleInputChange}
            type="checkbox"
            t={t}
          />
          <DetailField
            label={t.price}
            name="price"
            value={appointmentsDetailsFormData.price}
            onChange={handleInputChange}
            type="text"
            t={t}
            />
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetails;
