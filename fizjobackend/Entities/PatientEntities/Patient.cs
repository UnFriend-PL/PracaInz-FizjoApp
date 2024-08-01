using fizjobackend.Entities.AppointmentEntities;
using fizjobackend.Entities.UserEntities;
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
    }
}
