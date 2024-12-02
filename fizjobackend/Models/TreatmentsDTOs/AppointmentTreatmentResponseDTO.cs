using Fizjobackend.Entities.AppointmentEntities;

namespace Fizjobackend.Models.TreatmentsDTOs;

public class AppointmentTreatmentResponseDTO
{
    public Guid TreatmentId { get; set; }
    public TimeSpan Duration { get; set; }
    public DateTime? UpdateDate { get; set; }
    public string Notes { get; set; }
    public TreatmentResponseDTO Treatment { get; set; }
    
    public AppointmentTreatmentResponseDTO(AppointmentTreatments appointmentTreatments)
    {
        TreatmentId = appointmentTreatments.TreatmentId;
        Duration = appointmentTreatments.Duration;
        Notes = appointmentTreatments.Notes;
        UpdateDate = appointmentTreatments.UpdateDate;
        Treatment = new TreatmentResponseDTO(appointmentTreatments.Treatment);
    }
}