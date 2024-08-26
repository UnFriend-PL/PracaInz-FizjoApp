using fizjobackend.DbContexts;
using fizjobackend.Entities.PatientEntities;
using fizjobackend.Entities.PhysiotherapistEntities;
using fizjobackend.Entities.UserEntities;
using fizjobackend.Interfaces.DTOInterfaces.RegisterDTOInterfaces;
using fizjobackend.Interfaces.DTOInterfaces.UserDTOInterfaces;
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

        public UserService(FizjoDbContext context, ILogger<UserService> logger)
        {
            _context = context;
            _logger = logger;
        }

        //private User EditUserInstance<T>(T userEditDto) where T : IUserEditRequestDTO
        //{
        //    if (userEditDto is PatientEditRequestDTO patient)
        //    {
        //        return new Patient(patient);
        //    }
        //    else if (userEditDto is PhysiotherapistEditRequestDTO physiotherapist)
        //    {
        //        return new Physiotherapist(physiotherapist);
        //    }
        //    throw new Exception("Invalid user type");
        //}

        public async Task<ServiceResponse<IUserInfoResponseDTO>> EditUserInfo(Guid userId, string userRole, UserEditRequestDTO userEdit) 
        {
            ServiceResponse<IUserInfoResponseDTO> response = new ServiceResponse<IUserInfoResponseDTO>("");

            try
            {
                switch (userRole.ToLower())
                {
                    case "patient":
                        var userEditedInstance = new PatientEditRequestDTO
                        {
                            FirstName = userEdit.FirstName,
                            LastName = userEdit.LastName,
                            Gender = userEdit.Gender,
                            Country = userEdit.Country,
                            City = userEdit.City,
                            StreetWithHouseNumber = userEdit.StreetWithHouseNumber,
                            PostCode = userEdit.PostCode,
                            Pesel = userEdit.Pesel,
                            DateOfBirth = userEdit.DateOfBirth,
                            HealthInsuranceNumber = userEdit.HealthInsuranceNumber,
                            PhoneNumber = userEdit.PhoneNumber
                        };
                        //var newUser = EditUserInstance(userEditedInstance);
                        //var userFromDb = await _context.Patients.FindAsync(userId);
                        var userFromDb = new Patient(userEditedInstance, userId);
                        _context.Patients.Update(userFromDb);
                        await _context.SaveChangesAsync();
                        PatientInfoResponseDTO responseDTO = new PatientInfoResponseDTO(userFromDb);
                        response.Data = responseDTO;

                        break;
                }
     
            }
            catch (Exception ex)
            {
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
