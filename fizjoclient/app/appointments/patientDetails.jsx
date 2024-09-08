import React, { useContext } from "react";
import DetailElement from "../components/common/detailElement/detailElement";
import { LanguageContext } from "@/app/contexts/lang/langContext";
import pl from "./locales/pl.json";
import en from "./locales/en.json";

const locales = { en, pl };

const PatientDeails = ({ patient }) => {
  const { language } = useContext(LanguageContext);
  const t = locales[language];

  return (
    <>
      <DetailElement label={t.firstName} value={patient.firstName} />
      <DetailElement label={t.lastName} value={patient.lastName} />
      <DetailElement label={t.email} value={patient.email} />
      <DetailElement label={t.phone} value={patient.phoneNumber} />
      <DetailElement label={t.pesel} value={patient.pesel} />
      <DetailElement
        label={t.address}
        value={`${patient.streetWithHouseNumber}, ${patient.postCode} ${patient.city}, ${patient.country}`}
      />
      <DetailElement
        label={t.dob}
        value={new Date(patient.dateOfBirth).toLocaleDateString()}
      />
      <DetailElement
        label={t.insurance}
        value={patient.healthInsuranceNumber}
      />
    </>
  );
};

export default PatientDeails;
