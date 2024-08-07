"use client";
import { useState } from "react";
import styles from "./auth.module.scss";

const AuthPage = () => {
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <div className="page">
      <div className={styles.container}>
        <div className={styles.formContainer}>
          {isRegistering ? <RegistrationForm /> : <LoginForm />}
          <button
            className={styles.toggleButton}
            onClick={() => setIsRegistering(!isRegistering)}
          >
            {isRegistering ? "Back to Login" : "Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

const handleSubmit = (event) => {
  event.preventDefault();
  console.log("pop");
};

const LoginForm = () => (
  <form className={styles.form} onSubmit={handleSubmit}>
    <h2 className={styles.heading}>Login</h2>
    <label className={styles.label} htmlFor="email">
      Email
    </label>
    <input
      className={styles.input}
      type="email"
      id="email"
      name="email"
      required
    />
    <label className={styles.label} htmlFor="password">
      Password
    </label>
    <input
      className={styles.input}
      type="password"
      id="password"
      name="password"
      required
    />
    <button className={styles.submitButton} type="submit">
      Login
    </button>
  </form>
);

const RegistrationForm = () => (
  <form className={styles.form}>
    <h2 className={styles.heading}>Register</h2>
    <label className={styles.label} htmlFor="account-type">
      Account Type
    </label>
    <select
      className={styles.input}
      id="account-type"
      name="account-type"
      required
    >
      <option className={styles.option} value="">
        Select Account Type
      </option>
      <option className={styles.option} value="patient">
        Patient
      </option>
      <option className={styles.option} value="physiotherapist">
        Physiotherapist
      </option>
    </select>
    <div className={styles.registrationFields}>
      <label className={styles.label} htmlFor="first-name">
        First Name
      </label>
      <input
        className={styles.input}
        type="text"
        id="first-name"
        name="first-name"
        required
      />
      <label className={styles.label} htmlFor="last-name">
        Last Name
      </label>
      <input
        className={styles.input}
        type="text"
        id="last-name"
        name="last-name"
        required
      />
      <label className={styles.label} htmlFor="email">
        Email
      </label>
      <input
        className={styles.input}
        type="email"
        id="email"
        name="email"
        required
      />
      <label className={styles.label} htmlFor="password">
        Password
      </label>
      <input
        className={styles.input}
        type="password"
        id="password"
        name="password"
        required
      />
      <label className={styles.label} htmlFor="confirm-password">
        Confirm Password
      </label>
      <input
        className={styles.input}
        type="password"
        id="confirm-password"
        name="confirm-password"
        required
      />
      <button className={styles.submitButton} type="submit">
        Register
      </button>
    </div>
  </form>
);

export default AuthPage;
