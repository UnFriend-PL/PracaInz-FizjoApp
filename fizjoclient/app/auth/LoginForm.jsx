"use client";
import styles from "./auth.module.scss";
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

export default LoginForm;
