import { useState, useContext } from "react";
import styles from "./appointmentDetails.module.scss";
import Modal from "@/app/components/common/modal/modal";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import DetailElement from "@/app/components/common/detailElement/detailElement";
import PatientDeails from "../patientDetails";
import { LanguageContext } from "@/app/contexts/lang/langContext";
import polish from "./locales/pl.json";
import english from "./locales/en.json";

const locales = { english, polish };

const AppointmentDetails = ({ appointment }) => {
  const { language } = useContext(LanguageContext);
  const t = locales[language];
  const {
    appointmentStatusName,
    patient: {
      firstName,
      lastName,
      email,
      phoneNumber,
      streetWithHouseNumber,
      postCode,
      city,
      country,
      dateOfBirth,
      healthInsuranceNumber,
    },
    physiotherapist: {
      firstName: physioFirstName,
      lastName: physioLastName,
      email: physioEmail,
      phoneNumber: physioPhoneNumber,
      licenseNumber,
    },
    appointmentDate,
    appointmentDescription,
    notes,
    diagnosis,
    isPaid,
  } = appointment;

  const [isPatientModalOpen, setPatientModalOpen] = useState(false);
  const [isPhysiotherpistModalOpen, setPhysiotherapistModalOpen] =
    useState(false);
  const openPatientModal = () => setPatientModalOpen(true);
  const closePatientModal = () => setPatientModalOpen(false);
  const openPhysiotherapistModal = () => setPhysiotherapistModalOpen(true);
  const closePhysiotherapistModal = () => setPhysiotherapistModalOpen(false);

  return (
    <div className={styles.appointmentCard}>
      <span className={styles.appointmentDate}>
        {format(new Date(appointmentDate), "dd.MM.yyyy HH:mm", {
          locale: language === "pl" ? pl : undefined,
        })}
      </span>
      <div className={styles.header}>
        <span className={styles.status}>
          {t.appointment}: {appointmentStatusName}
        </span>
      </div>
      <div className={styles.details}>
        <div className={styles.detailsGroup}>
          <div className={styles.detailGroupName}>{t.patient}: </div>
          <div className={styles.header}>
            {firstName} {lastName}
          </div>
          <Modal
            isOpen={isPatientModalOpen}
            onClose={closePatientModal}
            size={"medium"}
            header={t.patientDetails}
          >
            <>
              <PatientDeails patient={appointment.patient} />
            </>
          </Modal>
          <button
            className={styles.detailGroupButton}
            onClick={openPatientModal}
          >
            {t.showDetails}
          </button>
          <div className={styles.detailsGroupInfo}></div>
        </div>
        <div className={styles.detailsGroup}>
          <div className={styles.detailGroupName}>{t.physiotherapist}: </div>
          <div className={styles.header}>
            {physioFirstName} {physioLastName}
          </div>

          <button
            className={styles.detailGroupButton}
            onClick={openPhysiotherapistModal}
          >
            {t.showDetails}
          </button>
          <div className={styles.detailsGroupInfo}></div>
        </div>
        <Modal
          isOpen={isPhysiotherpistModalOpen}
          onClose={closePhysiotherapistModal}
          size={"medium"}
          header={t.physiotherapistDetails}
        >
          <DetailElement label={t.firstName} value={physioFirstName} />
          <DetailElement label={t.lastName} value={physioLastName} />
          <DetailElement label={t.licenseNumber} value={licenseNumber} />
        </Modal>
      </div>
      <div className={styles.detailsGroup}>
        <DetailElement
          label={t.diagnosis}
          value={diagnosis || t.noDiagnosisProvided}
        />
        <DetailElement label={t.notes} value={notes || t.noNotesProvided} />
      </div>
      <div className={styles.detailsGroup}>
        <DetailElement
          label={t.description}
          value={appointmentDescription || t.noDescriptionProvided}
        />
        <DetailElement label={t.paid} value={isPaid ? t.yes : t.no} />
      </div>
    </div>
  );
};

export default AppointmentDetails;
