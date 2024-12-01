using Fizjobackend.Entities.BlogEntities;

namespace Fizjobackend.Models.BlogDTOs
{
    public class CommentResponseDTO
    {
        public Guid Id { get; set; }
        public string Body { get; set; }
        public string Author { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }

        public CommentResponseDTO(Comment comment)
        {
            Id = comment.Id;
            Body = comment.Body;
            Author = comment.Author;
            CreatedAt = comment.CreatedAt;
            UpdatedAt = comment.UpdatedAt;
        }
    }
}