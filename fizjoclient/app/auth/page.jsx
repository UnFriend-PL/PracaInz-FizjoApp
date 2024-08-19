"use client";
import { useState, useContext } from "react";
import styles from "./auth.module.scss";
import LoginForm from "./LoginForm";
import RegistrationForm from "./SignUp";
import apiService from "../services/apiService/apiService";
import { AuthContext } from "../contexts/auth/authContext";

const AuthPage = () => {
  const { login } = useContext(AuthContext);
  const [isRegistering, setIsRegistering] = useState(false);
  const [accountType, setAccountType] = useState("patient");
  const [signUpData, setSignUpData] = useState({
    // Patient fields
    insuranceNumber: "",
    // Physiotherapist fields
    licenseNumber: "",
    // Shared fields
    firstName: "",
    lastName: "",
    gender: "",
    pesel: "",
    country: "",
    city: "",
    streetWithHouseNumber: "",
    postCode: "",
    dateOfBirth: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignUpChange = (e) => {
    const { name, value } = e.target;
    setSignUpData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event, isRegistering) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const url = isRegistering
        ? accountType === "patient"
          ? "/Account/RegisterPatient"
          : "/Account/RegisterPhysiotherapist"
        : "/Account/Login";
      const response = await apiService.post(
        url,
        isRegistering ? signUpData : loginData
      );

      if (response.success) {
        console.log(response.data);
        login(response.data);
      } else {
        const errorData = response;
        setError(errorData.message || "An error occurred");
      }
    } catch (error) {
      setError(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        {isRegistering ? (
          <RegistrationForm
            formData={signUpData}
            handleChange={handleSignUpChange}
            handleSubmit={handleSubmit}
            accountType={accountType}
            setAccountType={(e) => setAccountType(e.target.value)}
            loading={loading}
            error={error}
          />
        ) : (
          <LoginForm
            formData={loginData}
            handleChange={handleLoginChange}
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
  );
};

export default AuthPage;
