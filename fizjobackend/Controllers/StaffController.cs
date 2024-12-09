using fizjobackend.Models.StaffDTOs;
using Fizjobackend.Models.UserDTOs;
using Fizjobackend.Services.StaffService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Fizjobackend.Models.AppointmentsDTOs;

namespace Fizjobackend.Controllers;

[Route("[controller]")]
[ApiController]
public class StaffController : ControllerBase
{
    private readonly IStaffService _staffService;
    
    public StaffController(IStaffService staffService)
    {
        _staffService = staffService;
    }
    
    [HttpGet("/Staff/All/")]
    public async Task<IActionResult> GetStaff(
        [FromQuery] string? searchTerm = null,
        [FromQuery] double? averagePrice = null,
        [FromQuery] string? city = null,
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 10
    )
    {
        var response = await _staffService.GetAllStaff(searchTerm, averagePrice, city, pageNumber, pageSize);
        if (!response.Success)
        {
            return BadRequest(response);
        }
        return Ok(response);
    }
    
    [HttpGet("/Staff/{id}")]
    public async Task<IActionResult> GetStaffById(Guid id)
    {
        var response = await _staffService.GetStaffById(id);
        if (!response.Success)
        {
            return BadRequest(response);
        }
        return Ok(response);
    }

    [Authorize(AuthenticationSchemes = "Bearer")]
    [HttpPost("/Staff/Update")]
    public async Task<IActionResult> UpdateStaff([FromBody] UpdateStaffInfoRequestDTO updateStaffInfoRequest)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var userRoles = User.FindAll(ClaimTypes.Role).Select(c => c.Value);
        var response = await _staffService.UpdateStaff(Guid.Parse(userId), updateStaffInfoRequest, userRoles);
        if (!response.Success)
        {
            return BadRequest(response);
        }
        return Ok(response);
    }
    
    [HttpPost("/Staff/AvailableSlots")]
    public async Task<IActionResult> GetAvailableSlots([FromBody] WorkingHoursRequestDTO workingHours)
    {
        var response = await _staffService.GetAvailableSlots(workingHours);
        if (!response.Success)
        {
            return BadRequest(response);
        }
            
        return Ok(response);
    }
    
    [Authorize(AuthenticationSchemes = "Bearer")]
    [HttpPost("/Staff/SaveWorkingHours")]
    public async Task<IActionResult> AddWorkingHours([FromBody] SaveWorkingHoursRequestDTO workingHours)
    {
        var response = await _staffService.SaveStaffWorkingHours(workingHours);
        if (!response.Success)
        {
            return BadRequest(response);
        }
            
        return Ok(response);
    }
    
    [HttpGet("/Staff/WorkingHours/{physiotherapistId}")]
    public async Task<IActionResult> GetWorkingHours(Guid physiotherapistId)
    {
        var response = await _staffService.GetStaffWorkingHours(physiotherapistId);
        if (!response.Success)
        {
            return BadRequest(response);
        }
            
        return Ok(response);
    }
}