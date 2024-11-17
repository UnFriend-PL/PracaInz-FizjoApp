namespace Fizjobackend.Entities.BlogEntities
{
    public class Usability
    {
        public Guid Id { get; set; }
        public int Rating { get; set; }
        public Post Post { get; set; }
        public Guid PostId { get; set; }
        public Guid OwnerId { get; set; }
    }
}
