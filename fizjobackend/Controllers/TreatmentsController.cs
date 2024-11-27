using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Fizjobackend.Models.TreatmentsDTOs;
using Fizjobackend.Services.Treatments;

namespace Fizjobackend.Controllers;

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

    [HttpPost]
    [Authorize(AuthenticationSchemes = "Bearer")]
    public async Task<IActionResult> GetTreatments(TreatmentAutoCompleteRequestDTO request)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var response = await _treatmentsService.GetTreatments(request);
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
    
    
    [HttpPost("Save")]
    [Authorize(AuthenticationSchemes = "Bearer")]
    public async Task<IActionResult> SaveAppointmnetTratments(AppointmentSaveTreatmentsRequestDTO request)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var response = await _treatmentsService.SaveAppointmentTreatments(request);
        if (!response.Success)
        {
            return BadRequest(response);
        }

        return Ok(response);
    }
    
    [HttpGet("{appointmentId}")]
    [Authorize(AuthenticationSchemes = "Bearer")]
    public async Task<IActionResult> GetAppointmentTreatments(Guid appointmentId)
    {
        var response = await _treatmentsService.GetAppointmentTreatments(appointmentId);
        if (!response.Success)
        {
            return BadRequest(response);
        }

        return Ok(response);
    }
}