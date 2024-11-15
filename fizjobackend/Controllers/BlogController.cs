using fizjobackend.Models.BlogDTOs;
using fizjobackend.Services.BlogService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace fizjobackend.Controllers
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
    }
}
