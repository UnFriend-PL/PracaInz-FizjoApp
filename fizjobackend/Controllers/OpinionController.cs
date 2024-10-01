﻿using fizjobackend.Entities.OpinionEntities;
using fizjobackend.Interfaces.OpinionInterfaces;
using fizjobackend.Interfaces.UsersInterfaces;
using fizjobackend.Models.AccountDTOs;
using fizjobackend.Models.OpinionDTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace fizjobackend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OpinionController : Controller
    {
        private readonly IOpinionService _opinionService;

        public OpinionController(IOpinionService opinionService)
        {
            _opinionService = opinionService;
        }
        [Authorize(AuthenticationSchemes = "Bearer")]
        [HttpGet("AddOpinion")]
        public async Task<IActionResult> GetUserInfo([FromBody] OpinionRequestDTOs opinion)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var response = await _opinionService.AddOpinion(Guid.Parse(userId), opinion);
            if (!response.Success)
            {
                return BadRequest(response);
            }
            return Ok(response);
        }
    }
}