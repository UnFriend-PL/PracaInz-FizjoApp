"use client";
import React, { useContext, useState, useEffect } from "react";
import apiService from "@/app/services/apiService/apiService";
import { AuthContext } from "@/app/contexts/auth/authContext";
import { LanguageContext } from "@/app/contexts/lang/langContext";
import { FaStar, FaRegStar } from "react-icons/fa6";
import styles from "./opinions.module.scss";
import pl from "./locales/pl.json";
import en from "./locales/en.json";

const locales = { en, pl };

const Opinions = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const { language } = useContext(LanguageContext);
  const [opinions, setOpinions] = useState([]);
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

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
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

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>{t.opinionsTitle}</h1>
      {loading ? (
        <p>{t.loadingOpinions}</p>
      ) : (
        <div>
          {opinions.map((opinion) => (
            <div key={opinion.opinionId} className={styles.opinionCard}>
              <span className={styles.opinionAuthor}>
                <strong>{t.opinionAuthor}:</strong>{" "}
                {opinion.nameAndFirstLetterOfTheLastName}
              </span>
              <span className={styles.opinionRating}>
                <div className={styles.stars}>
                  {renderStars(opinion.rating)}
                </div>
              </span>

              <p className={styles.opinionComment}>
                <strong>{t.opinionComment}:</strong> {opinion.comment}
              </p>

              <span className={styles.opinionDate}>
                <strong>{t.opinionDate}:</strong>{" "}
                {new Date(opinion.uploadDate).toLocaleDateString()}
              </span>
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
