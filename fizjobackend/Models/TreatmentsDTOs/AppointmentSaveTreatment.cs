namespace Fizjobackend.Models.TreatmentsDTOs;

public class AppointmentSaveTreatment
{
    public Guid TreatmentId { get; set; }
    public TimeSpan Duration { get; set; }
    public string Notes { get; set; }
    public DateTime? UpdateDate { get; set; }
}