import React, { useContext, useState } from "react";
import styles from "./appointmentStatusButtons.module.scss";
import pl from "./locales/pl.json";
import en from "./locales/en.json";
import { LanguageContext } from "@/app/contexts/lang/langContext";

const locales = { en, pl };
const AppointmentStatusButtons = ({ getAppointments }) => {
  const { language } = useContext(LanguageContext);
  const t = locales[language];
  const [selectedStatus, setSelectedStatus] = useState(null);
  const statuses = [
    { key: "Scheduled", label: t.Scheduled },
    { key: "Completed", label: t.Completed },
    { key: "Canceled", label: t.Canceled },
    { key: "NoShow", label: t.NoShow },
    { key: "Archived", label: t.Archived },
  ];
  const handleStatusClick = async (status) => {
    setSelectedStatus(status);
    await getAppointments(status);
  };

  return (
    <div className={styles.statusButtonContainer}>
      {statuses.map((status) => (
        <button
          key={status.key}
          className={`${styles.statusButton} ${
            selectedStatus === status.key ? styles.selected : ""
          }`}
          onClick={() => handleStatusClick(status.key)}
        >
          {status.label}
        </button>
      ))}
    </div>
  );
};

export default AppointmentStatusButtons;
