namespace fizjobackend.Models.StaffDTOs
{
    public class UpdateStaffInfoResponseDTO
    {
        public string? Description { get; set; }
        public int? Rating { get; set; }
        public int? YearsOfExperience { get; set; }
        public double? AveragePrice { get; set; }
        public int? NumberOfDoneAppointments { get; set; }
        public string? Education { get; set; }
    }
}
