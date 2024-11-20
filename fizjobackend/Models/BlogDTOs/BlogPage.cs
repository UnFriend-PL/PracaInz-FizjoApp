namespace Fizjobackend.Models.BlogDTOs
{
    public class BlogPage
    {
        public int CurrentPage { get; set; }
        public int TotalPages { get; set; }
        public int TotalPosts { get; set; }
        public List<PostResponseDTO> Posts { get; set; }
    }
}
