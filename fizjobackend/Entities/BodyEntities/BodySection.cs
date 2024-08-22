using System.ComponentModel.DataAnnotations;

namespace fizjobackend.Entities.BodyEntities
{
    public class BodySection
    {
        [Key]
        public int Id { get; set; }
        public string BodySectionName { get; set; }
        public string? BodySide { get; set; }  // "left", "right", or "center"
        public int ViewId { get; set; }

        public View View { get; set; }
        public ICollection<Muscle> Muscles { get; set; }
        public ICollection<Joint> Joints { get; set; }
    }
}
