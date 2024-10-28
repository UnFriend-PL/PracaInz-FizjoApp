using fizjobackend.Enums.AppointmentEnums;

namespace fizjobackend.Models.AppointmentsDTOs
{
    public class ListOfAppointmentsRequestDTO
    {
        public AppointmentStatus Status { get; set;} = AppointmentStatus.Scheduled;
        public int Page { get; set; } = 0;
        public DateTime? Date { get; set; } = default;
        public string? PatientId { get; set; } = string.Empty;
    }
}
