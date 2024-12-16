namespace Fizjobackend.Models.AppointmentsDTOs;

public class WorkingHoursRequestDTO
{
    public Guid PhysiotherapistId { get; set; }
    public DateTime Date { get; set; }
}