using Microsoft.AspNetCore.Mvc;

namespace fizjobackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetPosts()
        {
            return Ok("BlogController");
        }

        [HttpPost]
        public IActionResult CreatePost()
        {
            return Ok("BlogController");
        }
    }
}
