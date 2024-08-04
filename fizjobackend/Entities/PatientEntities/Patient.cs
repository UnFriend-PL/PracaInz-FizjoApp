using fizjobackend.Entities.AppointmentEntities;
using fizjobackend.Entities.UserEntities;
using fizjobackend.Models.AccountDTOs;
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
        public Patient(PatientRegisterDTO patient)
        {
            Email = patient.Email;
            FirstName = patient.FirstName;
            LastName = patient.LastName;
            Gender = patient.Gender;
            Address = patient.Address;
            Pesel = patient.Pesel;
            DateOfBirth = patient.DateOfBirth;
            Address = patient.Address;
            HealthInsuranceNumber = patient.InsuranceNumber;
            PhoneNumber = patient.PhoneNumber;
            CreatedDate = DateTime.UtcNow;
        }
    }
}
