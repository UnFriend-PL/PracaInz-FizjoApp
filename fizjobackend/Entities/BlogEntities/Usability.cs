namespace fizjobackend.Entities.BlogEntities
{
    public class Usability
    {
        public Guid Id { get; set; }
        public int Rating { get; set; }
        public Guid CommentId { get; set; }
        public Post Post { get; set; }
        public Comment Comment { get; set; }
    }
}
