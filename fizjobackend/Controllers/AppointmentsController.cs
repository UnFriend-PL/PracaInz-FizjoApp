using fizjobackend.Entities.AppointmentEntities;
using fizjobackend.Enums.AppointmentEnums;
using fizjobackend.Interfaces.AppointmentsInterfaces;
using fizjobackend.Models.AppointmentsDTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace fizjobackend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AppointmentsController : Controller
    {

        private readonly IAppointmentsService _appointmentsService;
        private readonly ILogger<AppointmentsController> _logger;

        public AppointmentsController(IAppointmentsService appointmentsService, ILogger<AppointmentsController> logger)
        {
            _appointmentsService = appointmentsService;
            _logger = logger;

        }

        [Authorize(AuthenticationSchemes = "Bearer")]
        [HttpPost("/Appointments/Appointment/Create")]
        public async Task<IActionResult> CreateAppointment([FromBody] CreateAppointmentRequestDTO newAppointmentRequest)
        {
            if (newAppointmentRequest.PhysiotherapistId == Guid.Empty)
            {
                newAppointmentRequest.PhysiotherapistId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            }
            var response = await _appointmentsService.CreateAppointment(newAppointmentRequest);
            if (!response.Success)
            {
                _logger.LogWarning("Appointment creation failed: {Message}", response.Message);
                return BadRequest(response);
            }
            return Ok(response);
        }

        [Authorize(AuthenticationSchemes = "Bearer")]
        [HttpGet("/Appointments/All")]
        public async Task<IActionResult> GetAllAppointments([FromQuery] ListOfAppointmentsRequestDTO appointmentsRequest)
        {
            var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var response = await _appointmentsService.GetAppointments(userId, appointmentsRequest.Status, appointmentsRequest.Page);
            if (!response.Success)
            {
                _logger.LogWarning("Failed to get all appointments: {Message}", response.Message);
                return BadRequest(response);
            }
            return Ok(response);
        }

        [Authorize(AuthenticationSchemes = "Bearer")]
        [HttpGet("/Appointments/{appointmentId}")]
        public async Task<IActionResult> GetAllAppointments(string appointmentId)
        {
            var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var response = await _appointmentsService.GetAppointmentDetails(userId, Guid.Parse(appointmentId));
            if (!response.Success)
            {
                _logger.LogWarning("Failed to get all appointments: {Message}", response.Message);
                return BadRequest(response);
            }
            return Ok(response);
        }

        [Authorize(AuthenticationSchemes = "Bearer")]
        [HttpPut("/Appointments/{appointmentId}/Edit")]
        public async Task<IActionResult> EditAppointment(string appointmentId, [FromBody] EditAppointmentRequestDTO editAppointmentRequest)
        {

            var physiotherapistId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var response = await _appointmentsService.EditAppointment(Guid.Parse(appointmentId), physiotherapistId, editAppointmentRequest);
            if (!response.Success)
            {
                _logger.LogWarning("Appointment edit failed: {Message}", response.Message);
                return BadRequest(response);
            }
            return Ok(response);
        }

        [Authorize(AuthenticationSchemes = "Bearer")]
        [HttpPatch("/Appointments/{appointmentId}/ChangeStatus")]
        public async Task<IActionResult> ChangeAppointmentStatus(string appointmentId, [FromBody] ChangeAppointmentStatusRequestDTO status)
        {

            var physiotherapistId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var response = await _appointmentsService.ChangeAppointmentStatus(Guid.Parse(appointmentId), physiotherapistId, status);
            if (!response.Success)
            {
                _logger.LogWarning("Appointment creation failed: {Message}", response.Message);
                return BadRequest(response);
            }
            return Ok(response);
        }

        [Authorize(AuthenticationSchemes = "Bearer")]
        [HttpPost("/Appointments/{appointmentId}/SaveBodyDetails")]
        public async Task<IActionResult> SaveBodyDetails(string appointmentId, [FromBody] SaveAppointmentBodyDetailsRequestDTO detailsToSave)
        {
            var userId = Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            var response = await _appointmentsService.SaveBodyPartDetails(userId, Guid.Parse(appointmentId), detailsToSave);
            if (!response.Success)
            {
                _logger.LogWarning("Failed to save body details: {Message}", response.Message);
                return BadRequest(response);
            }
            return Ok(response);
        }

        [Authorize(AuthenticationSchemes = "Bearer")]
        [HttpPost("/Appointments/{appointmentId}/LoadSelectedBodyDetails")]
        public async Task<IActionResult> LoadSelectedBodyDetails(Guid appointmentId)
        {
            // Should we add an user access check here?
            var response = await _appointmentsService.LoadAppointmentBodyDetails(appointmentId);
            if (!response.Success)
            {
                _logger.LogWarning("Failed to get all appointments: {Message}", response.Message);
                return BadRequest(response);
            }
            return Ok(response);
        }
    }
}
