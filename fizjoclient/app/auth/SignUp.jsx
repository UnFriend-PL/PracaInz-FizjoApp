"use client";
import { useState } from "react";
import styles from "./auth.module.scss";
import { validateField } from "../validation";
const RegistrationForm = ({
  formData,
  handleChange,
  accountType,
  setAccountType,
  handleSubmit,
  loading,
  error,
}) => {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleChangeWithValidation = (e) => {
    const { name, value } = e.target;
    handleChange(e);
    validateField(name, value);
  };
  const isStepValid = () => {
    switch (step) {
      case 1:
        return accountType === "patient"
          ? formData.insuranceNumber.trim() !== ""
          : formData.licenseNumber.trim() !== "";
      case 2:
        return (
          formData.firstName.trim() !== "" &&
          formData.lastName.trim() !== "" &&
          formData.gender.trim() !== "" &&
          formData.dateOfBirth.trim() !== "" &&
          formData.pesel.trim() !== "" &&
          !errors.firstName &&
          !errors.lastName &&
          !errors.gender &&
          !errors.dateOfBirth &&
          !errors.pesel
        );
      case 3:
        return (
          formData.country.trim() !== "" &&
          formData.city.trim() !== "" &&
          formData.streetWithHouseNumber.trim() !== "" &&
          formData.postCode.trim() !== "" &&
          !errors.country &&
          !errors.city &&
          !errors.streetWithHouseNumber &&
          !errors.postCode
        );
      case 4:
        return (
          formData.email.trim() !== "" &&
          formData.password.trim() !== "" &&
          formData.confirmPassword.trim() !== "" &&
          formData.phoneNumber.trim() !== "" &&
          !errors.phoneNumber
        );
      default:
        return false;
    }
  };
  return (
    <form className={styles.form} onSubmit={(e) => handleSubmit(e, true)}>
      <h2 className={styles.heading}>Sign up</h2>
      {error && <p className={styles.error}>{error}</p>}

      {step === 1 && (
        <>
          <label className={styles.label} htmlFor="account-type">
            Account Type
          </label>
          <select
            className={styles.input}
            id="account-type"
            name="accountType"
            value={accountType}
            onChange={setAccountType}
            required
          >
            <option className={styles.option} value="patient">
              Patient
            </option>
            <option className={styles.option} value="physiotherapist">
              Physiotherapist
            </option>
          </select>

          {accountType === "patient" && (
            <>
              <label className={styles.label} htmlFor="insurance-number">
                Insurance Number
              </label>
              <input
                className={styles.input}
                type="text"
                id="insurance-number"
                name="insuranceNumber"
                value={formData.insuranceNumber}
                onChange={handleChange}
                required
              />
            </>
          )}

          {accountType === "physiotherapist" && (
            <>
              <label className={styles.label} htmlFor="license-number">
                License Number
              </label>
              <input
                className={styles.input}
                type="text"
                id="license-number"
                name="licenseNumber"
                value={formData.licenseNumber}
                onChange={handleChange}
                required
              />
            </>
          )}
        </>
      )}

      {step === 2 && (
        <>
          <label className={styles.label} htmlFor="first-name">
            First Name
          </label>
          <input
            className={styles.input}
            type="text"
            id="first-name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChangeWithValidation}
            required
          />
          {errors.firstName && (
            <p className={styles.error}>{errors.firstName}</p>
          )}

          <label className={styles.label} htmlFor="last-name">
            Last Name
          </label>
          <input
            className={styles.input}
            type="text"
            id="last-name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChangeWithValidation}
            required
          />
          {errors.lastName && <p className={styles.error}>{errors.lastName}</p>}

          <label className={styles.label} htmlFor="gender">
            Gender
          </label>
          <select
            className={styles.input}
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChangeWithValidation}
            required
          >
            <option className={styles.option} value="male">
              Male
            </option>
            <option className={styles.option} value="female">
              Female
            </option>
            <option className={styles.option} value="other">
              Other
            </option>
          </select>
          {errors.gender && <p className={styles.error}>{errors.gender}</p>}
          <label className={styles.label} htmlFor="pesel">
            Pesel
          </label>
          <input
            className={styles.input}
            type="text"
            id="pesel"
            name="pesel"
            value={formData.pesel}
            onChange={handleChangeWithValidation}
            required
          />
          {errors.pesel && <p className={styles.error}>{errors.pesel}</p>}
          <label className={styles.label} htmlFor="date-of-birth">
            Date of Birth
          </label>
          <input
            className={styles.input}
            type="date"
            id="date-of-birth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChangeWithValidation}
            required
          />
          {errors.dateOfBirth && (
            <p className={styles.error}>{errors.dateOfBirth}</p>
          )}
        </>
      )}

      {step === 3 && (
        <>
          <label className={styles.label} htmlFor="country">
            Country
          </label>
          <input
            className={styles.input}
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChangeWithValidation}
            required
          />
          {errors.country && <p className={styles.error}>{errors.country}</p>}

          <label className={styles.label} htmlFor="city">
            City
          </label>
          <input
            className={styles.input}
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChangeWithValidation}
            required
          />
          {errors.city && <p className={styles.error}>{errors.city}</p>}

          <label className={styles.label} htmlFor="street-with-house-number">
            Street with house number
          </label>
          <input
            className={styles.input}
            type="text"
            id="street-with-house-number"
            name="streetWithHouseNumber"
            value={formData.streetWithHouseNumber}
            onChange={handleChangeWithValidation}
            required
          />
          {errors.streetWithHouseNumber && (
            <p className={styles.error}>{errors.streetWithHouseNumber}</p>
          )}

          <label className={styles.label} htmlFor="post-code">
            Post Code
          </label>
          <input
            className={styles.input}
            type="text"
            id="post-code"
            name="postCode"
            value={formData.postCode}
            onChange={handleChangeWithValidation}
            required
          />
          {errors.postCode && <p className={styles.error}>{errors.postCode}</p>}
        </>
      )}

      {step === 4 && (
        <>
          <label className={styles.label} htmlFor="email">
            Email
          </label>
          <input
            className={styles.input}
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChangeWithValidation}
            required
          />
          {errors.email && <p className={styles.error}>{errors.email}</p>}
          <label className={styles.label} htmlFor="password">
            Password
          </label>
          <input
            className={styles.input}
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChangeWithValidation}
            required
          />
          {errors.password && <p className={styles.error}>{errors.password}</p>}

          <label className={styles.label} htmlFor="confirm-password">
            Confirm Password
          </label>
          <input
            className={styles.input}
            type="password"
            id="confirm-password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChangeWithValidation}
            required
          />
          <label className={styles.label} htmlFor="phone-number">
            Phone Number
          </label>
          <input
            className={styles.input}
            type="text"
            id="phone-number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChangeWithValidation}
            required
          />
          {errors.phoneNumber && (
            <p className={styles.error}>{errors.phoneNumber}</p>
          )}
        </>
      )}

      <div className={styles.buttonContainer}>
        {step > 1 && (
          <button type="button" className={styles.button} onClick={prevStep}>
            Prev
          </button>
        )}
        {step < 4 && (
          <button
            type="button"
            className={styles.button}
            onClick={nextStep}
            disabled={!isStepValid()}
          >
            Next
          </button>
        )}
        {step === 4 && (
          <button
            type="submit"
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
        )}
      </div>
    </form>
  );
};

export default RegistrationForm;
