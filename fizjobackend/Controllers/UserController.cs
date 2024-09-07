using fizjobackend.Interfaces.UsersInterfaces;
using fizjobackend.Models.UserDTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace fizjobackend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : Controller
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [Authorize(AuthenticationSchemes = "Bearer")]
        [HttpGet("GetInfo")]
        public async Task<IActionResult> GetUserInfo()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var userRoles = User.FindAll(ClaimTypes.Role).Select(c => c.Value);
            var response = await _userService.GetUserInfo(Guid.Parse(userId), userRoles);
            if (!response.Success)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }

        [Authorize(AuthenticationSchemes = "Bearer")]
        [HttpPost("FindPatient")]
        public async Task<IActionResult> FindPatient([FromBody] SearchPatientRequestDTO searchParam)
        {
            var userRoles = User.FindAll(ClaimTypes.Role).Select(c => c.Value);
            var response = await _userService.FindPatient(searchParam, userRoles);
            if (!response.Success)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }

    }
}
