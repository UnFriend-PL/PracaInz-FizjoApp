namespace fizjobackend.Models.AppointmentsDTOs
{
    public class EditAppointmentRequestDTO
    {
        public string AppointmentDescription { get; set; } = string.Empty;
        public DateTime AppointmentDate { get; set; }
        public string? Notes { get; set; }
        public string? Diagnosis { get; set; }
        public bool IsPaid { get; set; } = false;
        public double Price { get; set; }
    }
}
