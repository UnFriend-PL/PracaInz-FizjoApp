using Fizjobackend.Models.BlogDTOs;

namespace Fizjobackend.Entities.BlogEntities
{
    public class Comment
    {
        public Guid Id { get; set; }
        public string Body { get; set; }
        public string Author { get; set; }
        public Guid AuthorId { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public Post Post { get; set; }
        public Guid PostId { get; set; }
        
        public Comment() { }
        
        public Comment(CommentCreateRequest commentCreateRequest, Post post, Guid authorId)
        {
            Body = commentCreateRequest.Body;
            Author = commentCreateRequest.Author;
            CreatedAt = DateTime.Now;
            UpdatedAt = DateTime.Now;
            AuthorId = authorId;
            Post = post;
        }
    }
}
