using Fizjobackend.DbContexts;
using Fizjobackend.Entities.BlogEntities;
using Fizjobackend.Models.BlogDTOs;
using Microsoft.EntityFrameworkCore;

namespace Fizjobackend.Services.BlogService
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
                int pageSize = 1;
                page = page < 1 ? 1 : page;
                int skip = (page - 1) * pageSize;

                var posts = await _context.Posts
                    .OrderByDescending(p => p.CreatedAt)
                    .Include(p => p.Comments)
                    .Include(u => u.Usabilities)
                    .Skip(skip)
                    .Take(pageSize)
                    .AsSplitQuery()
                    .AsNoTracking()
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

        public async Task<ServiceResponse<PostResponseDTO>> GetPost(Guid postId)
        {
            var response = new ServiceResponse<PostResponseDTO>("Post fetched");

            try
            {
                var post = await _context.Posts
                    .Include(p => p.Comments)
                    .Include(u => u.Usabilities)
                    .AsSplitQuery()
                    .AsNoTracking()
                    .FirstOrDefaultAsync(p => p.Id == postId);
                if (post == null)
                {
                    response.Success = false;
                    response.Message = "Post not found";
                    return response;
                }

                response.Data = new PostResponseDTO(post);
            }
            catch (Exception exception)
            {
                response.Success = false;
                response.Message = exception.Message;
                _logger.LogError(exception.Message);
            }

            return response;
        }

        public async Task<ServiceResponse<PostResponseDTO>> AddCommentWithRating(Guid ownerId, Guid postId,
            CommentCreateRequest comment)
        {
            var response = new ServiceResponse<PostResponseDTO>("Comment with rating added");

            try
            {
                var post = await _context.Posts.FindAsync(postId);
                if (post == null)
                {
                    response.Success = false;
                    response.Message = "Post not found";
                    return response;
                }

                var newComment = new Comment(comment, post, ownerId);
                var usability = await _context.Usabilities
                    .Where(u => u.OwnerId == ownerId && u.PostId == comment.PostId).FirstOrDefaultAsync();
                if (usability == null)
                {
                    usability = new Usability()
                    {
                        OwnerId = ownerId,
                        PostId = postId,
                        Rating = comment.UsabilityRating
                    };
                    await _context.Usabilities.AddAsync(usability);
                }
                else
                {
                    usability.Rating = comment.UsabilityRating;
                    _context.Usabilities.Update(usability);
                }

                await _context.Comments.AddAsync(newComment);
                await _context.SaveChangesAsync();
                response.Data = new PostResponseDTO(post);
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