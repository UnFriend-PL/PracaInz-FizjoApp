namespace Fizjobackend.Models.TreatmentsDTOs;

public class AppointmentSaveTreatmentsRequestDTO
{
    public Guid AppointmentId { get; set; }
    
    public List<AppointmentSaveTreatment> Treatments { get; set; }
}