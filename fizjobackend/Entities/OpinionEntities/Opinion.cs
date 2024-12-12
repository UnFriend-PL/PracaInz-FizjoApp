using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using Fizjobackend.Entities.PhysiotherapistEntities;
using Fizjobackend.Entities.PatientEntities;
using Fizjobackend.Entities.AppointmentEntities;

namespace Fizjobackend.Entities.OpinionEntities
{
    public class Opinion
    {
        [Key]
        public Guid OpinionId {  get; set; }
        public Patient Patient { get; set; }
        [ForeignKey("PatientId")]
        public Guid PatientId { get; set; }
        public Physiotherapist Physiotherapist { get; set; }
        [ForeignKey("PhysiotherapistId")]
        public Guid PhysiotherapistId { get; set; }
        public string NameAndFirstLetterOfTheLastName { get; set; } = string.Empty;
        public string Comment { get; set; } = string.Empty;
        public int Rating { get; set; }
        public DateTime UploadDate { get; set; } = DateTime.Now;
    }
}
