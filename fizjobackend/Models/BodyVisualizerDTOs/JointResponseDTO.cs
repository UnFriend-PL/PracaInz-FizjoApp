using Fizjobackend.Entities.BodyEntities;

namespace Fizjobackend.Models.BodyVisualizerDTOs
{
    public class JointResponseDTO
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? NamePL { get; set; }
        public JointResponseDTO(Joint joint)
        {
            Id = joint.Id;
            Name = joint.Name;
            NamePL = joint.NamePL;
        }
    }
}
