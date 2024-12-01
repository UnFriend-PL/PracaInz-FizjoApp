using System.ComponentModel.DataAnnotations;
using Fizjobackend.Entities.TreatmentsEntities;

namespace Fizjobackend.Entities.BodyEntities
{
    public class Muscle
    {
        [Key]
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? NamePL { get; set; }
        public int BodySectionId { get; set; }

        public BodySection BodySection { get; set; }
        public virtual ICollection<Treatment> Treatments { get; set; } = new List<Treatment>();

    }
}
