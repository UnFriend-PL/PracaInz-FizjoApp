using Fizjobackend.Models.BodyVisualizerDTOs;
using Fizjobackend.Services.BodyVisualizerService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Fizjobackend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BodyVisualizerController : Controller
    {
        private readonly IBodyVisualizerService _bodyVisualizerService;
        private readonly ILogger<BodyVisualizerController> _logger;

        public BodyVisualizerController(IBodyVisualizerService bodyVisualizerService, ILogger<BodyVisualizerController> logger)
        {
            _bodyVisualizerService = bodyVisualizerService;
            _logger = logger;
        }

        [Authorize(AuthenticationSchemes = "Bearer")]
        [HttpPost("GetBodyPartDetails")]
        public async Task<IActionResult> GetBodyPartDetails([FromBody] BodyPartDetailsRequestDTO bodyRequest)
        {
            var response = await _bodyVisualizerService.GetBodyPartDetails(bodyRequest);
            if (!response.Success)
            {
                _logger.LogWarning("Failed to get body part details: {Message}", response.Message);
                return BadRequest(response);
            }
            return Ok(response);
        }
    }
}
