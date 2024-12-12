'use client';
import React, { useContext } from 'react';
import { LanguageContext } from '@/app/contexts/lang/langContext';
import styles from './contact.module.scss';
import Staff from '../staff/page';
import pl from './locales/pl.json';
import en from './locales/en.json';

const locales = { en, pl };

const Contact = () => {
    const { language } = useContext(LanguageContext);
    const t = locales[language];

    return (
        <div className={styles.contactPageContainer}>
            <h1>{t.contactTitle}</h1>

            {/* Sekcja O Nas */}
            <section className={styles.aboutSection}>
                <h2>{t.aboutTitle}</h2>
                <p>{t.aboutDescription}</p>
            </section>

            {/* Informacje Kontaktowe */}
            <section className={styles.contactInfoSection}>
                <h2>{t.contactInfoTitle}</h2>
                <p>Email: <a href="mailto:info@example.com">info@example.com</a></p>
                <p>Telefon: <a href="tel:+123456789">+123 456 789</a></p>
            </section>

            {/* Formularz Kontaktowy */}
            <section className={styles.contactFormSection}>
                <h2>{t.contactFormTitle}</h2>
                <form>
                    <input type="text" placeholder={t.namePlaceholder} required />
                    <input type="email" placeholder={t.emailPlaceholder} required />
                    <textarea placeholder={t.messagePlaceholder} required></textarea>
                    <button type="submit" className={styles.ctaButton}>{t.sendButton}</button>
                </form>
            </section>

            {/* FAQ */}
            <section className={styles.faqSection}>
            <h2>{t.faqTitle}</h2>
<ul>
    <li>{t.faq1}</li>
    <li>{t.faq2}</li>
</ul>
<a href="/blog?category=faq" className={styles.ctaButton}>
    {t.blogLink}
</a>

</section>

        </div>
    );
};

export default Contact;
