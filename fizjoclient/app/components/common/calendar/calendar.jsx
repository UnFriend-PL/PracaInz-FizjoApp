import React, { useState, useContext } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
} from "date-fns";
import { pl as plDate, enUS } from "date-fns/locale";
import styles from "./calendar.module.scss";
import { LanguageContext } from "@/app/contexts/lang/langContext";
import pl from "./locales/pl.json";
import en from "./locales/en.json";

const locales = { en, pl };

const Calendar = ({ onDateSelect }) => {
  const { language } = useContext(LanguageContext);
  const t = locales[language];
  const locale = language === "pl" ? plDate : enUS;
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const today = new Date();

  const onDateClick = (day) => {
    setSelectedDate(day);
    if (onDateSelect) {
      onDateSelect(day);
    }
  };

  const renderHeader = () => {
    return (
      <div className={styles.header}>
        <button
          className={styles.navButton}
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
        >
          {t.prev}
        </button>
        <h2 className={styles.currentMonth}>
          {format(currentMonth, "MMMM yyyy", { locale })}
        </h2>
        <button
          className={styles.navButton}
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
        >
          {t.next}
        </button>
      </div>
    );
  };

  const renderDays = () => {
    const days = [];
    const dateFormat = "EEEE";
    const startDate = startOfWeek(currentMonth, { locale });

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className={styles.day} key={i}>
          {format(addDays(startDate, i), dateFormat, { locale })}
        </div>
      );
    }

    return <div className={`${styles.days} ${styles.row}`}>{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { locale });
    const endDate = endOfWeek(monthEnd, { locale });

    const dateFormat = "d";
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;

        days.push(
          <div
            className={`${styles.cell} ${
              !isSameMonth(day, monthStart)
                ? styles.disabled
                : isSameDay(day, today)
                ? styles.today
                : isSameDay(day, selectedDate)
                ? styles.selected
                : ""
            }`}
            key={day}
            onClick={() => onDateClick(cloneDay)}
          >
            <span className={styles.number}>{formattedDate}</span>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className={styles.row} key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className={styles.body}>{rows}</div>;
  };

  return (
    <div className={styles.calendar}>
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  );
};

export default Calendar;
