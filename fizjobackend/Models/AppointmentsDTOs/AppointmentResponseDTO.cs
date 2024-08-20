using fizjobackend.Enums.AppointmentEnums;
using fizjobackend.Entities.AppointmentEntities;
using fizjobackend.Interfaces.DTOInterfaces.UserDTOInterfaces;

namespace fizjobackend.Models.AppointmentsDTOs
{
    public class AppointmentResponseDTO
    {
        public Guid AppointmentId { get; set; }
        public AppointmentStatus AppointmentStatus { get; set; } = AppointmentStatus.Scheduled;
        public Guid PatientId { get; set; }
        public IUserInfoResponseDTO? Patient { get; set; }
        public Guid PhysiotherapistId { get; set; }
        public IUserInfoResponseDTO? Physiotherapist { get; set; }
        public DateTime AppointmentDate { get; set; } = DateTime.Now;
        public DateTime? MovedFromDate { get; set; }
        public string AppointmentDescription { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string? Notes { get; set; }
        public string? Diagnosis { get; set; }
        public bool isPaid { get; set; } = false;

        public AppointmentResponseDTO() { }

        public AppointmentResponseDTO(Appointment appointment, IUserInfoResponseDTO patient, IUserInfoResponseDTO physiotherapist)
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
            isPaid = appointment.isPaid;
        }
    }
}
