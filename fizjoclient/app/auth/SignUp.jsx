// "use client";
// import { useState, useContext } from "react";
// import styles from "./auth.module.scss";
// import { LanguageContext } from "@/app/contexts/lang/langContext";
// import pl from "./locales/pl.json";
// import en from "./locales/en.json";

// const locales = { en, pl };

// const RegistrationForm = ({
//   formData,
//   handleChange,
//   accountType,
//   setAccountType,
//   handleSubmit,
//   loading,
//   error,
// }) => {
//   const [step, setStep] = useState(1);
//   const [errors, setErrors] = useState({});
//   const { language } = useContext(LanguageContext); // Access the current language context
//   const t = locales[language]; // Get the translations for the current language

//   const nextStep = () => setStep(step + 1);
//   const prevStep = () => setStep(step - 1);

//   const validateField = (name, value) => {
//     let error = "";
//     switch (name) {
//       case "firstName":
//       case "lastName":
//         if (!/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+$/.test(value)) {
//           error = t.onlyLetters;
//         }
//         break;
//       case "gender":
//         if (!["male", "female", "other"].includes(value)) {
//           error = t.invalidGender;
//         }
//         break;
//       case "country":
//       case "city":
//         if (!/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+$/.test(value)) {
//           error = t.onlyLetters;
//         }
//         break;
//       case "streetWithHouseNumber":
//         if (!/^[a-zA-Z0-9\sąćęłńóśźżĄĆĘŁŃÓŚŹŻ\/]+$/.test(value)) {
//           error = "Only letters and numbers are allowed";
//         }
//         break;
//       case "postCode":
//         if (!/^\d{2}-\d{3}$/.test(value)) {
//           error = t.invalidPostCode;
//         }
//         break;
//       case "phoneNumber":
//         if (!/^\d{9}$/.test(value)) {
//           error = t.invalidPhoneNumber;
//         }
//         break;
//       case "pesel":
//         if (!/^\d{11}$/.test(value) || !validatePesel(value)) {
//           error = "Invalid PESEL";
//         }
//         break;
//       case "confirmPassword":
//       case "password":
//         if (!validatePassword(value)) {
//           error = t.passwordRequirements;
//         }
//         if (
//           formData.confirmPassword !== "" &&
//           value !== formData.confirmPassword
//         ) {
//           error = t.passwordMismatch;
//         }
//         break;
//       case "dateOfBirth":
//         if (!validateDateOfBirth(value, formData.pesel)) {
//           error = t.dateOfBirthMismatch;
//         }
//         break;
//       default:
//         break;
//     }
//     setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
//   };

//   const validatePesel = (pesel) => {
//     const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
//     const sum = pesel
//       .slice(0, 10)
//       .split("")
//       .reduce((acc, digit, index) => acc + digit * weights[index], 0);
//     const controlDigit = (10 - (sum % 10)) % 10;
//     return controlDigit === parseInt(pesel[10], 10);
//   };

//   const validateDateOfBirth = (dateOfBirth, pesel) => {
//     const year = parseInt(pesel.slice(0, 2), 10);
//     const month = parseInt(pesel.slice(2, 4), 10);
//     const day = parseInt(pesel.slice(4, 6), 10);
//     const fullYear =
//       month > 20
//         ? 2000 + year
//         : month > 80
//         ? 1800 + year
//         : month > 60
//         ? 2200 + year
//         : month > 40
//         ? 2100 + year
//         : month > 20
//         ? 2000 + year
//         : 1900 + year;
//     const formattedDate = `${fullYear}-${String(month % 20).padStart(
//       2,
//       "0"
//     )}-${String(day).padStart(2, "0")}`;
//     return dateOfBirth === formattedDate;
//   };

//   const validatePassword = (password) => {
//     const minLength = 8;
//     const hasNumber = /\d/;
//     const hasLetter = /[a-zA-Z]/;
//     const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

//     return (
//       password.length >= minLength &&
//       hasNumber.test(password) &&
//       hasLetter.test(password) &&
//       hasSpecialChar.test(password)
//     );
//   };

//   const handleChangeWithValidation = (e) => {
//     const { name, value } = e.target;
//     handleChange(e);
//     validateField(name, value);
//   };
//   const isStepValid = () => {
//     switch (step) {
//       case 1:
//         return accountType === "patient"
//           ? formData.insuranceNumber.trim() !== ""
//           : formData.licenseNumber.trim() !== "";
//       case 2:
//         return (
//           formData.firstName.trim() !== "" &&
//           formData.lastName.trim() !== "" &&
//           formData.gender.trim() !== "" &&
//           formData.dateOfBirth.trim() !== "" &&
//           formData.pesel.trim() !== "" &&
//           !errors.firstName &&
//           !errors.lastName &&
//           !errors.gender &&
//           !errors.dateOfBirth &&
//           !errors.pesel
//         );
//       case 3:
//         return (
//           formData.country.trim() !== "" &&
//           formData.city.trim() !== "" &&
//           formData.streetWithHouseNumber.trim() !== "" &&
//           formData.postCode.trim() !== "" &&
//           !errors.country &&
//           !errors.city &&
//           !errors.streetWithHouseNumber &&
//           !errors.postCode
//         );
//       case 4:
//         return (
//           formData.email.trim() !== "" &&
//           formData.password.trim() !== "" &&
//           formData.confirmPassword.trim() !== "" &&
//           formData.phoneNumber.trim() !== "" &&
//           !errors.phoneNumber
//         );
//       default:
//         return false;
//     }
//   };
//   return (
//     <form className={styles.form} onSubmit={(e) => handleSubmit(e, true)}>
//       <h2 className={styles.heading}>{t.signUp}</h2>
//       {error && <p className={styles.error}>{t.error}</p>}

//       {step === 1 && (
//         <>
//           <label className={styles.label} htmlFor="account-type">
//             {t.accountType}
//           </label>
//           <select
//             className={styles.input}
//             id="account-type"
//             name="accountType"
//             value={accountType}
//             onChange={setAccountType}
//             required
//           >
//             <option className={styles.option} value="patient">
//               {t.patient}
//             </option>
//             <option className={styles.option} value="physiotherapist">
//               {t.physiotherapist}
//             </option>
//           </select>

//           {accountType === "patient" && (
//             <>
//               <label className={styles.label} htmlFor="insurance-number">
//                 {t.insuranceNumber}
//               </label>
//               <input
//                 className={styles.input}
//                 type="text"
//                 id="insurance-number"
//                 name="insuranceNumber"
//                 value={formData.insuranceNumber}
//                 onChange={handleChange}
//                 required
//               />
//             </>
//           )}

//           {accountType === "physiotherapist" && (
//             <>
//               <label className={styles.label} htmlFor="license-number">
//                 {t.licenseNumber}
//               </label>
//               <input
//                 className={styles.input}
//                 type="text"
//                 id="license-number"
//                 name="licenseNumber"
//                 value={formData.licenseNumber}
//                 onChange={handleChange}
//                 required
//               />
//             </>
//           )}
//         </>
//       )}

//       {step === 2 && (
//         <>
//           <label className={styles.label} htmlFor="first-name">
//             {t.firstName}
//           </label>
//           <input
//             className={styles.input}
//             type="text"
//             id="first-name"
//             name="firstName"
//             value={formData.firstName}
//             onChange={handleChangeWithValidation}
//             required
//           />
//           {errors.firstName && (
//             <p className={styles.error}>{errors.firstName}</p>
//           )}

//           <label className={styles.label} htmlFor="last-name">
//             {t.lastName}
//           </label>
//           <input
//             className={styles.input}
//             type="text"
//             id="last-name"
//             name="lastName"
//             value={formData.lastName}
//             onChange={handleChangeWithValidation}
//             required
//           />
//           {errors.lastName && <p className={styles.error}>{errors.lastName}</p>}

//           <label className={styles.label} htmlFor="gender">
//             {t.gender}
//           </label>
//           <select
//             className={styles.input}
//             id="gender"
//             name="gender"
//             value={formData.gender}
//             onChange={handleChangeWithValidation}
//             required
//           >
//             <option className={styles.option} value="male">
//               {t.male}
//             </option>
//             <option className={styles.option} value="female">
//               {t.female}
//             </option>
//             <option className={styles.option} value="other">
//               {t.other}
//             </option>
//           </select>
//           {errors.gender && <p className={styles.error}>{errors.gender}</p>}
//           <label className={styles.label} htmlFor="pesel">
//             {t.pesel}
//           </label>
//           <input
//             className={styles.input}
//             type="text"
//             id="pesel"
//             name="pesel"
//             value={formData.pesel}
//             onChange={handleChangeWithValidation}
//             required
//           />
//           {errors.pesel && <p className={styles.error}>{errors.pesel}</p>}
//           <label className={styles.label} htmlFor="date-of-birth">
//             {t.dateOfBirth}
//           </label>
//           <input
//             className={styles.input}
//             type="date"
//             id="date-of-birth"
//             name="dateOfBirth"
//             value={formData.dateOfBirth}
//             onChange={handleChangeWithValidation}
//             required
//           />
//           {errors.dateOfBirth && (
//             <p className={styles.error}>{errors.dateOfBirth}</p>
//           )}
//         </>
//       )}

//       {step === 3 && (
//         <>
//           <label className={styles.label} htmlFor="country">
//             {t.country}
//           </label>
//           <input
//             className={styles.input}
//             type="text"
//             id="country"
//             name="country"
//             value={formData.country}
//             onChange={handleChangeWithValidation}
//             required
//           />
//           {errors.country && <p className={styles.error}>{errors.country}</p>}

//           <label className={styles.label} htmlFor="city">
//             {t.city}
//           </label>
//           <input
//             className={styles.input}
//             type="text"
//             id="city"
//             name="city"
//             value={formData.city}
//             onChange={handleChangeWithValidation}
//             required
//           />
//           {errors.city && <p className={styles.error}>{errors.city}</p>}

//           <label className={styles.label} htmlFor="street-with-house-number">
//             {t.streetWithHouseNumber}
//           </label>
//           <input
//             className={styles.input}
//             type="text"
//             id="street-with-house-number"
//             name="streetWithHouseNumber"
//             value={formData.streetWithHouseNumber}
//             onChange={handleChangeWithValidation}
//             required
//           />
//           {errors.streetWithHouseNumber && (
//             <p className={styles.error}>{errors.streetWithHouseNumber}</p>
//           )}

//           <label className={styles.label} htmlFor="post-code">
//             {t.postCode}
//           </label>
//           <input
//             className={styles.input}
//             type="text"
//             id="post-code"
//             name="postCode"
//             value={formData.postCode}
//             onChange={handleChangeWithValidation}
//             required
//           />
//           {errors.postCode && <p className={styles.error}>{errors.postCode}</p>}
//         </>
//       )}

//       {step === 4 && (
//         <>
//           <label className={styles.label} htmlFor="email">
//             {t.email}
//           </label>
//           <input
//             className={styles.input}
//             type="email"
//             id="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChangeWithValidation}
//             required
//           />
//           {errors.email && <p className={styles.error}>{errors.email}</p>}
//           <label className={styles.label} htmlFor="password">
//             {t.password}
//           </label>
//           <input
//             className={styles.input}
//             type="password"
//             id="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChangeWithValidation}
//             required
//           />
//           {errors.password && <p className={styles.error}>{errors.password}</p>}

//           <label className={styles.label} htmlFor="confirm-password">
//             {t.confirmPassword}
//           </label>
//           <input
//             className={styles.input}
//             type="password"
//             id="confirm-password"
//             name="confirmPassword"
//             value={formData.confirmPassword}
//             onChange={handleChangeWithValidation}
//             required
//           />
//           <label className={styles.label} htmlFor="phone-number">
//             {t.phoneNumber}
//           </label>
//           <input
//             className={styles.input}
//             type="text"
//             id="phone-number"
//             name="phoneNumber"
//             value={formData.phoneNumber}
//             onChange={handleChangeWithValidation}
//             required
//           />
//           {errors.phoneNumber && (
//             <p className={styles.error}>{errors.phoneNumber}</p>
//           )}
//         </>
//       )}

//       <div className={styles.buttonContainer}>
//         {step > 1 && (
//           <button type="button" className={styles.button} onClick={prevStep}>
//             {t.prev}
//           </button>
//         )}
//         {step < 4 && (
//           <button
//             type="button"
//             className={styles.button}
//             onClick={nextStep}
//             disabled={!isStepValid()}
//           >
//             {t.next}
//           </button>
//         )}
//         {step === 4 && (
//           <button
//             type="submit"
//             className={styles.submitButton}
//             disabled={loading}
//           >
//             {loading ? t.loading : t.signUp}
//           </button>
//         )}
//       </div>
//     </form>
//   );
// };

// export default RegistrationForm;

"use client";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import styles from "./auth.module.scss";
import { LanguageContext } from "@/app/contexts/lang/langContext";
import pl from "./locales/pl.json";
import en from "./locales/en.json";

const locales = { en, pl };

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
  const [success, setSuccess] = useState(false); // Dodano obsługę sukcesu
  const router = useRouter(); // Router dla przekierowania
  const { language } = useContext(LanguageContext); // Kontekst języka
  const t = locales[language];

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "firstName":
      case "lastName":
        if (!/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+$/.test(value)) {
          error = t.onlyLetters;
        }
        break;
      case "gender":
        if (!["male", "female", "other"].includes(value)) {
          error = t.invalidGender;
        }
        break;
      case "country":
      case "city":
        if (!/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+$/.test(value)) {
          error = t.onlyLetters;
        }
        break;
      case "streetWithHouseNumber":
        if (!/^[a-zA-Z0-9\sąćęłńóśźżĄĆĘŁŃÓŚŹŻ\/]+$/.test(value)) {
          error = "Only letters and numbers are allowed";
        }
        break;
      case "postCode":
        if (!/^\d{2}-\d{3}$/.test(value)) {
          error = t.invalidPostCode;
        }
        break;
      case "phoneNumber":
        if (!/^\d{9}$/.test(value)) {
          error = t.invalidPhoneNumber;
        }
        break;
      case "pesel":
        if (!/^\d{11}$/.test(value) || !validatePesel(value)) {
          error = "Invalid PESEL";
        }
        break;
      case "confirmPassword":
      case "password":
        if (!validatePassword(value)) {
          error = t.passwordRequirements;
        }
        if (
          formData.confirmPassword !== "" &&
          value !== formData.confirmPassword
        ) {
          error = t.passwordMismatch;
        }
        break;
      case "dateOfBirth":
        if (!validateDateOfBirth(value, formData.pesel)) {
          error = t.dateOfBirthMismatch;
        }
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const validatePesel = (pesel) => {
    const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
    const sum = pesel
      .slice(0, 10)
      .split("")
      .reduce((acc, digit, index) => acc + digit * weights[index], 0);
    const controlDigit = (10 - (sum % 10)) % 10;
    return controlDigit === parseInt(pesel[10], 10);
  };

  const validateDateOfBirth = (dateOfBirth, pesel) => {
    const year = parseInt(pesel.slice(0, 2), 10);
    const month = parseInt(pesel.slice(2, 4), 10);
    const day = parseInt(pesel.slice(4, 6), 10);
    const fullYear =
      month > 20
        ? 2000 + year
        : month > 80
        ? 1800 + year
        : month > 60
        ? 2200 + year
        : month > 40
        ? 2100 + year
        : month > 20
        ? 2000 + year
        : 1900 + year;
    const formattedDate = `${fullYear}-${String(month % 20).padStart(
      2,
      "0"
    )}-${String(day).padStart(2, "0")}`;
    return dateOfBirth === formattedDate;
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const hasNumber = /\d/;
    const hasLetter = /[a-zA-Z]/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

    return (
      password.length >= minLength &&
      hasNumber.test(password) &&
      hasLetter.test(password) &&
      hasSpecialChar.test(password)
    );
  };

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

  const onFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleSubmit(e, true);
      setSuccess(true);
      setTimeout(() => router.push("auth/LoginForm"), 3000);
    } catch (err) {
      console.error("Registration error:", err);
    }
  };

  return (
    <form className={styles.form} onSubmit={onFormSubmit}>
      <h2 className={styles.heading}>{t.signUp}</h2>
      {error && <p className={styles.error}>{error}</p>}
      {success && (
        <p className={styles.success}>
          {t.registrationSuccess} {t.welcomeMessage}
        </p>
      )}

      {step === 1 && (
        <>
          <label className={styles.label} htmlFor="account-type">
            {t.accountType}
          </label>
          <select
            className={styles.input}
            id="account-type"
            name="accountType"
            value={accountType}
            onChange={(e) => setAccountType(e.target.value)}
            required
          >
            <option className={styles.option} value="null">
              {""}
            </option>
            <option className={styles.option} value="patient">
              {t.patient}
            </option>
            <option className={styles.option} value="physiotherapist">
              {t.physiotherapist}
            </option>
          </select>
          {accountType === "patient" && (
            <>
              <label className={styles.label} htmlFor="insurance-number">
                {t.insuranceNumber}
              </label>
              <input
                className={styles.input}
                type="text"
                id="insurance-number"
                name="insuranceNumber"
                value={formData.insuranceNumber || ""}
                onChange={handleChangeWithValidation}
                required
              />
            </>
          )}
          {accountType === "physiotherapist" && (
            <>
              <label className={styles.label} htmlFor="license-number">
                {t.licenseNumber}
              </label>
              <input
                className={styles.input}
                type="text"
                id="license-number"
                name="licenseNumber"
                value={formData.licenseNumber || ""}
                onChange={handleChangeWithValidation}
                required
              />
            </>
          )}
        </>
      )}

      {step === 2 && (
        <>
          <label className={styles.label} htmlFor="first-name">
            {t.firstName}
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
            {t.lastName}
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
            {t.gender}
          </label>
          <select
            className={styles.input}
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChangeWithValidation}
            required
          >
            <option className={styles.option} value="null">
              {" "}
            </option>
            <option className={styles.option} value="male">
              {t.male}
            </option>
            <option className={styles.option} value="female">
              {t.female}
            </option>
            <option className={styles.option} value="other">
              {t.other}
            </option>
          </select>
          {errors.gender && <p className={styles.error}>{errors.gender}</p>}
          <label className={styles.label} htmlFor="pesel">
            {t.pesel}
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
            {t.dateOfBirth}
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
            {t.country}
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
            {t.city}
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
            {t.streetWithHouseNumber}
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
            {t.postCode}
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
            {t.email}
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
            {t.password}
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
            {t.confirmPassword}
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
            {t.phoneNumber}
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
            {t.prev}
          </button>
        )}
        {step < 4 && (
          <button
            type="button"
            className={styles.button}
            onClick={nextStep}
            disabled={!isStepValid()}
          >
            {t.next}
          </button>
        )}
        {step === 4 && (
          <button
            type="submit"
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? t.loading : t.signUp}
          </button>
        )}
      </div>
    </form>
  );
};

export default RegistrationForm;
