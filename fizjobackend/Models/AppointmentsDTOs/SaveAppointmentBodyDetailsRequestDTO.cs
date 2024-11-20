namespace Fizjobackend.Models.AppointmentsDTOs
{
    public class SaveAppointmentBodyDetailsRequestDTO
    {
        public List<AppointmentBodyDetail> BodyDetails { get; set; }
    }

    public class AppointmentBodyDetail
    {
        public int BodySectionId { get; set; }
        public int ViewId { get; set; }
        public int? MuscleId { get; set; }
        public int? JointId { get; set; }
        public string BodySide { get; set; }
    }
}
