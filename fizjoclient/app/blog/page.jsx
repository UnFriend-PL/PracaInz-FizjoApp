'use client';
import React, { useContext, useState } from 'react';
import { FaQuestionCircle } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import styles from './blog.module.scss';
import { AuthContext } from '@/app/contexts/auth/authContext';
import { LanguageContext } from '@/app/contexts/lang/langContext';
import pl from './locales/pl.json';
import en from './locales/en.json';

const locales = { en, pl };

const Blog = () => {
    const router = useRouter();
    const { isAuthenticated } = useContext(AuthContext);
    const { language } = useContext(LanguageContext);
    const t = locales[language];

    const [questions, setQuestions] = useState([]);
    const [newQuestion, setNewQuestion] = useState("");
    const [error, setError] = useState("");

    const handleQuestionSubmit = (e) => {
        e.preventDefault();

        if (!isAuthenticated) {
            setError(t.errorLoginRequired); 
            setTimeout(() => {
                router.push('/auth'); 
            }, 2000);
            return;
        }

        // Dodanie pytania do listy pytań, jeśli użytkownik jest zalogowany
        const newQuestionObj = {
            text: newQuestion,
            username: "Użytkownik", // Możesz dodać logikę do wyświetlania aktualnego użytkownika
        };

        setQuestions([newQuestionObj, ...questions]); 
        setNewQuestion(""); 
    };

    return (
        <div className={styles.blogContainer}>
            <section className={styles.introSection}>
                <h1>{t.questionAboutPhysiotherapy}</h1>
                <p>{t.blogDescription1}</p>
                <p>{t.blogDescription2}</p>
            </section>

            <section className={styles.guideSection}>
                <h2>{t.howToAskQuestion}</h2>
                <div className={styles.stepsContainer}>
                    <div className={styles.stepCard}>
                        <FaQuestionCircle className={styles.stepIcon} />
                        <h3>{t.stepThinkQuestion}</h3>
                        <p>{t.stepThinkDescription}</p>
                    </div>
                    <div className={styles.stepCard}>
                        <FaQuestionCircle className={styles.stepIcon} />
                        <h3>{t.stepLogin}</h3>
                        <p>{t.stepLoginDescription}</p>
                    </div>
                    <div className={styles.stepCard}>
                        <FaQuestionCircle className={styles.stepIcon} />
                        <h3>{t.stepFillForm}</h3>
                        <p>{t.stepFillDescription}</p>
                    </div>
                    <div className={styles.stepCard}>
                        <FaQuestionCircle className={styles.stepIcon} />
                        <h3>{t.stepSubmitQuestion}</h3>
                        <p>{t.stepSubmitDescription}</p>
                    </div>
                </div>
            </section>

            <section className={styles.questionFormSection}>
                <h2>{t.askQuestion}</h2>
                <form onSubmit={handleQuestionSubmit}>
                    <textarea
                        value={newQuestion}
                        onChange={(e) => setNewQuestion(e.target.value)}
                        placeholder={t.enterQuestion}
                        required
                    />
                    <button type="submit">{t.submitQuestion}</button>
                </form>
                {/* Komunikat o błędzie (jeśli użytkownik nie jest zalogowany) */}
                {error && <p className={styles.errorMessage}>{error}</p>}
            </section>

            <section className={styles.questionsList}>
                <h3>{t.recentQuestions}</h3>
                {questions.length > 0 ? (
                    <ul>
                        {questions.map((question, index) => (
                            <li key={index} className={styles.questionItem}>
                                <div className={styles.questionText}>{question.text}</div>
                                <div className={styles.questionUsername}>{question.username}</div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>{t.noQuestions}</p>
                )}
            </section>
        </div>
    );
};

export default Blog;




