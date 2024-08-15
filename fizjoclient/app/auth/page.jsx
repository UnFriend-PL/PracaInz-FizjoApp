"use client";
import { useState } from "react";
import styles from "./auth.module.scss";

const AuthPage = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    accountType: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event, isRegistering) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const url = isRegistering ? "/api/register" : "/api/login";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    setLoading(false);

    if (response.ok) {
      console.log("Success:", await response.json());
    } else {
      const errorData = await response.json();
      setError(errorData.message || "An error occurred");
    }
  };

  return (
    <div className="page">
      <div className={styles.container}>
        <div className={styles.formContainer}>
          {isRegistering ? (
            <RegistrationForm
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              loading={loading}
              error={error}
            />
          ) : (
            <LoginForm
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              loading={loading}
              error={error}
            />
          )}
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

const LoginForm = ({
  formData,
  handleChange,
  handleSubmit,
  loading,
  error,
}) => (
  <form className={styles.form} onSubmit={(e) => handleSubmit(e, false)}>
    <h2 className={styles.heading}>Login</h2>
    {error && <p className={styles.error}>{error}</p>}
    <label className={styles.label} htmlFor="email">
      Email
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
      Password
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
      {loading ? "Loading..." : "Login"}
    </button>
  </form>
);

const RegistrationForm = ({
  formData,
  handleChange,
  handleSubmit,
  loading,
  error,
}) => (
  <form className={styles.form} onSubmit={(e) => handleSubmit(e, true)}>
    <h2 className={styles.heading}>Register</h2>
    {error && <p className={styles.error}>{error}</p>}
    <label className={styles.label} htmlFor="account-type">
      Account Type
    </label>
    <select
      className={styles.input}
      id="account-type"
      name="accountType"
      value={formData.accountType}
      onChange={handleChange}
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
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        required
      />
      <label className={styles.label} htmlFor="last-name">
        Last Name
      </label>
      <input
        className={styles.input}
        type="text"
        id="last-name"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
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
        value={formData.email}
        onChange={handleChange}
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
        value={formData.password}
        onChange={handleChange}
        required
      />
      <label className={styles.label} htmlFor="confirm-password">
        Confirm Password
      </label>
      <input
        className={styles.input}
        type="password"
        id="confirm-password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
      />
      <button className={styles.submitButton} type="submit" disabled={loading}>
        {loading ? "Loading..." : "Register"}
      </button>
    </div>
  </form>
);

export default AuthPage;
``;
