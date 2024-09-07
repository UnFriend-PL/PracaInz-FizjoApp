import React, { useState } from "react";
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
import styles from "./calendar.module.scss";

const Calendar = ({ onDateSelect }) => {
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
          Prev
        </button>
        <h2 className={styles.currentMonth}>
          {format(currentMonth, "MMMM yyyy")}
        </h2>
        <button
          className={styles.navButton}
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
        >
          Next
        </button>
      </div>
    );
  };

  const renderDays = () => {
    const days = [];
    const dateFormat = "EEEE";
    const startDate = startOfWeek(currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className={styles.day} key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className={`${styles.days} ${styles.row}`}>{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

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
