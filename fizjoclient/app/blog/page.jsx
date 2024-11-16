"use client";
import React, { useContext, useState, useEffect } from "react";
import { FaQuestionCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import styles from "./blog.module.scss";
import { AuthContext } from "@/app/contexts/auth/authContext";
import { LanguageContext } from "@/app/contexts/lang/langContext";
import pl from "./locales/pl.json";
import en from "./locales/en.json";
import apiService from "../services/apiService/apiService";

const locales = { en, pl };

const Blog = () => {
  const router = useRouter();
  const { isAuthenticated } = useContext(AuthContext);
  const { language } = useContext(LanguageContext);
  const t = locales[language];

  const [posts, setPosts] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPosts = async (page = 1) => {
    await apiService
      .get("/Post/All", { page: page - 1 }, false)
      .then((data) => {
        if (data.success) {
          setPosts(data.data.posts);
          setTotalPages(data.data.totalPages);
        } else {
          setError(t.errorFetchingPosts);
        }
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
        setError(t.errorFetchingPosts);
      });
  };

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage]);

  const handleQuestionSubmit = (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      setError(t.errorLoginRequired);
      setTimeout(() => {
        router.push("/auth");
      }, 2000);
      return;
    }

    const postData = {
      title: newTitle,
      body: newBody,
      author: "Użytkownik",
      imagePath: null,
    };

    apiService
      .post("/Post/Create", postData, true)
      .then((data) => {
        if (data.success) {
          fetchPosts(currentPage);
          setNewTitle("");
          setNewBody("");
          setError("");
        } else {
          setError(data.message || t.errorSubmittingPost);
        }
      })
      .catch((err) => {
        console.error("Error submitting post:", err);
        setError(t.errorSubmittingPost);
      });
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
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
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder={t.enterTitle}
            required
          />
          <textarea
            value={newBody}
            onChange={(e) => setNewBody(e.target.value)}
            placeholder={t.enterBody}
            required
          />
          <button type="submit">{t.submitQuestion}</button>
        </form>
        {error && <p className={styles.errorMessage}>{error}</p>}
      </section>

      <section className={styles.questionsList}>
        <h3>{t.recentQuestions}</h3>
        {posts.length > 0 ? (
          <>
            <ul>
              {posts.map((post) => (
                <li key={post.id} className={styles.questionItem}>
                  <div className={styles.questionText}>{post.title}</div>
                  <div className={styles.questionUsername}>{post.author}</div>
                  <div className={styles.questionBody}>{post.body}</div>
                </li>
              ))}
            </ul>
            <div className={styles.pagination}>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                {t.previousPage}
              </button>
              <span>
                {t.page} {currentPage} {t.of} {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                {t.nextPage}
              </button>
            </div>
          </>
        ) : (
          <p>{t.noQuestions}</p>
        )}
      </section>
    </div>
  );
};

export default Blog;
