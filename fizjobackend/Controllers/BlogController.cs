using System.Security.Claims;
using Fizjobackend.Models.BlogDTOs;
using Fizjobackend.Services.BlogService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Fizjobackend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BlogController : ControllerBase
    {
        private readonly IBlogService _blogService;

        public BlogController(IBlogService blogService)
        {
            _blogService = blogService;
        }

        [HttpGet("/Post/All")]
        public async Task<IActionResult> GetPosts([FromQuery] int page)
        {
            var response = await _blogService.GetBlogPage(page);
            if (!response.Success)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }

        [HttpGet("/Post/Get/{postId}")]
        public async Task<IActionResult> GetPost(Guid postId)
        {
            var response = await _blogService.GetPost(postId);
            if (!response.Success)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }
        
        [Authorize(AuthenticationSchemes = "Bearer")]
        [HttpPost("/Post/Create")]
        public async Task<IActionResult> CreatePost([FromBody] PostCreateRequestDTO post)
        {
            var response = await _blogService.CreatePost(post);
            if(!response.Success)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }
        
        [Authorize(AuthenticationSchemes = "Bearer")]
        [HttpPost("/Post/Comments/Add/{postId}")]
        public async Task<IActionResult> AddCommentWithRating(Guid postId, [FromBody] CommentCreateRequest comment)
        {
            var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var response = await _blogService.AddCommentWithRating(userId, postId, comment);
            if (!response.Success)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }
    }
}
