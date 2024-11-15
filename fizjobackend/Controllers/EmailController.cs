using fizjobackend.Services.EmailService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace fizjobackend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class EmailController : Controller
    {

        private readonly IEmailService _emailService;

        public EmailController(IEmailService emailService)
        {
            _emailService = emailService;
        }

        [Authorize(AuthenticationSchemes = "Bearer")]
        [HttpPost("SendEmail")]
        public async Task<IActionResult> SendEmail([FromBody] string emailRequest)
        {
            var response = await _emailService.SendVerificationEmail(emailRequest, "sad");
            if (!response)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }

    }
}
