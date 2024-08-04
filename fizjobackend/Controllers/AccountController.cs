using fizjobackend.Interfaces.AccountInterfaces;
using fizjobackend.Models.AccountDTOs;
using Microsoft.AspNetCore.Mvc;

namespace fizjobackend.Controllers
{
    [ApiController]
    [Route("AccountController[controller]")]
    public class AccountController : Controller
    {
        private readonly IAccountService _accountService;

        public AccountController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        [HttpPost("RegisterPatient")]
        public async Task<IActionResult> RegisterPatient([FromBody] PatientRegisterDTO patient)
        {
            var response = await _accountService.RegisterPatientAccount(patient);
            if (!response.Success)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }

        [HttpPost("RegisterPhysiotherapist")]
        public async Task<IActionResult> RegisterPhysiotherapist([FromBody] PhysiotherapisRegistertDTO physiotherapist)
            {
            var response = await _accountService.RegisterPhysiotherapistAccount(physiotherapist);
            if (!response.Success)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }
    }
}
