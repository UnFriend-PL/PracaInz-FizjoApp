namespace Fizjobackend.Models.TreatmentsDTOs;

public class TreatmentAutoCompleteRequestDTO
{
    public Guid? OwnerId { get; set; }
    public string? SearchTerm { get; set; }
    public string? BodyPart { get; set; }
}