﻿using fizjobackend.Enums.AppointmentEnums;
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
        [HttpPost("/Appointment/Create")]
        public async Task<IActionResult> CreateAppointment([FromBody] CreateAppointmentRequestDTO newAppointmentRequest)
        {

            var response = await _appointmentsService.CreateAppointment(newAppointmentRequest);
            if (!response.Success)
            {
                _logger.LogWarning("Appointment creation failed: {Message}", response.Message);
                return BadRequest(response);
            }
            return Ok(response);
        }

        [Authorize(AuthenticationSchemes = "Bearer")]
        [HttpGet("/All")]
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
    }
}
