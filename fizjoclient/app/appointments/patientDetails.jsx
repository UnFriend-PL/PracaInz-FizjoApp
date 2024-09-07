import DetailElement from "../components/common/detailElement/detailElement";

const PatientDeails = ({ patient }) => {
  return (
    <>
      <DetailElement label="First Name" value={patient.firstName} />
      <DetailElement label="Last Name" value={patient.lastName} />
      <DetailElement label="Email" value={patient.email} />
      <DetailElement label="Phone" value={patient.phoneNumber} />
      <DetailElement label="Pesel" value={patient.pesel} />
      <DetailElement
        label="Address"
        value={`${patient.streetWithHouseNumber}, ${patient.postCode} ${patient.city}, ${patient.country}`}
      />
      <DetailElement
        label="DOB"
        value={new Date(patient.dateOfBirth).toLocaleDateString()}
      />
      <DetailElement label="Insurance" value={patient.healthInsuranceNumber} />
    </>
  );
};

export default PatientDeails;
