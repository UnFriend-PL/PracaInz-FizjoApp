using fizjobackend.Entities.PatientEntities;
using fizjobackend.Entities.PhysiotherapistEntities;
using fizjobackend.Enums.AppointmentEnums;
using System.ComponentModel.DataAnnotations.Schema;
using fizjobackend.Models.AppointmentsDTOs;

namespace fizjobackend.Entities.AppointmentEntities
{
    public class Appointment
    {
        public Guid AppointmentId { get; set; }
        public AppointmentStatus AppointmentStatus { get; set; } = AppointmentStatus.Scheduled;
        public virtual Patient Patient { get; set; }
        [ForeignKey("PatientId")]
        public Guid PatientId { get; set; }
        public virtual Physiotherapist Physiotherapist { get; set; }
        [ForeignKey("PhysiotherapistId")]
        public Guid PhysiotherapistId { get; set; }
        public DateTime AppointmentDate { get; set; } = DateTime.Now;
        public DateTime? MovedFromDate { get; set; }
        public string AppointmentDescription { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string? Notes { get; set; }
        public string? Diagnosis { get; set; }
        public bool IsPaid { get; set; } = false;
        public double Price { get; set; } = 0;
        public int? PainLevelBeofore { get; set; }
        public int? PainLevelAfter { get; set; }
        public string InitialCondition { get; set; } = string.Empty;
        public ICollection<AppointmentBodyDetails> AppointmentBodyDetails { get; set; }
        public Appointment() { }

        public Appointment(CreateAppointmentRequestDTO appointment)
        {
            PatientId = appointment.PatientId;
            PhysiotherapistId = appointment.PhysiotherapistId;
            AppointmentDate = appointment.AppointmentDate;
            AppointmentDescription = appointment.AppointmentDescription;
            Notes = appointment.Notes;
            Diagnosis = appointment.Diagnosis;
            IsPaid = appointment.isPaid;
            Price = appointment.Price;
        }
    }
}
