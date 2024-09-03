using fizjobackend.Entities.BodyEntities;

namespace fizjobackend.Models.BodyVisualizerDTOs
{
    public class MuscleResponseDTO
    {
        public int Id { get; set; }
        public string? Name { get; set; }

        public MuscleResponseDTO(Muscle muscle)
        {
            Id = muscle.Id;
            Name = muscle.Name;
        }
    }
}
