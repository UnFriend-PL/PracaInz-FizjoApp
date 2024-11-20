namespace Fizjobackend.Models.BlogDTOs
{
    public class PostCreateRequestDTO
    {
        public string Title { get; set; }
        public string Body { get; set; }
        public string Author { get; set; }
        public string? ImagePath { get; set; }
    }
}
