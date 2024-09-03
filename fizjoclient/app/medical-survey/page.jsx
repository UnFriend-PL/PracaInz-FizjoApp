"use client";
import { useState, useRef, useEffect } from "react";
import Modal from "./Modal";
import styles from "./medicalSurvey.module.scss";

const MAX_TEXT_LENGTH = 500;

const questions = [
  {
    id: 1,
    text: "1. Czy obecnie występują jakieś choroby lub/i problemy zdrowotne?",
    checked: true,
    followUp: "Proszę wymienić choroby oraz problemy zdrowotne, które obecnie",
    answer: "example answer",
  },
  {
    id: 2,
    text: "2. Czy w okresie ostatnich 5 lat był Pan(i) leczony na choroby nowotworowe?",
    checked: false,
    followUp: "Proszę dokładnie opisać przebieg choroby nowotworowej:",
    answer: "",
  },
  {
    id: 3,
    text: "3. Czy przyjmuje Pan(i) jakiekolwiek leki?",
    checked: false,
    followUp: "Proszę wymienić przyjmowane leki:",
    answer: "",
  },
];

const MedicalSurvey = () => {
  const [formData, setFormData] = useState(questions);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [charCounts, setCharCounts] = useState({});
  const [textAreaErrors, setTextAreaErrors] = useState({});
  const textAreasRef = useRef({});

  useEffect(() => {
    Object.values(textAreasRef.current).forEach((textarea) => {
      if (textarea) {
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    });
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const [field, id] = name.split("-");
    const questionId = parseInt(id, 10);

    setFormData((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? {
              ...q,
              [field]:
                type === "checkbox"
                  ? checked
                  : type === "radio"
                  ? value === "true"
                  : value.slice(0, MAX_TEXT_LENGTH),
            }
          : q
      )
    );

    if (type === "textarea") {
      setCharCounts((prev) => ({ ...prev, [name]: value.length }));
      setTextAreaErrors((prev) => {
        if (value.trim()) delete prev[name];
        return { ...prev };
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setShowModal(false);

    const unanswered = formData.filter((q) => q.checked && !q.answer.trim());
    console.log(unanswered);
    if (unanswered.length > 0) {
      setError("Proszę odpowiedzieć na wszystkie pytania.");
      setShowModal(true);
      return;
    }

    try {
      // const response = await fetch("/api/submitMedicalSurvey", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(formData),
      // });
      // if (!response.ok) {
      //   const errorData = await response.json();
      //   throw new Error(errorData.message || "Wystąpił błąd");
      // }
      // console.log("Sukces:", await response.json());
    } catch (error) {
      setError(error.message);
      setShowModal(true);
    }
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.heading}>
          Ankieta dla pacjenta zgłaszającego się na zabieg masażu
        </h2>
        {formData.map((question) => (
          <div key={question.id} className={styles.questionContainer}>
            <label
              className={`${styles.label} ${
                question.checked && !question.answer.trim()
                  ? styles.unanswered
                  : ""
              }`}
              htmlFor={`text-${question.id}`}
            >
              {question.text}
            </label>
            <div className={styles.booleanInput}>
              <label>
                <input
                  type="radio"
                  name={`checked-${question.id}`}
                  value={true}
                  checked={question.checked === true}
                  onChange={handleChange}
                />
                <span>Tak</span>
              </label>
              <label>
                <input
                  type="radio"
                  name={`checked-${question.id}`}
                  value={false}
                  checked={question.checked === false}
                  onChange={handleChange}
                />
                <span>Nie</span>
              </label>
            </div>

            {question.checked && (
              <div
                className={`${styles.followUpQuestion} ${
                  textAreaErrors[`answer-${question.id}`]
                    ? styles.textAreaError
                    : ""
                }`}
              >
                <label
                  className={`${styles.label} ${
                    textAreaErrors[`answer-${question.id}`]
                      ? styles.unanswered
                      : ""
                  }`}
                  htmlFor={`answer-${question.id}`}
                >
                  {question.followUp}
                </label>
                <textarea
                  className={`${styles.textarea} ${
                    textAreaErrors[`answer-${question.id}`]
                      ? styles.textareaError
                      : ""
                  }`}
                  name={`answer-${question.id}`}
                  value={question.answer}
                  onChange={handleChange}
                  ref={(el) => (textAreasRef.current[question.id] = el)}
                />
                <div className={styles.errorMessage}>
                  {textAreaErrors[`answer-${question.id}`]}
                </div>
                <div className={styles.charCount}>
                  {charCounts[`answer-${question.id}`] || 0} / {MAX_TEXT_LENGTH}{" "}
                  znaków
                </div>
              </div>
            )}
          </div>
        ))}
        <button className={styles.submitButton} type="submit">
          Wyślij
        </button>
      </form>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        {error}
      </Modal>
    </>
  );
};

export default MedicalSurvey;
