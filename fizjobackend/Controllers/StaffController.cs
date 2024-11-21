using Fizjobackend.Services.StaffService;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

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
}