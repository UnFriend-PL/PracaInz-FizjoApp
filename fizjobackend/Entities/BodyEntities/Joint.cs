using System.ComponentModel.DataAnnotations;

namespace fizjobackend.Entities.BodyEntities
{
    public class Joint
    {
        [Key]
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? NamePL { get; set; }
        public int BodySectionId { get; set; }

        public BodySection BodySection { get; set; }
    }
}
