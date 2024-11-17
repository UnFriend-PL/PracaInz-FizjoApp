using System.Linq;
using Fizjobackend.Entities.BlogEntities;

namespace Fizjobackend.Models.BlogDTOs
{
    public class PostResponseDTO
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
        public string? ImagePath { get; set; }
        public string Author { get; set; }
        public DateTime CreatedAt { get; set; }
        public int UsabilityRating { get; set; }
        public List<TagResponseDTO>? Tags { get; set; }
        public List<CommentResponseDTO>? Comments { get; set; }

        public PostResponseDTO(Post post)
        {
            var comments = post.Comments?
                .Where(comment => comment != null)
                .Select(comment => new CommentResponseDTO(comment))
                .ToList() ?? new List<CommentResponseDTO>();
    
            int rating = comments.Count == 0 
                ? 0 
                : post.Usabilities.Sum(u => u.Rating);

            Id = post.Id;
            Title = post.Title;
            Body = post.Body;
            ImagePath = post.ImagePath;
            Author = post.Author;
            CreatedAt = post.CreatedAt;
            UsabilityRating = rating;
            Tags = post.Tags?.Select(tag => new TagResponseDTO(tag)).ToList() ?? new List<TagResponseDTO>();
            Comments = comments;
        }
    }
}
