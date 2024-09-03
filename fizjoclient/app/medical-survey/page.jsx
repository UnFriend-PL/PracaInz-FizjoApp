"use client";
import { useState, useRef, useEffect } from "react";
import Modal from "./Modal";
import styles from "./medicalSurvey.module.scss";

const MAX_TEXT_LENGTH = 500;

const MedicalSurvey = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [unansweredQuestions, setUnansweredQuestions] = useState([]);
  const [charCounts, setCharCounts] = useState({});
  const [textAreaErrors, setTextAreaErrors] = useState({});
  const textAreasRef = useRef({});

  const questions = [
    {
      id: 1,
      text: "1. Czy obecnie występują jakieś choroby lub/i problemy zdrowotne?",
      type: "boolean",
      followUp: {
        id: 2,
        text: "Proszę wymienić choroby oraz problemy zdrowotne, które obecnie występują:",
        type: "text"
      }
    },
    {
      id: 3,
      text: "2. Czy w okresie ostatnich 5 lat był Pan(i) leczony na choroby nowotworowe?",
      type: "boolean",
      followUp: {
        id: 4,
        text: "Proszę dokładnie opisać przebieg choroby nowotworowej:",
        type: "text"
      }
    },
    {
      id: 5,
      text: "3. Czy przyjmuje Pan(i) jakiekolwiek leki ?",
      type: "boolean",
      followUp: {
        id: 6,
        text: "Proszę wymienić przyjmowane leki:",
        type: "text"
      }
    },
    // {
    //   id: 7,
    //   text: "4. Czy jest Pan(i) uczulona na jakiekolwiek środki poślizgowe lub wyciągi olejków eterycznych?",
    //   type: "boolean",
    //   followUp: {
    //     id: 8,
    //     text: "Proszę wymienić alergeny:",
    //     type: "text"
    //   }
    // },
    // {
    //   id: 9,
    //   text: "5. Czy posiada Pan(i) zmiany skórne, które mogą się przenieść na obszary masowane (ręce, stopy, nogi, plecy)?",
    //   type: "boolean",
    //   followUp: {
    //     id: 10,
    //     text: "Proszę wymienić, jakie to są zmiany skórne:",
    //     type: "text"
    //   }
    // },
    // {
    //   id: 11,
    //   text: "6. Czy jest Pan(i) pod wpływem alkoholu lub/i innych środków odurzających?",
    //   type: "boolean",
    // },
    // {
    //   id: 12,
    //   text: "7. Czy ma Pan(i) stany chorobowe przebiegające z wysoką temperaturą ciała (powyżej 38° C), ostre i podostre stany zapalne, choroby zakaźne, gruźlica?",
    //   type: "boolean",
    //   followUp: {
    //     id: 13,
    //     text: "Proszę o sprecyzowanie (przyczyna wyższej temperatury ciała, przyczyny stanów zapalnych, jakie choroby zakażne):",
    //     type: "text"
    //   }
    // },
    // {
    //   id: 14,
    //   text: "8. Czy spożył(a) Pan(i) posiłek bezpośrednio przed zabiegiem?",
    //   type: "boolean",
    //   followUp: {
    //     id: 15,
    //     text: "Jaki czas temu był spożyty posiłek?",
    //     type: "text"
    //   }
    // },
    // {
    //   id: 16,
    //   text: "9. Czy ma Pan(i) przerwanie ciągłości skóry?",
    //   type: "boolean",
    //   followUp: {
    //     id: 17,
    //     text: "W jakim miejscu jest przerwanie ciągłości skóry? (czy masaż obejmuje ten obszar ciała?)",
    //     type: "text"
    //   }
    // },
    // {
    //   id: 18,
    //   text: "10. Czy ma Pan(i) wszelkiego rodzaju zmiany dermatologiczne?",
    //   type: "boolean",
    //   followUp: {
    //     id: 19,
    //     text: "Proszę wymienić, jakie są to zmiany i gdzie występują (czy masaż obejmuje ten obszar ciałą?)?",
    //     type: "text"
    //   }
    // },
    // {
    //   id: 20,
    //   text: "11. Czy ma Pan(i) blizny, stłuczenia, stany zapalne skóry, żylaki?",
    //   type: "boolean",
    //   followUp: {
    //     id: 21,
    //     text: "Proszę wymienić i zlokalizować:",
    //     type: "text"
    //   }
    // },
    // {
    //   id: 22,
    //   text: "12. Czy jest Pan(i) uczulony(a) na stosowane do masażu kosmetyki?",
    //   type: "boolean",
    //   followUp: {
    //     id: 23,
    //     text: "Proszę o wymienienie produktów nasilających alergię:",
    //     type: "text"
    //   }
    // },
    // {
    //   id: 24,
    //   text: "13. Czy występują u Pan(i) krwotoki lub tendencje do ich wystąpienia?",
    //   type: "boolean",
    //   followUp: {
    //     id: 25,
    //     text: "Proszę o sprecyzowanie:(przyczyny krwotoków?):",
    //     type: "text"
    //   }
    // },
    // {
    //   id: 26,
    //   text: "14. Czy ma Pan(i) niewyrównane wady serca, tętniaki, świeże zakrzepy, świeży zawał serca?",
    //   type: "boolean",
    //   followUp: {
    //     id: 27,
    //     text: "Proszę o sprecyzowanie:",
    //     type: "text"
    //   }
    // },
    // {
    //   id: 28,
    //   text: "15. Czy ma Pan(i) nowotwory złośliwe lub/i niezłośliwe?",
    //   type: "boolean",
    //   followUp: {
    //     id: 29,
    //     text: "Proszę o sprecyzowanie:(jaki jest to nowotwór, lokalizacja)",
    //     type: "text"
    //   }
    // },
    // {
    //   id: 30,
    //   text: "16. Czy miał(a) Pan(i) pourazowe wylewy w stawach i mięśniach (do 3 dni od urazu)?",
    //   type: "boolean",
    //   followUp: {
    //     id: 31,
    //     text: "Proszę o szerszy opis:",
    //     type: "text"
    //   }
    // }, {
    //   id: 32,
    //   text: "17. Czy ma Pan(i) zapalenia żył, choroby naczyń obwodowych?",
    //   type: "boolean",
    //   followUp: {
    //     id: 33,
    //     text: "Proszę o szerszy opis:",
    //     type: "text"
    //   }
    // },
    // {
    //   id: 34,
    //   text: "18. Czy ma Pan(i) zaawansowaną miażdżycę naczyń obwodowych lub wieńcowych?",
    //   type: "boolean",
    // },
    // {
    //   id: 35,
    //   text: "19. Czy miał(a) Pan(i) zakrzepowe zapalenie żył (6 miesięcy po stanie zapalnym)?",
    //   type: "boolean",
    //   followUp: {
    //     id: 36,
    //     text: "Proszę o sprecyzowanie (kiedy ?):",
    //     type: "text"
    //   }
    // },
    // {
    //   id: 37,
    //   text: "20. Czy jest Pani w okresie ciąży?",
    //   type: "boolean",
    // },
    // {
    //   id: 38,
    //   text: "21. Czy ma Pan(i) przypadki wymagające interwencji chirurgicznej?",
    //   type: "boolean",
    //   followUp: {
    //     id: 39,
    //     text: "Proszę o sprecyzowanie (co to dokładnie są za przypadki?):",
    //     type: "text"
    //   }
    // },
    // {
    //   id: 40,
    //   text: "22. Czy jest Pan(i) po zabiegach operacyjnych?",
    //   type: "boolean",
    //   followUp: {
    //     id: 41,
    //     text: "Proszę o sprecyzowanie (czy obszar masowany jest po zabiegu operacyjnym?):",
    //     type: "text"
    //   }
    // },
    // {
    //   id: 42,
    //   text: "23. Czy ma Pan(i) chorobę wrzodową z krwawieniami?",
    //   type: "boolean",
    // },
    // {
    //   id: 43,
    //   text: "24. Czy ma Pan(i) kamicę wątrobową lub/i nerkową?",
    //   type: "boolean",
    // },
    // {
    //   id: 44,
    //   text: "25. Czy miał(a) Pan(i) pęknięcie wrzodu żołądka lub/i wrzodu dwunastnicy?",
    //   type: "boolean",
    //   followUp: {
    //     id: 45,
    //     text: "Proszę o sprecyzowanie (kiedy?):",
    //     type: "text"
    //   }
    // },
    // {
    //   id: 46,
    //   text: "26. Czy miał(a) Pan(i) zapalenie trzustki?",
    //   type: "boolean",
    //   followUp: {
    //     id: 47,
    //     text: "Proszę o sprecyzowanie (kiedy?):",
    //     type: "text"
    //   }
    // },
    // {
    //   id: 48,
    //   text: "27. Czy ma Pan(i) wirusowe zapalenie wątroby?",
    //   type: "boolean",
    // },
    // {
    //   id: 49,
    //   text: "28. Czy miał(a) Pan(i) zapalenie pęcherzyka żółciowego, stany zapalne dróg żółciowych?",
    //   type: "boolean",
    //   followUp: {
    //     id: 50,
    //     text: "Proszę o sprecyzowanie (kiedy?):",
    //     type: "text"
    //   }
    // },
    // {
    //   id: 51,
    //   text: "29. Czy miał(a) Pan(i) zapalenie wyrostka robaczkowego?",
    //   type: "boolean",
    //   followUp: {
    //     id: 52,
    //     text: "Proszę o sprecyzowanie (kiedy?):",
    //     type: "text"
    //   }
    // },
    // {
    //   id: 53,
    //   text: "30. Czy miał(a) Pan(i) zapalenie otrzewnej?",
    //   type: "boolean",
    //   followUp: {
    //     id: 54,
    //     text: "Proszę o sprecyzowanie (kiedy?):",
    //     type: "text"
    //   }
    // },
    // {
    //   id: 55,
    //   text: "31. Czy ma Pan(i) choroby pasożytnicze?",
    //   type: "boolean",
    // },
    // {
    //   id: 56,
    //   text: "32. Czy jest Pan(i) w stanie po przebytym zawale serca (2 tyg)?",
    //   type: "boolean",
    // },
    // {
    //   id: 57,
    //   text: "33. Czy ma Pan(i) świeże stany zapalne zastawek i serca, niewyrównane wady serca?",
    //   type: "boolean",
    // },
    // {
    //   id: 58,
    //   text: "34. Czy ma Pan(i) dusznicę bolesną w czasie napadu?",
    //   type: "boolean",
    // },
    // {
    //   id: 59,
    //   text: "35. Czy ma Pan(i) nieuregulowane nadciśnienie?",
    //   type: "boolean",
    // },
    // {
    //   id: 60,
    //   text: "36. Czy ma Pan(i) skazę naczyniową?",
    //   type: "boolean",
    // },
    // {
    //   id: 61,
    //   text: "37. Czy ma Pan(i) chorobę Birgera III°IV°?",
    //   type: "boolean",
    // },
    // {
    //   id: 62,
    //   text: "38. Czy ma Pan(i) chorobę Reunalda III°IV°?",
    //   type: "boolean",
    // },
  ];

  useEffect(() => {
    const adjustTextAreasHeight = () => {
      Object.values(textAreasRef.current).forEach((textarea) => {
        if (textarea) {
          textarea.style.height = 'auto';
          textarea.style.height = `${textarea.scrollHeight}px`;
        }
      });
    };

    adjustTextAreasHeight();
  }, [formData]);

  //DZIAŁA TYLKO BOOLEAN
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const trimmedValue = value.length > MAX_TEXT_LENGTH ? value.slice(0, MAX_TEXT_LENGTH) : value;

    if (type === 'textarea') {
      setCharCounts((prevCounts) => ({
        ...prevCounts,
        [name]: trimmedValue.length,
      }));

      if (value.length > MAX_TEXT_LENGTH) {
        setError(`Tekst nie może przekraczać ${MAX_TEXT_LENGTH} znaków.`);
        setShowModal(true);
      } else {
        setError('');
      }

      // Usuwanie błędu dla danego pola tekstowego, jeśli zostało wypełnione
      setTextAreaErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        if (trimmedValue.trim() !== '') {
          delete newErrors[name];
        }
        return newErrors;
      });
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? e.target.checked : trimmedValue,
    }));

    // Usuwanie błędu dla pytań typu boolean po zaznaczeniu odpowiedzi
    const questionId = name.match(/question-(\d+)/);
    if (questionId && type === 'radio') {
      const id = parseInt(questionId[1], 10);
      setUnansweredQuestions((prev) => prev.filter((qId) => qId !== id));
    }
  };

  //DZIAŁA TYLKO BOOLEAN 
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setShowModal(false);

    // Sprawdzanie nieodpowiedzianych pytań
    const unanswered = questions
      .filter((q) => q.type === 'boolean')
      .filter((q) => !formData[`question-${q.id}`])
      .map((q) => q.id);

    setUnansweredQuestions(unanswered);

    if (unanswered.length > 0) {
      setError('Proszę odpowiedzieć na wszystkie pytania.');
      setShowModal(true);
      return;
    }

    // Sprawdzanie, czy wszystkie text area są wypełnione
    const newTextAreaErrors = {};
    const emptyTextAreas = questions
      .filter((q) => q.followUp)
      .filter((q) => formData[`question-${q.id}`] === 'yes')
      .filter((q) => !formData[`question-${q.followUp.id}`] || formData[`question-${q.followUp.id}`].trim() === '')
      .map((q) => q.followUp.id);

    emptyTextAreas.forEach((id) => {
      newTextAreaErrors[id] = 'To pole jest wymagane!';
    });

    setTextAreaErrors(newTextAreaErrors);

    if (Object.keys(newTextAreaErrors).length > 0) {
      setError('Proszę uzupełnić wszystkie wymagane pola tekstowe.');
      setShowModal(true);
      return;
    }

    // Resetowanie stanów błędów przed wysłaniem formularza
    setTextAreaErrors({});
    setUnansweredQuestions([]);

    const requiredAgreements = [
      'agreement1',
      'agreement2',
      'agreement3',
      'agreement4',
    ];

    const missingAgreements = requiredAgreements.filter(
      (agreement) => !formData[agreement]
    );

    if (missingAgreements.length > 0) {
      setError('Proszę zaznaczyć wszystkie zgody.');
      setShowModal(true);
      return;
    }

    try {
      const response = await fetch('/api/submitMedicalSurvey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Wystąpił błąd');
      }

      console.log('Sukces:', await response.json());
    } catch (error) {
      setError(error.message);
      setShowModal(true);
    }
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.heading}>Ankieta dla pacjenta zgłaszającego się na zabieg masażu</h2>
        {questions.map((question) => (
          <div key={question.id} className={styles.questionContainer}>
            <label
              className={`${styles.label} ${unansweredQuestions.includes(question.id) ? styles.unanswered : ''}`}
              htmlFor={`question-${question.id}`}
            >
              {question.text}
            </label>
            <div className={styles.booleanInput}>
              <label>
                <input
                  type="radio"
                  id={`question-${question.id}-yes`}
                  name={`question-${question.id}`}
                  value="yes"
                  checked={formData[`question-${question.id}`] === 'yes'}
                  onChange={handleChange}
                />
                <span>Tak</span>
              </label>
              <label>
                <input
                  type="radio"
                  id={`question-${question.id}-no`}
                  name={`question-${question.id}`}
                  value="no"
                  checked={formData[`question-${question.id}`] === 'no'}
                  onChange={handleChange}
                />
                <span>Nie</span>
              </label>
            </div>

            {formData[`question-${question.id}`] === 'yes' && question.followUp && (
              <div className={`${styles.followUpQuestion} ${textAreaErrors[question.followUp.id] ? styles.textAreaError : ''}`}>
                <label
                  className={`${styles.label} ${textAreaErrors[question.followUp.id] ? styles.unanswered : ''}`}
                  htmlFor={`question-${question.followUp.id}`}
                >
                  {question.followUp.text}
                </label>
                <textarea
                  className={`${styles.textarea} ${textAreaErrors[question.followUp.id] ? styles.textareaError : ''}`}
                  id={`question-${question.followUp.id}`}
                  name={`question-${question.followUp.id}`}
                  value={formData[`question-${question.followUp.id}`] || ''}
                  onChange={handleChange}
                  ref={(el) => (textAreasRef.current[question.followUp.id] = el)}
                />
                {textAreaErrors[question.followUp.id] && (
                  <div className={styles.errorMessage}>To pole jest wymagane!</div>
                )}
                <div className={styles.charCount}>
                  {charCounts[`question-${question.followUp.id}`] || 0} / {MAX_TEXT_LENGTH} znaków
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Sekcja zgód */}
        <fieldset className={styles.agreements}>
          <legend className={styles.agreementsHeading}>ZGODA NA UDZIELENIE MASAŻU</legend>
          <div className={styles.agreementItem}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="agreement1"
                checked={formData['agreement1'] || false}
                onChange={handleChange}
              />
              <span className={styles.checkboxText}>
                Oświadczam, że zrozumiałem/am powyższe pytania, a udzielone przeze mnie odpowiedzi są zgodne ze stanem faktycznym. Pomimo występowania wymienionych przeze mnie w pkt. 1 chorób oraz/lub potwierdzam chęć skorzystania z usługi masażu na własną odpowiedzialność.
              </span>
            </label>
          </div>
          <div className={styles.agreementItem}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="agreement2"
                checked={formData['agreement2'] || false}
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
                checked={formData['agreement3'] || false}
                onChange={handleChange}
              />
              <span className={styles.checkboxText}>
                Oświadczam, że zapoznałem/am się z regulaminem korzystania z usługi masażu oferowanego przez [nazwa firmy], a także z przeciwwskazaniami oraz wpływem masażu na organizm człowieka.
              </span>
            </label>
          </div>
          <div className={styles.agreementItem}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="agreement4"
                checked={formData['agreement4'] || false}
                onChange={handleChange}
              />
              <span className={styles.checkboxText}>
                Zobowiązuję się do zgłaszania fizjoterapeucie każdej zmiany mojego stanu zdrowia, która nastąpi w trakcie udzielania zabiegów.
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


