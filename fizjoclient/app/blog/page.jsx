"use client";
import React, { useContext, useState, useEffect } from "react";
import { FaQuestionCircle, FaCommentAlt, FaStar } from "react-icons/fa";
import { useRouter } from "next/navigation";
import styles from "./blog.module.scss";
import { AuthContext } from "@/app/contexts/auth/authContext";
import { LanguageContext } from "@/app/contexts/lang/langContext";
import pl from "./locales/pl.json";
import en from "./locales/en.json";
import apiService from "../services/apiService/apiService";
import { UserContext } from "../contexts/user/userContext";
import {format} from "date-fns";
import {pl as plDate} from "date-fns/locale/pl";

const locales = { en, pl };

const Blog = () => {
  const router = useRouter();
  const { isAuthenticated } = useContext(AuthContext);
  const { user } = useContext(UserContext);
  const { language } = useContext(LanguageContext);
  const t = locales[language];
  const [posts, setPosts] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newBody, setNewBody] = useState("");
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [newComment, setNewComment] = useState({});
  const [newCommentRating, setNewCommentRating] = useState({});

  const fetchPosts = async (page = 1) => {
    try {
      const data = await apiService.get("/Post/All", { page: page }, false);
      if (data.success) {
        setPosts(data.data.posts);
        setTotalPages(data.data.totalPages);
      } else {
        setError(t.errorFetchingPosts);
      }
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError(t.errorFetchingPosts);
    }
  };

  useEffect(() => {
    //console.log("1" + isAuthenticated);
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
      author: user.firstName,
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

  const handleAddComment = async (postId) => {
    if (!isAuthenticated) {
      setError(t.errorLoginRequired);
      setTimeout(() => {
        router.push("/auth");
      }, 2000);
      return;
    }

    const commentData = {
      postId: postId,
      body: newComment[postId],
      author: user.firstName,
      usabilityRating: newCommentRating[postId] || 1,
    };

    try {
      const data = await apiService.post(
          `/Post/Comments/Add/${postId}`,
          commentData,
          true
      );
      if (data.success) {
        // Fetch the updated post
        const updatedPostData = await apiService.get(
            `/Post/Get/${postId}`,
            {},
            false
        );
        if (updatedPostData.success) {
          // Update the posts array
          setPosts((prevPosts) =>
              prevPosts.map((post) =>
                  post.id === postId ? updatedPostData.data : post
              )
          );
        } else {
          setError(updatedPostData.message || t.errorFetchingPost);
        }

        setNewComment((prev) => ({ ...prev, [postId]: "" }));
        setNewCommentRating((prev) => ({ ...prev, [postId]: 1 }));

        setVisibleComments((prev) => ({
          ...prev,
          [postId]: (prev[postId] || 3) + 1,
        }));
      } else {
        setError(data.message || t.errorSubmittingComment);
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
      setError(t.errorSubmittingComment);
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleStarClick = (postId, rating) => {
    setNewCommentRating((prev) => ({ ...prev, [postId]: rating }));
  };

  const showMoreComments = (postId) => {
    setVisibleComments((prev) => ({
      ...prev,
      [postId]: prev[postId] + 3,
    }));
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
        <form onSubmit={handleQuestionSubmit} className={styles.questionForm}>
          <div className={styles.formGroup}>
            <label htmlFor="title" className={styles.formLabel}>
              {t.titleLabel}
            </label>
            <input
                id="title"
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder={t.enterTitle}
                required
                className={styles.formInput}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="body" className={styles.formLabel}>
              {t.bodyLabel}
            </label>
            <textarea
                id="body"
                value={newBody}
                onChange={(e) => setNewBody(e.target.value)}
                placeholder={t.enterBody}
                required
                className={styles.formTextarea}
            />
          </div>

          <button type="submit" className={styles.submitButton}>
            {t.submitQuestion}
          </button>
        </form>
        {error && <p className={styles.errorMessage}>{error}</p>}
      </section>



        <section className={styles.questionsList}>
          <h3>{t.recentQuestions}</h3>
          {posts.length > 0 ? (
              <>
                <ul>
                  {posts.map((post) => (
                      <li key={`post-${post.id}`} className={styles.questionItem}>
                        <div className={styles.questionText}>{post.title}</div>
                        <div className={styles.starRating}>
                          {[1, 2, 3, 4, 5].map((star) => (
                              <FaStar
                                  key={star}
                                  className={
                                    (post.usabilityRating || 1) >= star
                                        ? styles.starSelected
                                        : styles.star
                                  }
                              />
                          ))}
                        </div>
                        <div className={styles.questionUsername}>{post.author}</div>
                        <div className={styles.questionBody}>{post.body}</div>
                        <div className={styles.commentsSection}>
                          <h4>{t.comments}</h4>
                          {post.comments.length > 0 ? (
                              <div className={styles.commentsContainer}>
                                {post.comments.map((comment) => (
                                    <div key={`comment-${comment.id}`} className={styles.comment}>
                                      <strong>{comment?.author ? comment.author : ""}:</strong>
                                      <div className={styles.commentDate}>
                                        {format(new Date(comment.createdAt), "dd.MM.yyyy HH:mm", {
                                          locale: language === "pl" ? plDate : undefined,
                                        })}
                                      </div>
                                      <p>{comment?.body}</p>
                                    </div>
                                ))}
                              </div>
                          ) : (
                              <p>{t.noComments}</p>
                          )}
                          <textarea
                              value={newComment[post.id] || ""}
                              onChange={(e) =>
                                  setNewComment({
                                    ...newComment,
                                    [post.id]: e.target.value,
                                  })
                              }
                              placeholder={t.addComment}
                          />
                          <div className={styles.starRating}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <FaStar
                                    key={`star-${post.id}-${star}`}
                                    className={
                                      (newCommentRating[post.id] || 4) >= star
                                          ? styles.starSelected
                                          : styles.star
                                    }
                                    onClick={() => handleStarClick(post.id, star)}
                                />
                            ))}
                          </div>
                          <button
                              type="button"
                              onClick={() => handleAddComment(post.id)}
                              className={styles.addCommentButton}
                          >
                            <FaCommentAlt/> {t.add}
                          </button>
                        </div>
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