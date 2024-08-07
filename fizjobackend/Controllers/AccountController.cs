using fizjobackend.Interfaces.AccountInterfaces;
using fizjobackend.Models.AccountDTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace fizjobackend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AccountController : Controller
    {
        private readonly IAccountService _accountService;

        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpPost("RegisterPatient")]
        public async Task<IActionResult> RegisterPatient([FromBody] PatientRegisterRequestDTO patient)
        {
            var response = await _accountService.RegisterPatientAccount(patient);
            if (!response.Success)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }

        [HttpPost("RegisterPhysiotherapist")]
        public async Task<IActionResult> RegisterPhysiotherapist([FromBody] PhysiotherapisRegistertRequestDTO physiotherapist)
            {
            var response = await _accountService.RegisterPhysiotherapistAccount(physiotherapist);
            if (!response.Success)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDTO login)
        {
            var response = await _accountService.Login(login);
            if (!response.Success)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }

        [Authorize(AuthenticationSchemes = "Bearer")]
        [HttpGet("RefreshSession")]
        public async Task<IActionResult> RefreshSession()
        {
            var token = Request.Headers["Authorization"].ToString().Split(" ")[1];
            if (string.IsNullOrWhiteSpace(token))
            {
                return BadRequest(new { message = "Token is missing" });
            }
            var response = await _accountService.RefreshSession(token);
            if (!response.Success)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }

        [HttpGet("ConfirmEmail")]
        public async Task<IActionResult> ConfirmEmail(string email, string token)
        {
            var response = await _accountService.ConfirmEmail(email, token);
            if (!response.Success)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }

    }
}
