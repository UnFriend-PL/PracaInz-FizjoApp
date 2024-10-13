using fizjobackend.Entities.OpinionEntities;
using fizjobackend.Interfaces.OpinionInterfaces;
using fizjobackend.Interfaces.UsersInterfaces;
using fizjobackend.Models.AccountDTOs;
using fizjobackend.Models.OpinionDTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace fizjobackend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OpinionController : Controller
    {
        private readonly IOpinionService _opinionService;

        public OpinionController(IOpinionService opinionService)
        {
            _opinionService = opinionService;
        }
        [Authorize(AuthenticationSchemes = "Bearer")]
        [HttpPost("AddOpinion")]
        public async Task<IActionResult> AddOpinion([FromBody] OpinionRequestDTOs opinion)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var response = await _opinionService.AddOpinion(Guid.Parse(userId), opinion);
            if (!response.Success)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }
        [Authorize(AuthenticationSchemes = "Bearer")]
        [HttpDelete("{opinionId}")]
        public async Task<IActionResult> DeleteOpinion(Guid opinionId)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var response = await _opinionService.DeleteOpinion(Guid.Parse(userId), opinionId);
            if (!response.Success)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }

        [Authorize(AuthenticationSchemes = "Bearer")]
        [HttpPut("{opinionId}")]
        public async Task<IActionResult> UpdateOpinion(Guid opinionId, [FromBody] UpdateOpinionRequestDTO updateOpinion)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var response = await _opinionService.UpdateOpinion(Guid.Parse(userId), opinionId, updateOpinion);
            if (!response.Success)
            {
                return BadRequest(response);
            }
            return Ok(response.Data);
        }

    }
}
