namespace fizjobackend.Models.BodyVisualizerDTOs
{
    public class BodyPartDetailsResponseDTO
    {
        public int ViewId { get; set; }
        public int BodySectionId { get; set; }
        public string Name { get; set; } = string.Empty;
        public List<MuscleResponseDTO> Muscles { get; set; }
        public List<JointResponseDTO> Joints { get; set; }
    }
}
