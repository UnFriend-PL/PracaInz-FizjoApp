using fizjobackend.Enums.AppointmentEnums;
using fizjobackend.Entities.AppointmentEntities;

namespace fizjobackend.Models.AppointmentsDTOs
{
    public class AppointmentResponseDTO
    {
        public Guid AppointmentId { get; set; }
        public AppointmentStatus AppointmentStatus { get; set; } = AppointmentStatus.Scheduled;
        public string AppointmentStatusName => AppointmentStatus.ToString(); 
        public Guid PatientId { get; set; }
        public PatientAppointmentDetailResponseDTO Patient { get; set; }
        public Guid PhysiotherapistId { get; set; }
        public PhysiotherapistAppointmentResponseDTO Physiotherapist { get; set; }
        public DateTime AppointmentDate { get; set; } = DateTime.Now;
        public DateTime? MovedFromDate { get; set; }
        public string AppointmentDescription { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string? Notes { get; set; }
        public string? Diagnosis { get; set; }
        public bool IsPaid { get; set; } = false;
        public double Price { get; set; }
        public int? PainLevelBeofore { get; set; }
        public int? PainLevelAfter { get; set; }
        public string InitialCondition { get; set; } = string.Empty;

        public AppointmentResponseDTO() { }

        public AppointmentResponseDTO(Appointment appointment, PatientAppointmentDetailResponseDTO patient, PhysiotherapistAppointmentResponseDTO physiotherapist)
        {
            AppointmentId = appointment.AppointmentId;
            AppointmentStatus = appointment.AppointmentStatus;
            PatientId = appointment.PatientId;
            Patient = patient;
            PhysiotherapistId = appointment.PhysiotherapistId;
            Physiotherapist = physiotherapist;
            AppointmentDate = appointment.AppointmentDate;
            MovedFromDate = appointment.MovedFromDate;
            AppointmentDescription = appointment.AppointmentDescription;
            Description = appointment.Description;
            Notes = appointment.Notes;
            Diagnosis = appointment.Diagnosis;
            IsPaid = appointment.IsPaid;
            Price = appointment.Price;
            PainLevelBeofore = appointment.PainLevelBeofore;
            PainLevelAfter = appointment.PainLevelAfter;
            InitialCondition = appointment.InitialCondition;
        }
    }
}
