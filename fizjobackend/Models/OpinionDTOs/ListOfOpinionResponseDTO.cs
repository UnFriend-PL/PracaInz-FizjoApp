using fizjobackend.Entities.OpinionEntities;

namespace fizjobackend.Models.OpinionDTOs
{
    public class ListOfOpinionResponseDTO
    {
        public List<OpinionListDTO> Opinions { get; set; } = default;
    }
}
