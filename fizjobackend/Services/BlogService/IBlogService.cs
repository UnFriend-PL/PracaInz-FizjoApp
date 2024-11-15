using fizjobackend.Models.BlogDTOs;

namespace fizjobackend.Services.BlogService
{
    public interface IBlogService
    {
        Task<ServiceResponse<PostResponseDTO>> CreatePost(PostCreateRequestDTO post);
        Task<ServiceResponse<BlogPage>> GetBlogPage(int page);
    }
}
