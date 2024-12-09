namespace Fizjobackend.Entities.PhysiotherapistEntities;

public class WorkingHoursResponseDto
{
    public Guid Id { get; set; }
    public Guid PhysiotherapistId { get; set; }
    public DayOfWeek DayOfWeek { get; set; }
    public TimeSpan StartHour { get; set; }
    public TimeSpan EndHour { get; set; }
}