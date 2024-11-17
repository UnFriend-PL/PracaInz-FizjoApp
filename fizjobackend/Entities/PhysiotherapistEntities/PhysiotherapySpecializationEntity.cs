using System.ComponentModel.DataAnnotations;
using Fizjobackend.Enums.PhysiotherapistEnums;

namespace Fizjobackend.Entities.PhysiotherapistEntities
{
    public class PhysiotherapySpecializationEntity
    {
        [Key]
        public Guid PhysiotherapySpecializationId { get; set; }
        public PhysiotherapySpecialization PhysiotherapySpecialization { get; set; }
        public ICollection<Physiotherapist> Physiotherapists { get; set; } = [];

    }
}
