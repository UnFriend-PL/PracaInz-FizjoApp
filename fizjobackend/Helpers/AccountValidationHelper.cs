using fizjobackend.Entities.UserEntities;
using System.Text.RegularExpressions;

namespace fizjobackend.Helpers
{
    internal static class AccountValidationHelper // static dlatego, ze lepiej uzywac static jesli bedziemy jedynie korzystac z metod w niej zawartych
    {
        // Dodaj interfejs i uzywaj interfejsóW przy wywoływaniu walidacji!!
        public static string[] Validate(User user)
        {
            var errors = new List<string>();

            try
            {
                var error = ValidateAndFormatName(user.FirstName);
                if (error != null) errors.Add(error);
                error = ValidateGender(user.Gender);
                if (error != null) errors.Add(error);
                error = ValidateEmail(user.Email!);
                if (error != null) errors.Add(error);
                error = ValidatePesel(user.Pesel);
                if (error != null) errors.Add(error);
                error = ValidateDateOfBirth(user.DateOfBirth);
                if (error != null) errors.Add(error);
                error = ValidatePhoneNumber(user.PhoneNumber!);
                if (error != null) errors.Add(error);
                return errors.ToArray();
            }
            catch (Exception ex)
            {
                return [ex.Message];
            }
        }

        private static string? ValidateAndFormatName(string name)
        {
            if (!Regex.IsMatch(name, @"^[a-zA-Z]+$"))
            {
                return "Name must contain only letters and no numbers.";
            }
            return null;
        }

        private static string? ValidateGender(string gender)
        {
            //enum
            gender.ToLower();
            string[] validGenders = { "female", "male", "other" };
            if (!Array.Exists(validGenders, g => g.Equals(gender, StringComparison.OrdinalIgnoreCase)))
            {
                return "Gender must be either 'female', 'male', or 'other'.";
            }
            return null;
        }

        private static string? ValidateEmail(string email)
        {
            if (!Regex.IsMatch(email, @"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"))
            {
                return "Email must be valid and contain a domain.";
            }
            return null;
        }

        private static string? ValidatePesel(string pesel)
        {
            if (pesel.Length != 11 && !Regex.IsMatch(pesel, @"^\d+$"))
            {
                return "Pesel must be a string of 11 digits.";
            }
            //suma kontrolna
            return null;
        }

        private static string? ValidateDateOfBirth(DateTime dateOfBirth)
        {
            if (dateOfBirth > DateTime.Now)
            {
                return "Date of Birth cannot be in the future.";
            }
            return null;
        }

        private static string? ValidatePhoneNumber(string phoneNumber)
        {
            if (phoneNumber.Length <= 11 && !Regex.IsMatch(phoneNumber, @"^\d+$"))
            {
                return "Phone number must be a string of up to 11 digits.";
            }
            return null;
        }
    }
}
