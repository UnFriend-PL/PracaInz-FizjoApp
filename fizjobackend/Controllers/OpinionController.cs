using Fizjobackend.Entities.OpinionEntities;
using Fizjobackend.Entities.UserEntities;
using Fizjobackend.Interfaces.OpinionInterfaces;
using Fizjobackend.Models.AccountDTOs;
using Fizjobackend.Models.OpinionDTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Fizjobackend.Controllers
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
        [HttpPost("{opinionId}")]
        public async Task<IActionResult> UpdateOpinion(Guid opinionId, [FromBody] UpdateOpinionRequestDTO updateOpinion)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var response = await _opinionService.UpdateOpinion(Guid.Parse(userId), opinionId, updateOpinion);
            if (!response.Success)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }

        [Authorize(AuthenticationSchemes = "Bearer")]
        [HttpGet("all")]
        public async Task<IActionResult> GetAllOpinions( int page = 1, int pageSize = 10)
        {
            var userRoles = User.FindAll(ClaimTypes.Role).Select(c => c.Value);
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var response = await _opinionService.GetAllOpinions(userRoles, userId, page, pageSize);
            if (!response.Success)
            {
                return NotFound(response.Message);
            }
            return Ok(response.Data);
        }
    }
}
