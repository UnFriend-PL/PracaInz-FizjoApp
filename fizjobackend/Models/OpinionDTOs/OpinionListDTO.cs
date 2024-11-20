using Fizjobackend.Entities.AppointmentEntities;
using Fizjobackend.Entities.OpinionEntities;
using Fizjobackend.Entities.PatientEntities;
using Fizjobackend.Entities.PhysiotherapistEntities;
using Fizjobackend.Entities.UserEntities;
using Fizjobackend.Enums.AppointmentEnums;
using System.ComponentModel.DataAnnotations.Schema;

namespace Fizjobackend.Models.OpinionDTOs
{
    public class OpinionListDTO
    {
        public Guid OpinionId { get; set; }
        public Guid PatientId { get; set; }
        public Guid PhysiotherapistId { get; set; }
        public string NameAndFirstLetterOfTheLastName { get; set; } = string.Empty;
        public string Comment { get; set; } = string.Empty;
        public int Rating { get; set; }
        public DateTime UploadDate { get; set; } = DateTime.Now;
        public string About { get; set; } = string.Empty;
        public OpinionListDTO() { }

        public OpinionListDTO(Opinion opinion)
        {
            OpinionId = opinion.OpinionId;
            PatientId = opinion.PatientId;
            PhysiotherapistId = opinion.PhysiotherapistId;
            NameAndFirstLetterOfTheLastName = opinion.NameAndFirstLetterOfTheLastName;
            Comment = opinion.Comment;
            Rating = opinion.Rating;
            UploadDate = opinion.UploadDate;
        }
    }

}
