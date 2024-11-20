using Fizjobackend.Entities.OpinionEntities;

namespace Fizjobackend.Models.OpinionDTOs
{
    public class ListOfOpinionResponseDTO
    {
        public List<OpinionListDTO> Opinions { get; set; } = default;
        public int Page { get; set; } = 0;
        public double TotalPage { get; set; } = 0;

    }
}
