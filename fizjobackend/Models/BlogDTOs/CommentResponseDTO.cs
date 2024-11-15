using fizjobackend.Entities.BlogEntities;

namespace fizjobackend.Models.BlogDTOs
{
    public class CommentResponseDTO
    {
        public Guid Id { get; set; }
        public string Body { get; set; }
        public string Author { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public int UsabilityRating { get; set; }

        public CommentResponseDTO(Comment comment)
        {
           Id = comment.Id;
            Body = comment.Body;
            Author = comment.Author;
            CreatedAt = comment.CreatedAt;
            UpdatedAt = comment.UpdatedAt;
            UsabilityRating = comment.Usability.Rating;
        }
    }
}
