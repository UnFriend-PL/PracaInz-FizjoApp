using fizjobackend.Enums.PhysiotherapistEnums;
using System.ComponentModel.DataAnnotations;

namespace fizjobackend.Entities.PhysiotherapistEntities
{
    public class PhysiotherapySpecializationEntity
    {
        [Key]
        public Guid PhysiotherapySpecializationId { get; set; }
        public PhysiotherapySpecialization PhysiotherapySpecialization { get; set; }
        public ICollection<Physiotherapist> Physiotherapists { get; set; } = [];

    }
}
