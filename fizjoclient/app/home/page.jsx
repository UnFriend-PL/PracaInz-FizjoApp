'use client';
import React, { useContext, useEffect } from 'react';
import { FaLeaf, FaSpa, FaHeartbeat, FaSmile } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import styles from './home.module.scss';
import Staff from '../staff/page';
import { AuthContext } from '@/app/contexts/auth/authContext';
import { LanguageContext } from '@/app/contexts/lang/langContext';
import pl from './locales/pl.json';
import en from './locales/en.json';

const locales = { en, pl };



const Home = () => {
    const router = useRouter();
    const { isAuthenticated } = useContext(AuthContext);
    const { language } = useContext(LanguageContext);
    const t = locales[language]; 


    const handleRegisterClick = () => {
        router.push('/auth'); 
    };

    const handleViewSpecialistsClick = () => {
        const searchSection = document.getElementById('search-section');
        if (searchSection) {
            searchSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const elements = document.querySelectorAll(`.${styles.benefit}`);
            elements.forEach((el) => {
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight) {
                    el.classList.add(styles.visible);
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className={styles.homePageContainer}>

            {/* Hero Section */}
            <section className={styles.heroSection}>
                <div className={styles.overlay}></div>
                <div className={styles.heroContent}>
                    <h1>{t.heroTitle}</h1>
                    <p>{t.heroSubtitle}</p>
                    <button onClick={handleViewSpecialistsClick} className={styles.ctaButton}>
                        {t.ctaButton}
                    </button>
                </div>
            </section>

            {/* Sekcja wyszukiwarki specjalistów */}
            <section id="search-section" className={styles.searchSection}>
                <Staff recommendStaff={true} />
            </section>

            {/* Sekcja Korzyści z Masażu */}
            <section className={styles.benefitsSection}>
                <h2>{t.benefitsTitle}</h2>
                <div className={styles.benefitsList}>
                    <div className={styles.benefit}>
                        <FaLeaf className={styles.benefitIcon} />
                        <h3>{t.benefit1Title}</h3>
                        <p>{t.benefit1Description}</p>
                    </div>
                    <div className={styles.benefit}>
                        <FaSpa className={styles.benefitIcon} />
                        <h3>{t.benefit2Title}</h3>
                        <p>{t.benefit2Description}</p>
                    </div>
                    <div className={styles.benefit}>
                        <FaHeartbeat className={styles.benefitIcon} />
                        <h3>{t.benefit3Title}</h3>
                        <p>{t.benefit3Description}</p>
                    </div>
                    <div className={styles.benefit}>
                        <FaSmile className={styles.benefitIcon} />
                        <h3>{t.benefit4Title}</h3>
                        <p>{t.benefit4Description}</p>
                    </div>
                </div>
            </section>

            {/* CTA Section - wyświetlana tylko, jeśli użytkownik nie jest zalogowany */}
            {!isAuthenticated && (
                <section className={styles.ctaSection}>
                    <h2>{t.ctaSectionTitle}</h2>
                    <button onClick={handleRegisterClick} className={styles.ctaButtonLarge}>
                        {t.registerButton}
                    </button>
                </section>
            )}
        </div>
    );
};

export default Home;





