using fizjobackend.Entities.UserEntities;
using fizjobackend.Enums.UserEnums;
using fizjobackend.Interfaces.HelpersInterfaces;
using System.Text.RegularExpressions;

namespace fizjobackend.Helpers
{
    internal class AccountValidationHelper : IAccountValidationHelper
    {
        private static int[] peselArray;

        public string[] Validate(User user)
        {
            var errors = new List<string>();

            try
            {
                AddErrorIfExists(errors, ValidateAndFormatName(user.FirstName, user.LastName));
                AddErrorIfExists(errors, ValidateGender(user.Gender));
                AddErrorIfExists(errors, ValidateEmail(user.Email!));
                AddErrorIfExists(errors, ValidatePesel(user.Pesel));
                AddErrorIfExists(errors, ValidateDateOfBirth(user.DateOfBirth));
                AddErrorIfExists(errors, ValidatePhoneNumber(user.PhoneNumber!));
            }
            catch (Exception ex)
            {
                errors.Add(ex.Message);
            }

            return errors.ToArray();
        }

        private void AddErrorIfExists(List<string> errors, string? error)
        {
            if (!string.IsNullOrEmpty(error))
            {
                errors.Add(error);
            }
        }

        private static string? ValidateAndFormatName(string firstName, string lastName)
        {
            if (ContainsDigits(firstName) || ContainsDigits(lastName))
            {
                return "Name must contain only letters and no numbers.";
            }
            return null;
        }

        private static bool ContainsDigits(string input)
        {
            return Regex.IsMatch(input, @"\d");
        }

        private static string? ValidateGender(string gender)
        {
            if (!Enum.TryParse<RegisterTypeOfGender>(gender, true, out _))
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
            if (!Regex.IsMatch(pesel, @"^\d{11}$"))
            {
                return "Pesel must be a string of 11 digits.";
            }

            peselArray = pesel.Select(d => d - '0').ToArray();
            int[] weights = { 1, 3, 7, 9, 1, 3, 7, 9, 1, 3 };
            int checksum = CalculateChecksum(peselArray, weights);

            if (checksum != peselArray[10])
            {
                return "Checksum does not match, correct pesel";
            }
            return null;
        }

        private static int CalculateChecksum(int[] peselArray, int[] weights)
        {
            int sum = peselArray.Take(10).Select((digit, index) => digit * weights[index]).Sum();
            int controlDigit = (10 - (sum % 10)) % 10;
            return controlDigit;
        }

        private static string? ValidateDateOfBirth(DateTime dateOfBirth)
        {
            int year = GetYearFromPesel(dateOfBirth.Year);
            int month = GetMonthFromPesel(dateOfBirth.Year);
            int day = (peselArray[4] * 10) + peselArray[5];

            if (year != dateOfBirth.Year || month != dateOfBirth.Month || day != dateOfBirth.Day)
            {
                return "Date of birth is different from pesel";
            }

            if (dateOfBirth > DateTime.Now)
            {
                return "Date of Birth cannot be in the future.";
            }
            return null;
        }

        private static int GetYearFromPesel(int year)
        {
            int baseYear = year >= 2000 ? 2000 : 1900;
            return baseYear + (peselArray[0] * 10) + peselArray[1];
        }

        private static int GetMonthFromPesel(int year)
        {
            int monthOffset = year >= 2000 ? 20 : 0;
            return (peselArray[2] * 10) + peselArray[3] - monthOffset;
        }

        private static string? ValidatePhoneNumber(string phoneNumber)
        {
            if (!Regex.IsMatch(phoneNumber, @"^\d{9}$"))
            {
                return "Phone number must be a string of 9 digits.";
            }
            return null;
        }
    }
}
