import styles from "./appointmentDetails.module.scss";

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

  return (
    <div className={styles.appointmentCard}>
      <div className={styles.header}>
        <span className={styles.status}>Status: {appointmentStatusName}</span>
      </div>
      <div className={styles.details}>
        <DetailGroup label="Patient" value={`${firstName} ${lastName}`} />
        <DetailGroup label="Email" value={email} />
        <DetailGroup label="Phone" value={phoneNumber} />
        <DetailGroup
          label="Address"
          value={`${streetWithHouseNumber}, ${postCode} ${city}, ${country}`}
        />
        <DetailGroup
          label="DOB"
          value={new Date(dateOfBirth).toLocaleDateString()}
        />
        <DetailGroup label="Insurance" value={healthInsuranceNumber} />
        <DetailGroup
          label="Physiotherapist"
          value={`${physioFirstName} ${physioLastName}`}
        />
        <DetailGroup label="Email" value={physioEmail} />
        <DetailGroup label="Phone" value={physioPhoneNumber} />
        <DetailGroup label="License Number" value={licenseNumber} />
        <DetailGroup
          label="Date"
          value={new Date(appointmentDate).toLocaleString()}
        />
        <DetailGroup
          label="Description"
          value={appointmentDescription || "No description provided"}
        />
        <DetailGroup label="Notes" value={notes || "No notes provided"} />
        <DetailGroup
          label="Diagnosis"
          value={diagnosis || "No diagnosis provided"}
        />
        <DetailGroup label="Paid" value={isPaid ? "Yes" : "No"} />
      </div>
    </div>
  );
};

const DetailGroup = ({ label, value }) => (
  <div className={styles.detailGroup}>
    <span className={styles.label}>{label}:</span>
    <span className={styles.value}>{value}</span>
  </div>
);

export default AppointmentDetails;
