import { useState } from "react";
import styles from "./appointmentDetails.module.scss";
import Modal from "@/app/components/common/modal/modal";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import DetailElement from "@/app/components/common/detailElement/detailElement";
import PatientDeails from "../patientDetails";

const AppointmentDetails = ({ appointment }) => {
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
          locale: pl,
        })}
      </span>
      <div className={styles.header}>
        <span className={styles.status}>
          Appointment: {appointmentStatusName}
        </span>
      </div>
      <div className={styles.details}>
        <div className={styles.detailsGroup}>
          <div className={styles.detailGroupName}>Patient: </div>
          <div className={styles.header}>
            {firstName} {lastName}
          </div>
          <Modal
            isOpen={isPatientModalOpen}
            onClose={closePatientModal}
            size={"medium"}
            header={"Patient Details"}
          >
            <>
              <PatientDeails patient={appointment.patient} />
            </>
          </Modal>
          <button
            className={styles.detailGroupButton}
            onClick={openPatientModal}
          >
            Show details
          </button>
          <div className={styles.detailsGroupInfo}></div>
        </div>
        <div className={styles.detailsGroup}>
          <div className={styles.detailGroupName}>Physiotherapist: </div>
          <div className={styles.header}>
            {physioFirstName} {physioLastName}
          </div>

          <button
            className={styles.detailGroupButton}
            onClick={openPhysiotherapistModal}
          >
            Show details
          </button>
          <div className={styles.detailsGroupInfo}></div>
        </div>
        <Modal
          isOpen={isPhysiotherpistModalOpen}
          onClose={closePhysiotherapistModal}
          size={"medium"}
          header={"Physiotherapist Details"}
        >
          <DetailElement label="First Name" value={physioFirstName} />
          <DetailElement label="Last Name" value={physioLastName} />
          <DetailElement label="License Number" value={licenseNumber} />
        </Modal>
      </div>
      <div className={styles.detailsGroup}>
        <DetailElement
          label="Diagnosis"
          value={diagnosis || "No diagnosis provided"}
        />
        <DetailElement label="Notes" value={notes || "No notes provided"} />
      </div>
      <div className={styles.detailsGroup}>
        <DetailElement
          label="Description"
          value={appointmentDescription || "No description provided"}
        />
        <DetailElement label="Paid" value={isPaid ? "Yes" : "No"} />
      </div>
    </div>
  );
};

export default AppointmentDetails;
