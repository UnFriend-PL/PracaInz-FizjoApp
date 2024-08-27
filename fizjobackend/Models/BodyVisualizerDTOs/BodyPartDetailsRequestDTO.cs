namespace fizjobackend.Models.BodyVisualizerDTOs
{
    public class BodyPartDetailsRequestDTO
    {
        public string BodySectionName { get; set; }
        public string ViewPosition { get; set; } = "front";
        public string? ViewSide { get; set; } 
        public string Gender { get; set; } = "male";
    }
}
