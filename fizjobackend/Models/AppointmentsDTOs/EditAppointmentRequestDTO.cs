using Fizjobackend.Enums.AppointmentEnums;

namespace Fizjobackend.Models.AppointmentsDTOs
{
    public class EditAppointmentRequestDTO
    {
        public string AppointmentDescription { get; set; } = string.Empty;
        public DateTime AppointmentDate { get; set; } = default;
        public string? Notes { get; set; }
        public string? Diagnosis { get; set; }
        public bool IsPaid { get; set; } = false;
        public double Price { get; set; }
        public AppointmentStatus? Status { get; set; }
    }
}
