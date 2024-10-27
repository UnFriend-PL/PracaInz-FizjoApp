using fizjobackend.Entities.AppointmentEntities;
using fizjobackend.Entities.BodyEntities;
using fizjobackend.Entities.PhysiotherapistEntities;
using System.ComponentModel.DataAnnotations;

namespace fizjobackend.Entities.TreatmentsEntities
{
    public class Treatment
    {
        [Key]
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
        public virtual ICollection<Muscle> Muscles { get; set; } = new List<Muscle>();
        public virtual ICollection<Joint> Joints { get; set; } = new List<Joint>();
        public virtual ICollection<View> Views { get; set; } = new List<View>();
        public virtual ICollection<BodySection> BodySections { get; set; } = new List<BodySection>();
    }
}
