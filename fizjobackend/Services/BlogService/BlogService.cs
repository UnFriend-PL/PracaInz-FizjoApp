using fizjobackend.DbContexts;
using fizjobackend.Entities.BlogEntities;
using fizjobackend.Models.BlogDTOs;
using Microsoft.EntityFrameworkCore;

namespace fizjobackend.Services.BlogService
{
    public class BlogService : IBlogService
    {
        private readonly FizjoDbContext _context;
        private readonly ILogger<BlogService> _logger;

        public BlogService(FizjoDbContext context, ILogger<BlogService> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<ServiceResponse<BlogPage>> GetBlogPage(int page)
        {
            var response = new ServiceResponse<BlogPage>("Blog Page fetched");
            try
            {
                int pageSize = 4;
                page = page < 1 ? 1 : page; 
                int skip = (page - 1) * pageSize;

                var posts = await _context.Posts
                    .OrderByDescending(p => p.CreatedAt)
                    .Skip(skip)
                    .Take(pageSize)
                    .ToListAsync();

                var totalPosts = await _context.Posts.CountAsync();
                var blogPage = new BlogPage
                {
                    Posts = posts.Select(p => new PostResponseDTO(p)).ToList(),
                    CurrentPage = page,
                    TotalPosts = totalPosts,
                    TotalPages = (int)Math.Ceiling((double)totalPosts / pageSize)
                };

                response.Data = blogPage;
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = ex.Message;
                _logger.LogError(ex.Message);
            }
            return response;
        }

        public async Task<ServiceResponse<PostResponseDTO>> CreatePost(PostCreateRequestDTO post)
        {
            var response = new ServiceResponse<PostResponseDTO>("Post Created");

            try
            {
                var newPost = new Post(post);
                var createdPost = await _context.Posts.AddAsync(newPost);
                await _context.SaveChangesAsync();
                response.Data = new PostResponseDTO(createdPost.Entity);
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = ex.Message;
                _logger.LogError(ex.Message);
            }
            return response;
        }
    }
}
