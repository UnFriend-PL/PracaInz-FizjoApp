using fizjobackend.Models.AppointmentsDTOs;

namespace fizjobackend.Models.AccountDTOs
{
    public class ListOfAppointmentsResponseDTO
    {
        public List<AppointmentResponseDTO> Appointments { get; set; } = new();
        public int TotalPages { get; set; }
        public int CurrentPage { get; set; }
        public int TotalAppointments { get; set; }
    }
}
