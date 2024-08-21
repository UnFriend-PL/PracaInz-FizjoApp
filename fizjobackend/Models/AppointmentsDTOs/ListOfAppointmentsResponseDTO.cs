namespace fizjobackend.Models.AppointmentsDTOs
{
    public class ListOfAppointmentsResponseDTO
    {
        public List<AppointmentInListResponseDTO> Appointments { get; set; } = new();
        public int TotalPages { get; set; }
        public int CurrentPage { get; set; }
        public int TotalAppointments { get; set; }
    }
}
