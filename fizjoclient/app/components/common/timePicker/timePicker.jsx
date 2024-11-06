import React, { useState, useEffect } from "react";
import Select from "react-select";
import styles from "./timePicker.module.scss";

const TimePicker = ({
  step = 15,
  initialTime = "12:00",
  disabled = false,
  minTime = "00:00",
  maxTime = "23:59",
  onTimeChange,
}) => {
  const [time, setTime] = useState(initialTime);
  const [isValid, setIsValid] = useState(true);
  const [availableTimes, setAvailableTimes] = useState([]);

  const formatTime = (hours, minutes) => {
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}`;
  };

  useEffect(() => {
    const times = [];
    const [minHours, minMinutes] = minTime.split(":").map(Number);
    const [maxHours, maxMinutes] = maxTime.split(":").map(Number);

    for (let h = minHours; h <= maxHours; h++) {
      for (let m = 0; m < 60; m += step) {
        const currentTime = formatTime(h, m);
        if (
          (h === minHours && m < minMinutes) ||
          (h === maxHours && m > maxMinutes)
        ) {
          continue;
        }
        times.push({ value: currentTime, label: currentTime });
      }
    }
    setAvailableTimes(times);
  }, [step, minTime, maxTime]);

  const handleTimeChange = (selectedOption) => {
    setTime(selectedOption.value);
    if (onTimeChange) {
      onTimeChange(selectedOption.value);
    }
  };

  const handleManualTimeInput = (event) => {
    const inputValue = event.target.value;
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    setTime(inputValue);
    if (regex.test(inputValue)) {
      setIsValid(true);
      if (onTimeChange) {
        onTimeChange(inputValue);
      }
    } else {
      setIsValid(false);
    }
  };

  return (
    <Select
      value={availableTimes.find((option) => option.value === time)}
      onChange={handleTimeChange}
      options={availableTimes}
      isDisabled={disabled}
      className={styles.selectField}
    />
  );
};

export default TimePicker;
