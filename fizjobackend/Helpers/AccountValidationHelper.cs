using fizjobackend.Entities.UserEntities;
using fizjobackend.Models.AccountDTOs;
using System.Globalization;
using System.Text.RegularExpressions;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace fizjobackend.Helpers
{
    internal class AccountValidationHelper
    {
        private User _user;

        public AccountValidationHelper(User user)
        {
            _user = user;
        }

        string[] errors = [];

        public bool Validate(out string[] errors)
        {

            try
            {

                ValidateAndFormatName(_user.FirstName);
                ValidateAndFormatName(_user.LastName);
                ValidateGender(_user.Gender);
                ValidateEmail(_user.Email);
                ValidatePesel(_user.Pesel);
                ValidateDateOfBirth(_user.DateOfBirth);
                ValidatePhoneNumber(_user.PhoneNumber);
                errors = this.errors;
                if(errors != null)
                {
                    return false;
                }
                return true;
            }
            catch (ArgumentException ex)
            {
                errors = [ex.Message];
                return false;
            }
        }

        private void ValidateAndFormatName(string name)
        {
            if (!Regex.IsMatch(name, @"^[a-zA-Z]+$"))
            {
                errors.Append("Name must contain only letters and no numbers.") ;
            }
        }

        private void ValidateGender(string gender)
        {
            //enum
            gender.ToLower();
            string[] validGenders = { "female", "male", "other" };
            if (!Array.Exists(validGenders, g => g.Equals(gender, StringComparison.OrdinalIgnoreCase)))
            {
                errors.Append("Gender must be either 'female', 'male', or 'other'.");
            }

        }

        private void ValidateEmail(string email)
        {
            if (!Regex.IsMatch(email, @"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"))
            {
                errors.Append("Email must be valid and contain a domain.");
            }
        }

        private void ValidatePesel(string pesel)
        {
            if (pesel.Length != 11 && !Regex.IsMatch(pesel, @"^\d+$"))
            {
                errors.Append("Pesel must be a string of 11 digits.");
            }
            //suma kontrolna
        }

        private void ValidateDateOfBirth(DateTime dateOfBirth)
        {
            if (dateOfBirth > DateTime.Now)
            {
                errors.Append("Date of Birth cannot be in the future.");
            }
        }

        private void ValidatePhoneNumber(string phoneNumber)
        {
            if (phoneNumber.Length <= 11 && !Regex.IsMatch(phoneNumber, @"^\d+$"))
            {
                errors.Append("Phone number must be a string of up to 11 digits.");
            }
        }
    }
}
