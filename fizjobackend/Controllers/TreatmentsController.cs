using fizjobackend.Interfaces.TreatmentsInterfaces;
using fizjobackend.Models.TreatmentsDTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace fizjobackend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TreatmentsController : ControllerBase
    {

        private readonly ITreatmentsService _treatmentsService;
        private readonly ILogger<TreatmentsController> _logger;

        public TreatmentsController(ITreatmentsService treatmentsService, ILogger<TreatmentsController> logger)
        {
            _treatmentsService = treatmentsService;
            _logger = logger;
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> GetTreatments()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var response = await _treatmentsService.GetTreatments(Guid.Parse(userId));
            if (!response.Success)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }

        [HttpPost("Treatment")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> CreateTreatment([FromBody] TreatmentRequestDTO treatmentRequest)
        {
            var response = await _treatmentsService.GetTreatment(treatmentRequest);
            if (!response.Success)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }
    }
}
