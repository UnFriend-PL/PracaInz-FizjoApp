namespace fizjobackend.Entities.BlogEntities
{
    public class Comment
    {
        public Guid Id { get; set; }
        public string Body { get; set; }
        public string Author { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public Post Post { get; set; }
        public Usability Usability { get; set; }
    }
}
