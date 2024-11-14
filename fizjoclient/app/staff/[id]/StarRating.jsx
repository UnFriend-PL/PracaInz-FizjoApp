import React from 'react';
import styles from '../staff.module.scss'; 

const StarRating = ({ rating }) => {
    const maxStars = 5;
    const stars = [];

    for (let i = 1; i <= maxStars; i++) {
        stars.push(
            <span key={i} className={i <= rating ? styles.starFilled : styles.starEmpty}>★</span>
        );
    }

    return <div className={styles.starRating}>{stars}</div>;
};

export default StarRating;
