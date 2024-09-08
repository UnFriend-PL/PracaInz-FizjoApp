// validation.jsx
export const validateField = (name, value, formData = {}) => {
  let error = "";
  switch (name) {
    case "firstName":
    case "lastName":
      if (!/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+$/.test(value)) {
        error = "Only letters are allowed";
      }
      break;
    case "gender":
      if (!["male", "female", "other"].includes(value)) {
        error = "Invalid gender";
      }
      break;
    case "country":
    case "city":
      if (!/^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+$/.test(value)) {
        error = "Only letters are allowed";
      }
      break;
    case "streetWithHouseNumber":
      if (!/^[a-zA-Z0-9\sąćęłńóśźżĄĆĘŁŃÓŚŹŻ\/]+$/.test(value)) {
        error = "Only letters and numbers are allowed";
      }
      break;
    case "postCode":
      if (!/^\d{2}-\d{3}$/.test(value)) {
        error = "Invalid post code format";
      }
      break;
    case "phoneNumber":
      if (!/^\d{9}$/.test(value)) {
        error = "Phone number must be 9 digits";
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
        error =
          "Password must contain at least 1 letter, 1 number, and 1 special character";
      }
      if (
        formData.confirmPassword !== "" &&
        value !== formData.confirmPassword
      ) {
        error = "Passwords do not match";
      }
      break;
    case "dateOfBirth":
      if (!validateDateOfBirth(value, formData.pesel)) {
        error = "Date of birth does not match PESEL";
      }
      break;
    case "email":
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error = "Invalid email address";
      }

    default:
      break;
  }
  return error;
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
  if (!pesel || pesel.length !== 11) {
    // Jeśli PESEL jest niezdefiniowany lub jego długość nie wynosi 11 znaków, zwróć false lub odpowiedni komunikat błędu.
    return true;
  }
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
