namespace Fizjobackend.Models.TreatmentsDTOs;

public class TreatmentAutoCompleteRequestDTO
{
    public Guid? OwnerId { get; set; }
    public string? SearchTerm { get; set; }
    public string Gender { get; set; }
    public List<string>? BodyParts { get; set; }
    public int Limit { get; set; }
    public int Page { get; set; }
}