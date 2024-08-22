using fizjobackend.Entities.BodyEntities;

namespace fizjobackend.Models.BodyVisualizerDTOs
{
    public class JointResponseDTO
    {
        public int Id { get; set; }
        public string? Name { get; set; }

        public JointResponseDTO(Joint joint)
        {
            Id = joint.Id;
            Name = joint.Name;
        }
    }
}
