using Fizjobackend.Entities.AppointmentEntities;
using Fizjobackend.Entities.OpinionEntities;
using Fizjobackend.Entities.UserEntities;
using Fizjobackend.Models.AccountDTOs;
using System.ComponentModel.DataAnnotations.Schema;
using Fizjobackend.Entities.AppointmentEntities;
using Fizjobackend.Entities.UserEntities;
using Fizjobackend.Models.AccountDTOs;

namespace Fizjobackend.Entities.PatientEntities
{
    public class Patient : User
    {
        public string Description { get; set; } = string.Empty;
        public string? HealthInsuranceNumber { get; set; }

        public ICollection<MedicalRaport> MedicalRaports { get; set; } = [];

        [InverseProperty("Patient")]
        public ICollection<Appointment> Appointments { get; set; } = [];
        public ICollection<Opinion>Opinions { get; set; } = [];
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
            HealthInsuranceNumber = patient.InsuranceNumber;
            PhoneNumber = patient.PhoneNumber;
            CreatedDate = DateTime.UtcNow;
        }
    }
}
