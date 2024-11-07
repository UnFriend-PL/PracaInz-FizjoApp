﻿using fizjobackend.Entities.BodyEntities;
using fizjobackend.Entities.PhysiotherapistEntities;
using fizjobackend.Entities.TreatmentsEntities;
using fizjobackend.Models.BodyVisualizerDTOs;

namespace fizjobackend.Models.TreatmentsDTOs;

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
    public IEnumerable<string> SectionNames { get; set;}
    public IEnumerable<string> SectionNamePL { get; set;}
    public IEnumerable<int> BodySectionIds { get; set;}
    public IEnumerable<int> ViewIds { get; set;}
    public IEnumerable<MuscleResponseDTO> Muscles { get; set; }
    public IEnumerable<JointResponseDTO> Joints { get; set; }

    public TreatmentResponseDTO(Treatment treatment, string gender)
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
        Muscles = treatment.Muscles.Select(m => new MuscleResponseDTO(m)).Distinct();
        Joints = treatment.Joints.Select(j => new JointResponseDTO(j)).Distinct();

        SectionNames = treatment.BodySections.Where(s => s.View.Gender == gender).Select(s => s.BodySectionName).Distinct();
        SectionNamePL = treatment.BodySections.Select(s => s.BodySectionNamePL).Distinct();
        BodySectionIds = treatment.BodySections.Select(s => s.Id).Distinct();
        ViewIds = treatment.BodySections.Select(s => s.ViewId).Distinct();
    }

    public TreatmentResponseDTO()
    {
    }
}

