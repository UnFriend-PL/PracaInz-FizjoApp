using Fizjobackend.Models.UserDTOs;

namespace Fizjobackend.Models.OpinionDTOs
{
    public class OpinionResponseDTOs
    {
        public PhysiotherapistInfoResponseDTO Physiotherapist { get; set; }
        public string NameAndFirstLetterOfTheLastName { get; set; }
        public string Comment { get; set; } = string.Empty;
        public int Rating { get; set; }
        public DateTime UploadDate { get; set; }
    }
}
