import React, { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import styles from "./timePicker.module.scss";

const TimePicker = ({
                        step = 15,
                        initialTime = "12:00",
                        disabled = false,
                        minTime = "00:00",
                        maxTime = "23:59",
                        availableTimes = [],
                        onTimeChange,
                    }) => {
    const [time, setTime] = useState(initialTime);
    const [isCustomTime, setIsCustomTime] = useState(false);
    const [availableToSelectTimes, setAvailableToSelectTimes] = useState([]);

    const formatTime = (hours, minutes) => {
        return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
            2,
            "0"
        )}`;
    };

    function GetTimeSteps() {
        // Jeśli przekazano gotową listę dostępnych czasów
        if (availableTimes && availableTimes.length > 0) {
            return availableTimes.map((time) => {
                const date = new Date(time);
                const hours = String(date.getHours()).padStart(2, "0");
                const minutes = String(date.getMinutes()).padStart(2, "0");
                return { value: `${hours}:${minutes}`, label: `${hours}:${minutes}` };
            });
        }

        // Jeśli dostępne czasy generujemy na podstawie minTime, maxTime i step
        const times = [];
        const [minHours, minMinutes] = minTime.split(":").map(Number);
        const [maxHours, maxMinutes] = maxTime.split(":").map(Number);

        for (let h = minHours; h <= maxHours; h++) {
            for (let m = 0; m < 60; m += step) {
                if ((h === minHours && m < minMinutes) || (h === maxHours && m > maxMinutes)) {
                    continue;
                }
                const currentTime = formatTime(h, m);
                times.push({ value: currentTime, label: currentTime });
            }
        }
        return times;
    }

    useEffect(() => {
        const times = GetTimeSteps();
        setAvailableToSelectTimes(times);
    }, [step, minTime, maxTime, availableTimes]);

    const handleTimeChange = (newValue) => {
        if (!newValue) return; // zabezpieczenie przed null/undefined
        setTime(newValue.value);
        setIsCustomTime(!availableToSelectTimes.find((option) => option.value === newValue.value));
        if (onTimeChange) {
            onTimeChange(newValue.value);
        }
    };

    return (
        <div className={styles.wrapper}>
            <CreatableSelect
                value={
                    availableToSelectTimes.find((option) => option.value === time) || {
                        value: time,
                        label: time,
                    }
                }
                onChange={handleTimeChange}
                options={availableToSelectTimes}
                isDisabled={disabled}
                className={styles.selectField}
                noOptionsMessage={() => ":("}
                formatCreateLabel={(inputValue) => `> "${inputValue}"`}
            />
            {isCustomTime && (
                <div className={styles.warningMessage}>
                    Uwaga: Wybrany czas nie pochodzi z dostępnych opcji i może nakładać się z innymi wizytami.
                </div>
            )}
        </div>
    );
};

export default TimePicker;
