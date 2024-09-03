using fizjobackend.Enums.AppointmentEnums;
using fizjobackend.Entities.AppointmentEntities;
using fizjobackend.Entities.UserEntities;

namespace fizjobackend.Models.AppointmentsDTOs
{
    public class AppointmentInListResponseDTO
    {
        public Guid AppointmentId { get; set; }
        public AppointmentStatus AppointmentStatus { get; set; } = AppointmentStatus.Scheduled;
        public Guid PatientId { get; set; }
        public string PatientFirstName { get; set; } = string.Empty;
        public string PatientLastName { get; set; } = string.Empty;
        public Guid PhysiotherapistId { get; set; }
        public string PhysiotherapistFirstName { get; set; } = string.Empty;
        public string PhysiotherapistLastName { get; set; } = string.Empty;
        public DateTime AppointmentDate { get; set; } = DateTime.Now;
        public DateTime? MovedFromDate { get; set; }
        public bool IsPaid { get; set; } = false;
        public double Price { get; set; }

        public AppointmentInListResponseDTO() { }

        public AppointmentInListResponseDTO(Appointment appointment, User patient, User physiotherapist)
        {
            AppointmentId = appointment.AppointmentId;
            AppointmentStatus = appointment.AppointmentStatus;
            PatientId = appointment.PatientId;
            PatientFirstName = patient.FirstName;
            PatientLastName = patient.LastName;
            PhysiotherapistId = appointment.PhysiotherapistId;
            PhysiotherapistFirstName = physiotherapist.FirstName;
            PhysiotherapistLastName = physiotherapist.LastName;
            AppointmentDate = appointment.AppointmentDate;
            MovedFromDate = appointment.MovedFromDate;
            IsPaid = appointment.IsPaid;
            Price = appointment.Price;
        }
    }
}
