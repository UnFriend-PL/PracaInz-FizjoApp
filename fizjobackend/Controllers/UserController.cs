using fizjobackend.Entities.UserEntities;
using fizjobackend.Interfaces.DTOInterfaces.UserDTOInterfaces;
using fizjobackend.Interfaces.UsersInterfaces;
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
            var response = await _userService.GetUserInfo(Guid.Parse(userId), userRoles.First());
            if (!response.Success)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }

        [Authorize(AuthenticationSchemes = "Bearer")]
        [HttpPut("EditInfsso")]
        public async Task<IActionResult> EditUserInfo([FromBody] UserEditRequestDTO userEdit) 
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var userRoles = User.FindAll(ClaimTypes.Role).Select(c=>c.Value);
            var resposne = await _userService.EditUserInfo(Guid.Parse(userId), userRoles.First(), userEdit);
            if (!resposne.Success)
            {
                return BadRequest(resposne);
            }
            return Ok(resposne);
        }

    }
}
