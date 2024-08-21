namespace fizjobackend.Models.AppointmentsDTOs
{
    public class CreateAppointmentRequestDTO
    {
        public Guid PatientId { get; set; }
        public Guid PhysiotherapistId { get; set; }
        public DateTime AppointmentDate { get; set; }
        public string AppointmentDescription { get; set; } = string.Empty;
        public string? Notes { get; set; }
        public string? Diagnosis { get; set; }
        public bool isPaid { get; set; } = false;
        public double Price { get; set; }
    }
}
