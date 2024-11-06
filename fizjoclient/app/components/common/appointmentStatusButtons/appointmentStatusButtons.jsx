import React, { useContext, useState } from "react";
import styles from "./appointmentStatusButtons.module.scss";
import pl from "./locales/pl.json";
import en from "./locales/en.json";
import { LanguageContext } from "@/app/contexts/lang/langContext";

const locales = { en, pl };
const AppointmentStatusButtons = ({
  getAppointments,
  onStatusChange,
  defaultStatus,
}) => {
  const { language } = useContext(LanguageContext);
  const t = locales[language];
  const [selectedStatus, setSelectedStatus] = useState(defaultStatus);
  const statuses = [
    { key: "Scheduled", label: t.Scheduled, value: 0 },
    { key: "Completed", label: t.Completed, value: 1 },
    { key: "Canceled", label: t.Canceled, value: 2 },
    { key: "NoShow", label: t.NoShow, value: 3 },
    { key: "Archived", label: t.Archived, value: 4 },
  ];
  const handleStatusClick = async (status) => {
    setSelectedStatus(status);
    if (onStatusChange) {
      onStatusChange(status);
    } else await getAppointments(status);
  };

  return (
    <div className={styles.statusButtonContainer}>
      {statuses.map((status) => (
        <button
          key={status.key}
          className={`${styles.statusButton} ${
            selectedStatus === status.value ? styles.selected : ""
          }`}
          onClick={() => handleStatusClick(status.value)}
        >
          {status.label}
        </button>
      ))}
    </div>
  );
};

export default AppointmentStatusButtons;
