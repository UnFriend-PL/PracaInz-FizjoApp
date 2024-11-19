using Fizjobackend.Models.BlogDTOs;

namespace Fizjobackend.Services.BlogService
{
    public interface IBlogService
    {
        Task<ServiceResponse<PostResponseDTO>> CreatePost(PostCreateRequestDTO post);
        Task<ServiceResponse<BlogPage>> GetBlogPage(int page);

        Task<ServiceResponse<PostResponseDTO>> AddCommentWithRating(Guid ownerId, Guid postId,
            CommentCreateRequest comment);
    }
}
