namespace Fizjobackend.Models.BlogDTOs
{
    public class CommentCreateRequest
    {
        public Guid PostId { get; set; }
        public string Body { get; set; }
        public string Author { get; set; }
        public int UsageRating { get; set; }
        public int UsabilityRating { get; set; }
    }
}
