using Fizjobackend.Entities.PatientEntities;
using Fizjobackend.Entities.PhysiotherapistEntities;
using System.ComponentModel.DataAnnotations.Schema;

namespace Fizjobackend.Models.OpinionDTOs
{
    public class OpinionRequestDTOs
    {
        public Guid PhysiotherapistId { get; set; }
        public string Comment { get; set; }
        public int Rating { get; set; }
    }
}
