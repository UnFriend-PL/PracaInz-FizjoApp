import React, {useContext, useState,} from "react";
import {AsyncPaginate} from "react-select-async-paginate";
import styles from "./treatments.module.scss";
import {AppointmentContext} from "@/app/appointments/appointmentContext";
import {CiCircleChevDown, CiCircleChevUp} from "react-icons/ci";

import pl from "./locales/pl.json";
import en from "./locales/en.json";
import {AuthContext} from "@/app/contexts/auth/authContext";

const locales = {en, pl};

const TreatmentItem = ({treatment, onEdit, onDelete, language, role}) => {
    const [isEditingNotes, setIsEditingNotes] = useState(false);
    const [newNotes, setNewNotes] = useState("");
    const [isEditingDuration, setIsEditingDuration] = useState(false);
    const [newDuration, setNewDuration] = useState(treatment.duration);
    const [showDetails, setShowDetails] = useState(false);
    const handleEditNotes = () => {
        if (role === "patient") return;
        setIsEditingNotes(true);
        setNewNotes(treatment.notes || "");
    };

    const saveEditNotes = () => {
        if (role === "patient") return;
        onEdit(treatment.id, {notes: newNotes});
        setIsEditingNotes(false);
    };

    const handleEditDuration = () => {
        setIsEditingDuration(true);
        setNewDuration(treatment.duration);
    };

    const saveEditDuration = () => {
        onEdit(treatment.id, {duration: newDuration});
        setIsEditingDuration(false);
    };

    const handleDurationKeyDown = (e) => {
        if (e.key === "Enter") {
            saveEditDuration();
        } else if (e.key === "Escape") {
            setIsEditingDuration(false);
            setNewDuration(treatment.duration);
        }
    };

    return (
        <div className={styles.treatmentItem} key={treatment.id}>
            <div className={styles.treatmentHeader}>
        <span className={styles.treatmentName}>
          {language === "en" ? treatment.name : treatment.namePL}
        </span>

                {isEditingDuration ? (
                    <input
                        type="text"
                        className={styles.durationInput}
                        value={newDuration}
                        onChange={(e) => setNewDuration(e.target.value)}
                        onBlur={saveEditDuration}
                        onKeyDown={handleDurationKeyDown}
                        autoFocus
                    />
                ) : (
                    <span
                        className={styles.treatmentDuration}
                        onDoubleClick={handleEditDuration}
                        style={{cursor: "pointer"}}
                        title="Double-click to edit duration"
                    >
            {treatment.duration}
          </span>
                )}

                <div className={styles.treatmentBodyDetails}>
          <span>
            {language === "en"
                ? treatment.bodySectionName
                : treatment.bodySectionNamePL}
          </span>
                    <span>
            {language === "en" ? treatment.viewName : treatment.viewNamePL}
          </span>
                    <span>
            {language === "en" ? treatment.bodySide : treatment.bodySidePL}
          </span>
                </div>
                {showDetails ? (
                    <CiCircleChevUp
                        className={styles.showMore}
                        onClick={() => setShowDetails(false)}
                    />
                ) : (
                    <CiCircleChevDown
                        className={styles.showMore}
                        onClick={() => setShowDetails(true)}
                    />
                )}
            </div>
            {showDetails && (
                <div className={styles.treatmentDetails}>
          <span className={styles.treatmentDetailsElement}>
            {language == "en"
                ? treatment.description
                : treatment.descriptionPL}
          </span>

                    {isEditingNotes ? (
                        <textarea
                            value={newNotes}
                            onChange={(e) => setNewNotes(e.target.value)}
                            onBlur={saveEditNotes}
                            onKeyDown={(e) => e.key === "Enter" && saveEditNotes()}
                            autoFocus
                        />
                    ) : (
                        <span
                            onDoubleClick={role === "Physiotherapist" ? handleEditNotes : undefined}
                            className={styles.treatmentDetailsElement}
                            style={{cursor: "pointer"}}
                            title="Double-click to edit notes"
                        >
              {treatment.notes || "No notes..."}
            </span>
                    )}
                    {role === "Physiotherapist" && (
                        <button onClick={() => onDelete(treatment.id)}>Delete</button>
                    )}
                </div>
            )}
        </div>
    );
};

const TreatmentsAutoComplete = () => {
    const {
        language,
        loadOptions,
        selectedOptions,
        selectedTreatments,
        handleSelectionChange,
        updateTreatment,
        removeTreatment,
        includeSelectedBodyParts,
        handleChangeIncludeSelectedBodyParts,
    } = useContext(AppointmentContext);
    const {role} = useContext(AuthContext);
    const t = locales[language];

    return (
        <div className={styles.container}>
            {role === "Physiotherapist" && (
                <>
                    <label>
                        <input
                            type="checkbox"
                            checked={includeSelectedBodyParts}
                            onChange={handleChangeIncludeSelectedBodyParts}
                        />
                        {t.includeSelectedTreatmentsOnly}
                    </label>

                    <AsyncPaginate
                        key={language}
                        loadOptions={loadOptions}
                        value={selectedOptions}
                        onChange={handleSelectionChange}
                        isMulti
                        placeholder={t.treatmentSearch}
                        debounceTimeout={500}
                        additional={{page: 1}}
                        className={styles.treatmentSelect}
                    />
                </>
            )}
            <div className={styles.treatmentList}>
                {selectedTreatments && selectedTreatments.length > 0 ? (
                    selectedTreatments.map((treatment) => (
                        <TreatmentItem
                            key={treatment.id}
                            treatment={treatment}
                            onEdit={updateTreatment}
                            onDelete={removeTreatment}
                            language={language}
                            role={role}
                        />
                    ))
                ) : (
                    <div>No treatments available.</div>
                )}
            </div>
        </div>
    );
};

export default TreatmentsAutoComplete;
