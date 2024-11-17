using Fizjobackend.Entities.TreatmentsEntities;

namespace Fizjobackend.Models.TreatmentsDTOs;

public class TreatmentsAutoCompleteResponseDTO
{
    public Guid Id { get; set; }
    public Guid? OwnerId { get; set; }
    public string Name { get; set; }
    public string NamePL { get; set; }
    public TimeSpan Duration { get; set; }
    public string ViewName { get; set; }
    public string ViewNamePL { get; set; }
    public string BodySide { get; set; }
    public string bodySectionName { get; set; }
    public string bodySectionNamePL { get; set; }

    public TreatmentsAutoCompleteResponseDTO(Treatment treatment)
    {
        Id = treatment.Id;
        OwnerId = treatment.OwnerId;
        Name = treatment.Name;
        NamePL = treatment.NamePL;
        Duration = treatment.Duration;
        ViewName = treatment.ViewName;
        BodySide = treatment.BodySide;
        ViewNamePL = treatment.ViewNamePL;
        bodySectionName = treatment.SectionName;
        bodySectionNamePL = treatment.SectionNamePL;
    }

    public TreatmentsAutoCompleteResponseDTO()
    {
    }
}

