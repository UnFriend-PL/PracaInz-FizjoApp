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
                switch (userRole.ToLower())
                {
                    case "patient":
                        var patientFromDb = await _context.Patients.FindAsync(userId);
                        if (patientFromDb == null)
                        {
                            throw new KeyNotFoundException("Patient not found");
                        }

                        if (!string.IsNullOrEmpty(userEdit.FirstName))
                            patientFromDb.FirstName = userEdit.FirstName;
                        if (!string.IsNullOrEmpty(userEdit.LastName))
                            patientFromDb.LastName = userEdit.LastName;
                        if (!string.IsNullOrEmpty(userEdit.Gender))
                            patientFromDb.Gender = userEdit.Gender;
                        if (!string.IsNullOrEmpty(userEdit.Country))
                            patientFromDb.Country = userEdit.Country;
                        if (!string.IsNullOrEmpty(userEdit.City))
                            patientFromDb.City = userEdit.City;
                        if(!string.IsNullOrEmpty(userEdit.Email))
                            patientFromDb.Email = userEdit.Email;
                        if (!string.IsNullOrEmpty(userEdit.StreetWithHouseNumber))
                            patientFromDb.StreetWithHouseNumber = userEdit.StreetWithHouseNumber;
                        if (!string.IsNullOrEmpty(userEdit.PostCode))
                            patientFromDb.PostCode = userEdit.PostCode;
                        if (!string.IsNullOrEmpty(userEdit.Pesel))
                            patientFromDb.Pesel = userEdit.Pesel;
                        if (userEdit.DateOfBirth.HasValue && userEdit.DateOfBirth.Value != DateTime.MinValue)
                            patientFromDb.DateOfBirth = userEdit.DateOfBirth.Value;
                        if (!string.IsNullOrEmpty(userEdit.HealthInsuranceNumber))
                            patientFromDb.HealthInsuranceNumber = userEdit.HealthInsuranceNumber;
                        if (!string.IsNullOrEmpty(userEdit.PhoneNumber))
                            patientFromDb.PhoneNumber = userEdit.PhoneNumber;
                        patientFromDb.LastModifiedDate = DateTime.UtcNow;

                        var validateErrorsFromPatient = _accountValidationHelper.Validate(patientFromDb);
                        if (validateErrorsFromPatient.Length > 0)
                        {
                            return response = new ServiceResponse<IUserInfoResponseDTO>("Validation error") { Success = false, Errors = validateErrorsFromPatient };
                        }
                        _context.Patients.Update(patientFromDb);
                        await _context.SaveChangesAsync();

                        PatientInfoResponseDTO responsePatientDTO = new PatientInfoResponseDTO(patientFromDb);
                        response.Data = responsePatientDTO;
                        break;

                    case "physiotherapist":
                        var physiotherapistFromDb = await _context.Physiotherapists.FindAsync(userId);
                        if (physiotherapistFromDb == null)
                        {
                            throw new KeyNotFoundException("Physiotherapist not found");
                        }
                        if (!string.IsNullOrEmpty(userEdit.FirstName))
                            physiotherapistFromDb.FirstName = userEdit.FirstName;
                        if (!string.IsNullOrEmpty(userEdit.LastName))
                            physiotherapistFromDb.LastName = userEdit.LastName;
                        if (userEdit.Gender != null)
                            physiotherapistFromDb.Gender = userEdit.Gender;
                        if (!string.IsNullOrEmpty(userEdit.Country))
                            physiotherapistFromDb.Country = userEdit.Country;
                        if (!string.IsNullOrEmpty(userEdit.City))
                            physiotherapistFromDb.City = userEdit.City;
                        if (!string.IsNullOrEmpty(userEdit.StreetWithHouseNumber))
                            physiotherapistFromDb.StreetWithHouseNumber = userEdit.StreetWithHouseNumber;
                        if (!string.IsNullOrEmpty(userEdit.PostCode))
                            physiotherapistFromDb.PostCode = userEdit.PostCode;
                        if (!string.IsNullOrEmpty(userEdit.Pesel))
                            physiotherapistFromDb.Pesel = userEdit.Pesel;
                        if (userEdit.DateOfBirth.HasValue && userEdit.DateOfBirth.Value != DateTime.MinValue)
                            physiotherapistFromDb.DateOfBirth = userEdit.DateOfBirth.Value;
                        if (!string.IsNullOrEmpty(userEdit.LicenseNumber))
                            physiotherapistFromDb.LicenseNumber = userEdit.LicenseNumber;
                        if (!string.IsNullOrEmpty(userEdit.PhoneNumber))
                            physiotherapistFromDb.PhoneNumber = userEdit.PhoneNumber;
                        physiotherapistFromDb.LastModifiedDate = DateTime.UtcNow;
                        var validateErrorsFromPhysiotherapist = _accountValidationHelper.Validate(physiotherapistFromDb);
                        if (validateErrorsFromPhysiotherapist.Length > 0)
                        {
                            return response = new ServiceResponse<IUserInfoResponseDTO>("Validation error") { Success = false, Errors = validateErrorsFromPhysiotherapist };
                        }
                        _context.Physiotherapists.Update(physiotherapistFromDb);
                        await _context.SaveChangesAsync();

                        PhysiotherapistInfoResponseDTO responsePhysiotherapistDTO = new PhysiotherapistInfoResponseDTO(physiotherapistFromDb);
                        response.Data = responsePhysiotherapistDTO;
                        break;
                }

     
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

        public async Task<ServiceResponse<IUserInfoResponseDTO>> GetUserInfo(Guid userId, string userRole)
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
