using fizjobackend.Entities.TreatmentsEntities;

namespace fizjobackend.Models.TreatmentsDTOs;

public class TreatmentsAutoCompleteResponseDTO
{
    public Guid Id { get; set; }
    public Guid? OwnerId { get; set; }
    public string Name { get; set; }
    public string NamePL { get; set; }
    public TimeSpan Duration { get; set; }
    public string viewName { get; set; }
    public string bodySectionName { get; set; }
    public string bodySectionNamePL { get; set; }

    public TreatmentsAutoCompleteResponseDTO(Treatment treatment)
    {
        Id = treatment.Id;
        OwnerId = treatment.OwnerId;
        Name = treatment.Name;
        NamePL = treatment.NamePL;
        Duration = treatment.Duration;
        viewName = treatment.Views.FirstOrDefault()?.Name;
        bodySectionName = treatment.BodySections.FirstOrDefault()?.BodySectionName;
        bodySectionNamePL = treatment.BodySections.FirstOrDefault()?.BodySectionNamePL;
    }

    public TreatmentsAutoCompleteResponseDTO()
    {
    }
}

