using fizjobackend.Entities.PatientEntities;
using fizjobackend.Entities.PhysiotherapistEntities;
using System.ComponentModel.DataAnnotations.Schema;

namespace fizjobackend.Models.OpinionDTOs
{
    public class OpinionRequestDTOs
    {
        public Guid AppointmentId { get; set; }
        public string Comment { get; set; }
        public int Rating { get; set; }
    }
}
