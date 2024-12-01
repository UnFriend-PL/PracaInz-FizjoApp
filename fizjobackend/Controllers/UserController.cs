using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Fizjobackend.Models.UserDTOs;
using Fizjobackend.Services.UserServices;

namespace Fizjobackend.Controllers
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
        [HttpPost("UpdateInfo")]
        public async Task<IActionResult> UpdateUserInfo([FromBody] UpdateUserInfoRequestDTO updateUserInfoRequest)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var userRoles = User.FindAll(ClaimTypes.Role).Select(c => c.Value);
            var response = await _userService.UpdateInfo(Guid.Parse(userId), updateUserInfoRequest, userRoles);
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


        [HttpPost("Avatar/Upload")]
        [Authorize(AuthenticationSchemes = "Bearer")]
        public async Task<IActionResult> UploadImage(IFormFile file)
        {
            var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var response = await _userService.UploadAvatar(userId, file);
            if (!response.Success)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }

        [HttpGet("Avatar/Get/{avatarPath}")]
        public async Task<IActionResult> GetAvatar(string avatarPath)
        {
            var response = await _userService.GetAvatarFile(avatarPath);
            if (!response.Success)
            {
                return BadRequest(response);
            }
            if(response.Data == null)
            {
                return NotFound();
            }
            return response.Data;
        }
    }
}
