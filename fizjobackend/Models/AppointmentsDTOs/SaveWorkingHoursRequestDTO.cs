
namespace Fizjobackend.Models.AppointmentsDTOs;

public class SaveWorkingHoursRequestDTO
{
    public Guid PhysiotherapistId { get; set; }
    public DayOfWeek DayOfWeek { get; set; }
    public TimeSpan StartHour { get; set; }
    public TimeSpan EndHour { get; set; }
}