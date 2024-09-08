using fizjobackend.Entities.AppointmentEntities;
using fizjobackend.Entities.UserEntities;
using fizjobackend.Models.AccountDTOs;
using fizjobackend.Models.UserDTOs;
using System.ComponentModel.DataAnnotations.Schema;

namespace fizjobackend.Entities.PatientEntities
{
    public class Patient : User
    {
        public string Description { get; set; } = string.Empty;
        public string? HealthInsuranceNumber { get; set; }

        public ICollection<MedicalRaport> MedicalRaports { get; set; } = [];

        [InverseProperty("Patient")]
        public ICollection<Appointment> Appointments { get; set; } = [];

        public Patient() { }
        public Patient(PatientRegisterRequestDTO patient)
        {
            Email = patient.Email;
            FirstName = patient.FirstName;
            LastName = patient.LastName;
            Gender = patient.Gender;
            Country = patient.Country;
            City = patient.City;
            StreetWithHouseNumber = patient.StreetWithHouseNumber;
            PostCode = patient.PostCode;
            Pesel = patient.Pesel;
            DateOfBirth = patient.DateOfBirth;
            HealthInsuranceNumber = patient.HealthInsuranceNumber;
            PhoneNumber = patient.PhoneNumber;
            CreatedDate = DateTime.UtcNow;
        }
    }
}
