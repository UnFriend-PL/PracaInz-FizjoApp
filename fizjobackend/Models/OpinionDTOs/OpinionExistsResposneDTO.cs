namespace fizjobackend.Models.OpinionDTOs
{
    public class OpinionExistsResposneDTO
    {
        public Guid PhysiotherapistId { get; set; }
        public Guid PatientId { get; set; }
        public Guid OpinionId { get; set; }
        public bool Exists { get; set; }
        public string Comment { get; set; }
        public int Rating { get; set; }

    }
}
