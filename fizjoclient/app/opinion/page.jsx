"use client";
import React, { useContext, useState, useEffect } from "react";
import apiService from "@/app/services/apiService/apiService";
import { AuthContext } from "@/app/contexts/auth/authContext";
import { LanguageContext } from "@/app/contexts/lang/langContext";
import {
  FaRegEdit,
  FaRegSave,
  FaRegTrashAlt,
  FaStar,
  FaRegStar,
} from "react-icons/fa";

import styles from "./opinions.module.scss";
import pl from "./locales/pl.json";
import en from "./locales/en.json";

const locales = { en, pl };

const Opinions = () => {
  const { isAuthenticated, role, userId } = useContext(AuthContext);
  const { language } = useContext(LanguageContext);
  const [opinions, setOpinions] = useState([]);
  const [editingOpinion, setEditingOpinion] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const t = locales[language];

  const getOpinions = async (currentPage = 1) => {
    try {
      setLoading(true);
      const response = await apiService.get(
        `/Opinion/all`,
        { page: currentPage, pageSize: 5 },
        true
      );
      if (response.page && response.opinions) {
        setOpinions(response.opinions);
        setTotalPages(response.totalPage || 1);
        setPage(response.page);
      }
      setLoading(false);
    } catch (error) {
      console.error("Błąd podczas pobierania opinii:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      getOpinions(page);
    }
  }, [isAuthenticated, page]);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<FaStar key={i} className={styles.star} />);
      } else {
        stars.push(<FaRegStar key={i} className={styles.star} />);
      }
    }
    return stars;
  };

  const handleEditOpinion = (opinion) => {
    if (role === "Patient" && opinion.PatientId === userId) {
      setEditingOpinion(opinion);
    } else {
      console.error("Nie masz uprawnień do edytowania tej opinii.");
    }
  };

  const updateOpinion = async (updatedOpinion) => {
    try {
      const response = await apiService.post(
        `/Opinion/${updatedOpinion.opinionId}`,
        {
          rating: updatedOpinion.rating,
          comment: updatedOpinion.comment,
        },
        true
      );

      if (response && response.success) {
        setOpinions((prevOpinions) =>
          prevOpinions.map((opinion) =>
            opinion.opinionId === updatedOpinion.opinionId
              ? updatedOpinion
              : opinion
          )
        );
        setEditingOpinion(null);
      } else {
        console.error("Nie udało się zaktualizować opinii");
      }
    } catch (error) {
      console.error("Błąd podczas aktualizacji opinii:", error);
    }
  };
  const handleDeleteOpinion = (opinionId) => {
    onDelete(opinionId);
    setOpinions((prevOpinions) =>
      prevOpinions.filter((opinion) => opinion.opinionId !== opinionId)
    );
  };

  const onDelete = async (opinionId) => {
    try {
      const endpoint = `/Opinion/${opinionId}`;
      const response = await apiService.delete(endpoint, null, true);

      if (response.success) {
        console.log("Opinia została pomyślnie usunięta");
      } else {
        console.error("Wystąpił błąd podczas usuwania opinii");
      }
    } catch (error) {
      console.error("Błąd połączenia:", error);
    }
  };
  const cancelEdit = () => {
    setEditingOpinion(null);
  };

  const handleCommentChange = (e) => {
    setEditingOpinion((prev) => ({
      ...prev,
      comment: e.target.value,
    }));
  };

  const handleRatingChange = (newRating) => {
    if (editingOpinion) {
      setEditingOpinion((prev) => ({
        ...prev,
        rating: newRating,
      }));
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>{t.opinionsTitle}</h1>
      {loading ? (
        <p>{t.loadingOpinions}</p>
      ) : (
        <div>
          {opinions.map((opinion) => (
            <div key={opinion.opinionId} className={styles.opinionCard}>
              <span className={styles.opinionDetail}>
                <strong></strong>{" "}
                {role === "Patient"
                  ? opinion.about
                  : opinion.nameAndFirstLetterOfTheLastName}
              </span>
              <div className={styles.rating}>
                <div className={styles.stars}>
                  {editingOpinion?.opinionId === opinion.opinionId
                    ? [1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          onClick={() => handleRatingChange(star)}
                        >
                          {star <= editingOpinion.rating ? (
                            <FaStar className={styles.filledStar} />
                          ) : (
                            <FaRegStar className={styles.emptyStar} />
                          )}
                        </span>
                      ))
                    : renderStars(opinion.rating)}
                </div>
              </div>
              {editingOpinion?.opinionId === opinion.opinionId ? (
                <textarea
                  value={editingOpinion.comment}
                  onChange={handleCommentChange}
                  className={styles.commentInput}
                />
              ) : (
                <p className={styles.opinionComment}>
                  <strong>{t.opinionComment}:</strong> {opinion.comment}
                </p>
              )}
              <span className={styles.opinionDate}>
                {new Date(opinion.uploadDate).toLocaleDateString()}
              </span>
              {role === "Patient" && opinion.PatientId === userId && (
                <div className={styles.buttonContainer}>
                  {editingOpinion &&
                  editingOpinion.opinionId === opinion.opinionId ? (
                    <>
                      <button
                        onClick={() => updateOpinion(editingOpinion)}
                        className={styles.saveButton}
                      >
                        <FaRegSave className={styles.saveIcon} />
                        {t.save}
                      </button>
                      <button
                        onClick={cancelEdit}
                        className={styles.cancelButton}
                      >
                        <FaRegTrashAlt className={styles.cancelIcon} />
                        {t.cancel}
                      </button>
                    </>
                  ) : (
                    <div className={styles.ButtonContainer}>
                      <button
                        onClick={() => handleEditOpinion(opinion)}
                        className={styles.editButton}
                      >
                        <FaRegEdit className={styles.editIcon} />
                        {t.edit}
                      </button>
                      <button
                        onClick={() => handleDeleteOpinion(opinion.opinionId)} // Funkcja usuwania
                        className={styles.deleteButton}
                      >
                        <FaRegTrashAlt className={styles.deleteIcon} />
                        {t.delete}
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          <div className={styles.pagination}>
            <button
              onClick={handlePrevPage}
              disabled={page <= 1}
              className={styles.paginationButton}
            >
              {t.prevPage}
            </button>
            <span className={styles.pageInfo}>
              {t.page} {page} {t.of} {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={page >= totalPages}
              className={styles.paginationButton}
            >
              {t.nextPage}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Opinions;
