using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace fizjobackend.Entities.BodyEntities
{
    public class View
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Gender { get; set; }

        public ICollection<BodySection> BodySections { get; set; }
    }
}
