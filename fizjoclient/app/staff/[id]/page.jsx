"use client";
import Image from "next/image";
import { FaStar, FaRegStar } from "react-icons/fa";
import styles from "../staff.module.scss";

import { useEffect, useState, useContext } from "react";
import { LanguageContext } from "@/app/contexts/lang/langContext";

import apiService, { fetchAvatar } from "@/app/services/apiService/apiService";
import AppointmentScheduler from "@/app/appointments/appointmentScheduler";
import pl from "./locales/pl.json";
import en from "./locales/en.json";
const locales = { en, pl };

export default function SpecialistProfile({ params }) {
  const { id } = params;
  const { language } = useContext(LanguageContext);

  const [specialist, setSpecialist] = useState(null);
  const [opinions, setOpinions] = useState([]);
  const [avatar, setAvatar] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  const t = locales[language];

  useEffect(() => {
    const fetchSpecialist = async () => {
      const response = await apiService.get(`/Staff/${id}`, null);
      setSpecialist(response.data);
      console.log("specialist");
      console.log(response.data);
      console.log("Response");
      console.log(response.data.avatarPath);
      const avatarPath = response.data.avatarPath;
      if (avatarPath) {
        const avatarUrl = await fetchAvatar(avatarPath || "");
        if (avatarUrl) {
          setAvatar(avatarUrl);
        }
      }

      console.log(response);
    };
    fetchSpecialist();
  }, [id]);
  useEffect(() => {
    getOpinions(page);
  }, [page]);
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
  const getOpinions = async (currentPage = 1) => {
    try {
      setLoading(true);
      const response = await apiService.get(
        `/Opinion/all/${id}`,
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
  if (!specialist) {
    return <p>Nie znaleziono specjalisty.</p>;
  }
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
    <>
      <div className={styles.profileContainer}>
        <div className={styles.profileHeader}>
          <div className={styles.avatarWrapper}>
            {avatar ? (
              <Image
                src={avatar}
                alt={specialist.name}
                className={styles.avatarImage}
                width={150}
                height={150}
              />
            ) : (
              <div className={styles.noAvatar}>
                <Image
                  src="/default-avatar.png"
                  alt="User Avatar"
                  width={150}
                  height={150}
                  className={styles.avatarImage}
                />
              </div>
            )}
          </div>
          <div className={styles.profileInfo}>
            <div className={styles.profileField}>
              <span className={styles.fieldLabel}>{t.education}: </span>
              <span className={styles.fieldValue}>
                {specialist.education || t.notAvailable}
              </span>
            </div>

            <div className={styles.profileField}>
              <span className={styles.fieldLabel}>{t.yearsOfExperience}: </span>
              <span className={styles.fieldValue}>
                {specialist.yearsOfExperience || t.notAvailable}
              </span>
            </div>
            {specialist.description && (
              <div className={styles.profileDescription}>
                <span className={styles.fieldLabel}>{t.description}</span>
                <div className={styles.profileDescriptionValue}>
                  <span className={styles.fieldValue}>
                    {specialist.description}
                  </span>
                </div>
              </div>
            )}
            {specialist && (
              <div className={styles.element}>
                <AppointmentScheduler
                  physiotherapistId={specialist.physiotherapistId}
                  averagePrice={
                    specialist?.averagePrice === 0
                      ? 99
                      : specialist?.averagePrice || 99
                  }
                />
              </div>
            )}
          </div>
        </div>

        <div className={styles.opinion}>
          <h2>{t.opinion}</h2>
          {opinions.length === 0 ? (
            <p>{t.noHaveOpinion}</p>
          ) : (
            opinions?.map((opinions) => (
              <div key={opinions.opinionId} className={styles.opinionCard}>
                <div className={styles.opinions}>
                  <div className={styles.opinionAuthor}>
                    {opinions.nameAndFirstLetterOfTheLastName}
                  </div>
                  <div className={styles.opinionRating}>
                    <div className={styles.stars}>
                      {renderStars(opinions.rating)}
                    </div>
                  </div>
                  <p className={styles.opinionComment}>
                    <strong>{t.opinionComment}:</strong> {opinions.comment}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
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
      <button onClick={() => window.history.back()} className={styles.backLink}>
        {t.back}
      </button>
    </>
  );
}
