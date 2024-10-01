using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using fizjobackend.Entities.PhysiotherapistEntities;
using fizjobackend.Entities.PatientEntities;

namespace fizjobackend.Entities.OpinionEntities
{
    public class Opinion
    {
        [Key]
        public Guid OpinionId {  get; set; }
        public virtual Patient Patient { get; set; }
        [ForeignKey("PatientId")]
        public Guid PatientId { get; set; }
        public virtual Physiotherapist Physiotherapist { get; set; }
        [ForeignKey("PhysiotherapistId")]
        public Guid PhysiotherapistId { get; set; }
        public string NameAndFirstLetterOfTheLastName { get; set; } = string.Empty;
        public string Comment { get; set; } = string.Empty;
        public int Rating { get; set; }
        public DateTime UploadDate { get; set; } = DateTime.Now;
    }
}
