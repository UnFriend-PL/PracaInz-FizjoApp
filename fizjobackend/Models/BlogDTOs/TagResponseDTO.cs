using fizjobackend.Entities.BlogEntities;

namespace fizjobackend.Models.BlogDTOs
{
    public class TagResponseDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public List<PostResponseDTO> Posts { get; set; }
    
        public TagResponseDTO(Tag tag)
        {
            Id = tag.Id;
            Name = tag.Name;
        }
    }
}
