using fizjobackend.DbContexts;
using fizjobackend.Entities.PatientEntities;
using fizjobackend.Entities.PhysiotherapistEntities;
using fizjobackend.Entities.UserEntities;
using fizjobackend.Helpers;
using fizjobackend.Interfaces.DTOInterfaces.RegisterDTOInterfaces;
using fizjobackend.Interfaces.DTOInterfaces.UserDTOInterfaces;
using fizjobackend.Interfaces.HelpersInterfaces;
using fizjobackend.Interfaces.UsersInterfaces;
using fizjobackend.Models.AccountDTOs;
using fizjobackend.Models.UserDTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Diagnostics;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Asn1.Ocsp;
using Microsoft.EntityFrameworkCore;

namespace fizjobackend.Services.UserServices
{
    public class UserService : IUserService
    {

        private readonly FizjoDbContext _context;
        private readonly ILogger<UserService> _logger;
        private readonly IAccountValidationHelper _accountValidationHelper;

        public UserService(FizjoDbContext context, ILogger<UserService> logger, IAccountValidationHelper accountValidationHelper)
        {
            _context = context;
            _logger = logger;
            _accountValidationHelper = accountValidationHelper;
        }
        public async Task<ServiceResponse<IUserInfoResponseDTO>> EditUserInfo(Guid userId, string userRole, UserEditRequestDTO userEdit) 
        {
            ServiceResponse<IUserInfoResponseDTO> response = new ServiceResponse<IUserInfoResponseDTO>("");
            try
            {
                var userFromDb = await _context.Users.FindAsync(userId);
                if(userFromDb != null)
                {
                    userFromDb = ModifyUser(userFromDb, userEdit);
                }
                var validateErrorsFromPatient = _accountValidationHelper.Validate(userFromDb);
                if (validateErrorsFromPatient.Length > 0)
                {
                    return response = new ServiceResponse<IUserInfoResponseDTO>("Validation error") { Success = false, Errors = validateErrorsFromPatient };
                }
                _context.Users.Update(userFromDb);
                await _context.SaveChangesAsync();
                switch (userRole.ToLower())
                {
                    case "patient":
                        response.Data = new PatientInfoResponseDTO(await _context.Patients.FindAsync(userId));
                        break;
                    case "physiotherapist":
                        response.Data = new PhysiotherapistInfoResponseDTO(await _context.Physiotherapists.FindAsync(userId));
                        break;
                }
                response.Success = true;
                response.Message = "User info retrieved";
            }
            catch (Exception ex)
            {
                response = new ServiceResponse<IUserInfoResponseDTO>("An error occurred while editing a user");
                _logger.LogError(ex, "An error occurred while editing a user");
                response.Success = false;
                response.Errors = new[] { ex.Message };
            }
            return response;
        }

        public async Task<ServiceResponse<IUserInfoResponseDTO>> GetUserInfo(Guid userId, IEnumerable<string> userRoles)
        {
            ServiceResponse<IUserInfoResponseDTO> response;

            try
            {
                IUserInfoResponseDTO userInfo = userRole.ToLower() switch
                {
                    "patient" => new PatientInfoResponseDTO(await _context.Patients.FindAsync(userId)
                        ?? throw new KeyNotFoundException("Patient not found")),
                    "physiotherapist" => new PhysiotherapistInfoResponseDTO(await _context.Physiotherapists.FindAsync(userId)
                        ?? throw new KeyNotFoundException("Physiotherapist not found")),
                    _ => throw new ArgumentException("Invalid user role")
                };
                response = new ServiceResponse<IUserInfoResponseDTO>("User info retrieved");
                response.Data = userInfo;
                response.Success = true;
                response.Message = "User info retrieved";
            }
            catch (Exception ex)
            {
                response = new ServiceResponse<IUserInfoResponseDTO>("An error occurred while retrieving user info");
                _logger.LogError(ex, "An error occurred while retrieving user info");
                response.Success = false;
                response.Errors = new[] { ex.Message };
            }

            return response;
        }

    }
}
