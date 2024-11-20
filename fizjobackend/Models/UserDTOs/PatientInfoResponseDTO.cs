using Fizjobackend.Entities.PatientEntities;
using Fizjobackend.Entities.UserEntities;

namespace Fizjobackend.Models.UserDTOs
{
    public class PatientInfoResponseDTO : IUserInfoResponseDTO
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Gender { get; set; } = string.Empty;
        public string Country { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string StreetWithHouseNumber { get; set; } = string.Empty;
        public string PostCode { get; set; } = string.Empty;
        public string Pesel { get; set; } = string.Empty;
        public DateTime DateOfBirth { get; set; }
        public string Email { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public string HealthInsuranceNumber { get; set; } = string.Empty;
        public string AvatarPath { get; set; } = string.Empty;

        public PatientInfoResponseDTO() { }

        public PatientInfoResponseDTO(Patient patient)
        {
            Id = patient.Id;
            FirstName = patient.FirstName;
            LastName = patient.LastName;
            Gender = patient.Gender;
            Country = patient.Country;
            City = patient.City;
            StreetWithHouseNumber = patient.StreetWithHouseNumber;
            PostCode = patient.PostCode;
            Pesel = patient.Pesel;
            DateOfBirth = patient.DateOfBirth;
            Email = patient.Email;
            PhoneNumber = patient.PhoneNumber;
            HealthInsuranceNumber = patient.HealthInsuranceNumber;
            AvatarPath = patient.AvatarPath;
        }
    }
}
