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
    answer: "",
  },
  {
    id: 2,
    text: "2. Czy w okresie ostatnich 5 lat był Pan(i) leczony na choroby nowotworowe?",
    checked: true,
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
  {
    id: 4,
    text: "4. Czy jest Pan(i) uczulona na jakiekolwiek środki poślizgowe lub wyciągi olejków eterycznych?",
    checked: false,
    followUp: "Proszę wymienić alergeny:",
    answer: "",
  },
  {
    id: 5,
    text: "5. Czy posiada Pan(i) zmiany skórne, które mogą się przenieść na obszary masowane (ręce, stopy, nogi, plecy)?",
    checked: false,
    followUp: "Proszę wymienić, jakie to są zmiany skórne:",
    answer: "",
  },
  {
    id: 6,
    text: "6. Czy jest Pan(i) pod wpływem alkoholu lub/i innych środków odurzających?",
    checked: false,
    followUp: "",
    answer: "",
  },
  {
    id: 7,
    text: "7. Czy ma Pan(i) stany chorobowe przebiegające z wysoką temperaturą ciała (powyżej 38° C), ostre i podostre stany zapalne, choroby zakaźne, gruźlica?",
    checked: false,
    followUp: "Proszę o sprecyzowanie (przyczyna wyższej temperatury ciała, przyczyny stanów zapalnych, jakie choroby zakażne):",
    answer: "",
  },
  {
    id: 8,
    text: "8. Czy spożył(a) Pan(i) posiłek bezpośrednio przed zabiegiem?",
    checked: false,
    followUp: "Jaki czas temu był spożyty posiłek?",
    answer: "",
  },
  {
    id: 9,
    text: "9. Czy ma Pan(i) przerwanie ciągłości skóry?",
    checked: false,
    followUp: "W jakim miejscu jest przerwanie ciągłości skóry? (czy masaż obejmuje ten obszar ciała?)",
    answer: "",
  },
  {
    id: 10,
    text: "10. Czy ma Pan(i) wszelkiego rodzaju zmiany dermatologiczne?",
    checked: false,
    followUp: "Proszę wymienić, jakie są to zmiany i gdzie występują (czy masaż obejmuje ten obszar ciałą?)?",
    answer: "",
  },
  {
    id: 11,
    text: "11. Czy ma Pan(i) blizny, stłuczenia, stany zapalne skóry, żylaki?",
    checked: false,
    followUp: "Proszę wymienić i zlokalizować:",
    answer: "",
  },
  {
    id: 12,
    text: "12. Czy jest Pan(i) uczulony(a) na stosowane do masażu kosmetyki?",
    checked: false,
    followUp: "Proszę o wymienienie produktów nasilających alergię:",
    answer: "",
  },
  {
    id: 13,
    text: "13. Czy występują u Pan(i) krwotoki lub tendencje do ich wystąpienia?",
    checked: false,
    followUp: "Proszę o sprecyzowanie:(przyczyny krwotoków?):",
    answer: "",
  },
  {
    id: 14,
    text: "14. Czy ma Pan(i) niewyrównane wady serca, tętniaki, świeże zakrzepy, świeży zawał serca?",
    checked: false,
    followUp: "Proszę o sprecyzowanie:",
    answer: "",
  },
  {
    id: 15,
    text: "15. Czy ma Pan(i) nowotwory złośliwe lub/i niezłośliwe?",
    checked: false,
    followUp: "Proszę o sprecyzowanie:(jaki jest to nowotwór, lokalizacja)",
    answer: "",
  },
  {
    id: 16,
    text: "16.  Czy miał(a) Pan(i) pourazowe wylewy w stawach i mięśniach (do 3 dni od urazu)?",
    checked: false,
    followUp: "Proszę o szerszy opis:",
    answer: "",
  },
  {
    id: 17,
    text: "17. Czy ma Pan(i) zapalenia żył, choroby naczyń obwodowych?",
    checked: false,
    followUp: "",
    answer: "",
  },
  {
    id: 18,
    text: "18. Czy ma Pan(i) zaawansowaną miażdżycę naczyń obwodowych lub wieńcowych?",
    checked: false,
    followUp: "",
    answer: "",
  },
  {
    id: 19,
    text: "19. Czy miał(a) Pan(i) zakrzepowe zapalenie żył (6 miesięcy po stanie zapalnym)?",
    checked: false,
    followUp: "",
    answer: "",
  },
  {
    id: 20,
    text: "20. Czy jest Pani w okresie ciąży?",
    checked: false,
    followUp: "",
    answer: "",
  },
  {
    id: 21,
    text: "21. Czy ma Pan(i) przypadki wymagające interwencji chirurgicznej? (złamania, stłuczenia, zwichnięcia)",
    checked: false,
    followUp: "",
    answer: "",
  },
  {
    id: 22,
    text: "22. Czy jest Pan(i) po zabiegach operacyjnych?",
    checked: false,
    followUp: "Proszę o sprecyzowanie (czy obszar masowany jest po zabiegu operacyjnym?):",
    answer: "",
  },
  {
    id: 23,
    text: "23. Czy ma Pan(i) chorobę wrzodową z krwawieniami?",
    checked: false,
    followUp: "",
    answer: "",
  }, 
  {
    id: 24,
    text: "24. Czy ma Pan(i) kamicę wątrobową lub/i nerkową?",
    checked: false,
    followUp: "",
    answer: "",
  }, 
  {
    id: 25,
    text: "25. Czy miał(a) Pan(i) pęknięcie wrzodu żołądka lub/i wrzodu dwunastnicy?",
    checked: false,
    followUp: "",
    answer: "",
  }, 
  {
    id: 26,
    text: "26. Czy miał(a) Pan(i) zapalenie trzustki?",
    checked: false,
    followUp: "",
    answer: "",
  }, 
  {
    id: 27,
    text: "27. Czy ma Pan(i) wirusowe zapalenie wątroby?",
    checked: false,
    followUp: "",
    answer: "",
  }, 
  {
    id: 28,
    text: "28. Czy miał(a) Pan(i) zapalenie pęcherzyka żółciowego, stany zapalne dróg żółciowych?",
    checked: false,
    followUp: "",
    answer: "",
  }, 
  {
    id: 29,
    text: "29. Czy miał(a) Pan(i) zapalenie wyrostka robaczkowego?",
    checked: false,
    followUp: "",
    answer: "",
  },
  {
    id: 30,
    text: "30. Czy miał(a) Pan(i) zapalenie otrzewnej?",
    checked: false,
    followUp: "",
    answer: "",
  },
  {
    id: 31,
    text: "31. Czy ma Pan(i) choroby pasożytnicze?",
    checked: false,
    followUp: "",
    answer: "",
  }, 
  {
    id: 32,
    text: "32. Czy jest Pan(i) w stanie po przebytym zawale serca (2 tyg)?",
    checked: false,
    followUp: "",
    answer: "",
  }, 
  {
    id: 33,
    text: "33.Czy ma Pan(i) świeże stany zapalne zastawek i serca, niewyrównane wady serca?",
    checked: false,
    followUp: "",
    answer: "",
  }, 
  {
    id: 34,
    text: "34.Czy ma Pan(i) dusznicę bolesną w czasie napadu?",
    checked: false,
    followUp: "",
    answer: "",
  }, 
  {
    id: 35,
    text: "35.Czy ma Pan(i) nieuregulowane nadciśnienie?",
    checked: false,
    followUp: "",
    answer: "",
  }, 
  {
    id: 36,
    text: "36.Czy ma Pan(i) skazę naczyniową?",
    checked: false,
    followUp: "",
    answer: "",
  }, 
  {
    id: 37,
    text: "37.Czy ma Pan(i) chorobę Birgera III°IV°?",
    checked: false,
    followUp: "",
    answer: "",
  }, 
  {
    id: 38,
    text: "38.Czy ma Pan(i) chorobę Reunalda III°IV°?",
    checked: false,
    followUp: "",
    answer: "",
  }, 
 
];

const MedicalSurvey = () => {
  const [formData, setFormData] = useState(questions);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [charCounts, setCharCounts] = useState({});
  const [textAreaErrors, setTextAreaErrors] = useState({});
  const [agreements, setAgreements] = useState({
    agreement1: false,
    agreement2: false,
    agreement3: false,
    agreement4: false,
  });
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
    if (name.startsWith("agreement")) {
      setAgreements((prev) => ({ ...prev, [name]: checked }));
      return;
    }

    const [field, id] = name.split("-");
    const questionId = parseInt(id, 10);

    const trimmedValue = value.slice(0, MAX_TEXT_LENGTH);

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
                  : trimmedValue,
            }
          : q
      )
    );

    if (type === "textarea") {
      setCharCounts((prevCounts) => ({
        ...prevCounts,
        [name]: trimmedValue.length,
      }));

      if (value.length > MAX_TEXT_LENGTH) {
        setError(`Tekst nie może przekraczać ${MAX_TEXT_LENGTH} znaków.`);
        setShowModal(true);
      } else {
        setError("");
        setShowModal(false);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setShowModal(false);

    const unanswered = formData.filter((q) => q.checked && !q.answer.trim());
    if (unanswered.length > 0) {
      setError("Proszę odpowiedzieć na wszystkie pytania.");
      setShowModal(true);
      return;
    }

    const requiredAgreements = [
      "agreement1",
      "agreement2",
      "agreement3",
      "agreement4",
    ];
    const missingAgreements = requiredAgreements.filter(
      (agreement) => !agreements[agreement]
    );

    if (missingAgreements.length > 0) {
      setError("Proszę zaznaczyć wszystkie zgody.");
      setShowModal(true);
      return;
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
                  ? question.followUp
                    ? styles.unanswered
                    : ""
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

            {question.checked && question.followUp && (
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
                  {charCounts[`answer-${question.id}`] || 0} / {MAX_TEXT_LENGTH} znaków
                </div>
              </div>
            )}
          </div>
        ))}

        <fieldset className={styles.agreements}>
          <legend className={styles.agreementsHeading}>
            ZGODA NA UDZIELENIE MASAŻU
          </legend>
          <div className={styles.agreementItem}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="agreement1"
                checked={agreements["agreement1"] || false}
                onChange={handleChange}
              />
              <span className={styles.checkboxText}>
                Oświadczam, że zrozumiałem/am powyższe pytania, a udzielone
                przeze mnie odpowiedzi są zgodne ze stanem faktycznym.
              </span>
            </label>
          </div>
          <div className={styles.agreementItem}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="agreement2"
                checked={agreements["agreement2"] || false}
                onChange={handleChange}
              />
              <span className={styles.checkboxText}>
                Wyrażam zgodę na wykonanie zabiegu masażu.
              </span>
            </label>
          </div>
          <div className={styles.agreementItem}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="agreement3"
                checked={agreements["agreement3"] || false}
                onChange={handleChange}
              />
              <span className={styles.checkboxText}>
                Oświadczam, że zapoznałem/am się z regulaminem korzystania z
                usługi masażu oferowanego przez [nazwa firmy].
              </span>
            </label>
          </div>
          <div className={styles.agreementItem}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="agreement4"
                checked={agreements["agreement4"] || false}
                onChange={handleChange}
              />
              <span className={styles.checkboxText}>
                Zobowiązuję się do zgłaszania fizjoterapeucie każdej zmiany
                mojego stanu zdrowia.
              </span>
            </label>
          </div>
        </fieldset>

        <button className={styles.submitButton} type="submit">
          Wyślij
        </button>
      </form>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <p>{error}</p>
      </Modal>
    </>
  );
};

export default MedicalSurvey;