using Fizjobackend.Entities.BodyEntities;

namespace Fizjobackend.Models.BodyVisualizerDTOs
{
    public class MuscleResponseDTO
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? NamePL { get; set; }

        public MuscleResponseDTO(Muscle muscle)
        {
            Id = muscle.Id;
            Name = muscle.Name;
            NamePL = muscle.NamePL;
        }
    }
}
