using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace fizjobackend.Entities.PatientEntities
{
    public class MedicalRaport
    {
        [Key]
        public Guid MedicalRaportId { get; set; }
        [ForeignKey("PatientId")]
        public Guid PatientId { get; set; }
        public string RaportPath { get; set; } = string.Empty;
        public string RaportName { get; set; } = string.Empty;
        public DateTime UploadDate { get; set; } = DateTime.Now;


    }
}
