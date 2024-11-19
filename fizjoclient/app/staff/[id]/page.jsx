'use client';
import Image from 'next/image';
import StarRating from './StarRating';
import styles from '../staff.module.scss';
import { useEffect, useState } from "react";
import apiService, { fetchAvatar } from "@/app/services/apiService/apiService";

export default function SpecialistProfile({ params }) {
    const { id } = params;
    const [specialist, setSpecialist] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        const fetchSpecialist = async () => {
            const response = await apiService.get(`/Staff/${id}`, null);
            setSpecialist(response.data);
            const avatarUrl = await fetchAvatar(response.data.avatarPath || '');
            setAvatar(avatarUrl);
        };

        fetchSpecialist();
    }, [id]);

    if (!specialist) {
        return <p>Nie znaleziono specjalisty.</p>;
    }

    return (
        <div className={styles.specialistProfile}>
            {avatar ? (
                <Image
                    src={avatar}
                    alt={specialist.name}
                    className={styles.specialistImage}
                    width={150}
                    height={150}
                />
            ) : (
                <div className={styles.specialistImageAlt}>{specialist.name}</div>
            )}
            <h1>{specialist.name}</h1>
            <p className={styles.specialistInfo}>{specialist.specialization}</p>
            <p className={styles.specialistInfo}>{specialist.description}</p>
            <p className={styles.specialistInfo}><strong>Wykształcenie:</strong> {specialist.education}</p>
            <p className={styles.specialistInfo}><strong>Doświadczenie:</strong> {specialist.experience}</p>

            <div className={styles.reviewsSection}>
                <h2>Opinie</h2>
                {specialist.reviews?.length === 0 ? (
                    <p>Brak opinii.</p>
                ) : (
                    specialist.reviews?.map((review, index) => (
                        <div key={index} className={styles.review}>
                            <h3>{review.author}</h3>
                            <StarRating rating={review.rating} />
                            <p>{review.comment}</p>
                        </div>
                    ))
                )}
            </div>

            <button onClick={() => window.history.back()} className={styles.backLink}>Wróć</button>
        </div>
    );
}