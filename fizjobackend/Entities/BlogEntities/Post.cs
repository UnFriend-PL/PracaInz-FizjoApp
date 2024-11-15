using fizjobackend.Models.BlogDTOs;

namespace fizjobackend.Entities.BlogEntities
{
    public class Post
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
        public string? ImagePath { get; set; }
        public string Author { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public int UsabilityRating { get; set; }
        public List<Comment> Comments { get; set; }
        public List<Tag> Tags { get; set; }
        public List<Usability> Usabilities { get; set; }

        public Post() { }

        public Post(PostCreateRequestDTO post)
        {

            Id = Guid.NewGuid();
            Title = post.Title;
            Body = post.Body;
            ImagePath = post.ImagePath;
            Author = post.Author;
            CreatedAt = DateTime.Now;
            UpdatedAt = DateTime.Now;
            UsabilityRating = 0;
        }
    }
}
