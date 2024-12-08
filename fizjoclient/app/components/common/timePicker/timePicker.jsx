import React, {useEffect, useState} from "react";
import Select from "react-select";
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
    const [isValid, setIsValid] = useState(true);
    const [availableToSelectTimes, setAvailableToSelectTimes] = useState(availableTimes);

    const formatTime = (hours, minutes) => {
        return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
            2,
            "0"
        )}`;
    };

    function GetTimeSteps() {
        const times = [];
        if (availableTimes.length > 0) {
            availableTimes.forEach(time => {
                const date = new Date(time);
                const hours = String(date.getHours()).padStart(2, "0");
                const minutes = String(date.getMinutes()).padStart(2, "0");
                times.push({ value: `${hours}:${minutes}`, label: `${hours}:${minutes}` });
            });
            return times;
        }

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
                times.push({value: currentTime, label: currentTime});
            }
        }
        return times;
    }

    useEffect(() => {
        const times = GetTimeSteps();
        setAvailableToSelectTimes(times);
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
            value={availableToSelectTimes.find((option) => option.value === time)}
            onChange={handleTimeChange}
            options={availableToSelectTimes}
            isDisabled={disabled}
            className={styles.selectField}
        />
    );
};

export default TimePicker;
