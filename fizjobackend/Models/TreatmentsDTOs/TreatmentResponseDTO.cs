using Fizjobackend.Entities.BodyEntities;
using Fizjobackend.Entities.PhysiotherapistEntities;
using Fizjobackend.Entities.TreatmentsEntities;
using Fizjobackend.Models.BodyVisualizerDTOs;

namespace Fizjobackend.Models.TreatmentsDTOs;

    public class TreatmentResponseDTO
{
    public Guid Id { get; set; }
    public Guid? OwnerId { get; set; }
    public virtual Physiotherapist? Physiotherapist { get; set; }
    public bool IsDefault { get; set; } = false;
    public string Description { get; set; }
    public string DescriptionPL { get; set; }
    public string Name { get; set; }
    public string NamePL { get; set; }
    public TimeSpan Duration { get; set; }
    public DateTime CreateDate { get; set; }
    public DateTime? UpdateDate { get; set; }
    public bool IsDeleted { get; set; }
    
    public string ViewName { get; set; }
    public string ViewNamePL { get; set; }
    public string BodySide { get; set; }
    public string BodySidePL { get; set; }
    public string bodySectionName { get; set; }
    public string bodySectionNamePL { get; set; }

    public TreatmentResponseDTO(Treatment treatment)
    {
        Id = treatment.Id;
        OwnerId = treatment.OwnerId;
        Physiotherapist = treatment.Physiotherapist;
        IsDefault = treatment.IsDefault;
        Description = treatment.Description;
        DescriptionPL = treatment.DescriptionPL;
        Name = treatment.Name;
        NamePL = treatment.NamePL;
        Duration = treatment.Duration;
        CreateDate = treatment.CreateDate;
        UpdateDate = treatment.UpdateDate;
        IsDeleted = treatment.IsDeleted;
        ViewName = treatment.ViewName;
        ViewNamePL = treatment.ViewNamePL;
        BodySide = treatment.BodySide;
        BodySidePL = treatment.BodySidePL;
        bodySectionName = treatment.SectionName;
        bodySectionNamePL = treatment.SectionNamePL;
    }

    public TreatmentResponseDTO()
    {
    }
}

