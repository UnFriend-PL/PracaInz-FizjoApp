"use client";
import React, { useContext } from "react";
import styles from "./auth.module.scss";
import { LanguageContext } from "@/app/contexts/lang/langContext";
import polish from "./locales/pl.json";
import english from "./locales/en.json";

const locales = { english, polish };

const LoginForm = ({
  formData,
  handleChange,
  handleSubmit,
  loading,
  error,
}) => {
  const { language } = useContext(LanguageContext);
  const t = locales[language];

  return (
    <form className={styles.form} onSubmit={(e) => handleSubmit(e, false)}>
      <h2 className={styles.heading}>{t.login}</h2>
      {error && (
        <p className={styles.error}>
          {t.error}: {error}
        </p>
      )}
      <label className={styles.label} htmlFor="email">
        {t.email}
      </label>
      <input
        className={styles.input}
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <label className={styles.label} htmlFor="password">
        {t.password}
      </label>
      <input
        className={styles.input}
        type="password"
        id="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <button className={styles.submitButton} type="submit" disabled={loading}>
        {loading ? t.loading : t.login}
      </button>
    </form>
  );
};

export default LoginForm;
