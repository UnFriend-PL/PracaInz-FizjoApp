using fizjobackend.Entities.PatientEntities;
using fizjobackend.Entities.PhysiotherapistEntities;
using System.ComponentModel.DataAnnotations.Schema;

namespace fizjobackend.Models.OpinionDTOs
{
    public class OpinionRequestDTOs
    {
        public Guid PhysiotherapistId { get; set; }
        public string Comment { get; set; }
        public int Rating { get; set; }
    }
}
