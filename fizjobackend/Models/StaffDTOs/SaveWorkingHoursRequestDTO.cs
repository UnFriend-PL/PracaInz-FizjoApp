 
namespace Fizjobackend.Models.AppointmentsDTOs;

public class SaveWorkingHoursRequestDTO
{
    public Guid PhysiotherapistId { get; set; }
    public string DayOfWeek { get; set; }
    public string StartHour { get; set; }
    public string EndHour { get; set; }
}     