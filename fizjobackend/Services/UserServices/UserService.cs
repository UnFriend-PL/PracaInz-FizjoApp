using fizjobackend.DbContexts;
using fizjobackend.Entities.UserEntities;
using fizjobackend.Interfaces.DTOInterfaces.UserDTOInterfaces;
using fizjobackend.Interfaces.UsersInterfaces;
using fizjobackend.Models.UserDTOs;
using Microsoft.EntityFrameworkCore;

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

        public async Task<ServiceResponse<IUserInfoResponseDTO>> GetUserInfo(Guid userId, IEnumerable<string> userRoles)
        {
            ServiceResponse<IUserInfoResponseDTO> response;

            try
            {
                var userRole = GetBaseRoleFromUserRoles(userRoles);
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

        public async Task<ServiceResponse<IUserInfoResponseDTO>> FindPatient(SearchPatientRequestDTO searchParam, IEnumerable<string> searcherRoles)
        {
            ServiceResponse<IUserInfoResponseDTO> response;

            try
            {
                var patient = await _context.Patients.FirstOrDefaultAsync(p => p.Email == searchParam.SearchParam || p.PhoneNumber == searchParam.SearchParam || p.Pesel == searchParam.SearchParam);
                var userRole = GetBaseRoleFromUserRoles(searcherRoles);
                if (userRole.ToLower() != "physiotherapist")
                {
                    throw new UnauthorizedAccessException("Only physiotherapists can search for patients");
                }
                if (patient == null)
                {
                    response = new ServiceResponse<IUserInfoResponseDTO>("User not found");
                    response.Success = false;
                    response.Message = "User not found";
                    return response;
                }
                response = new ServiceResponse<IUserInfoResponseDTO>("User found");
                response.Data = new PatientInfoResponseDTO(patient);
                response.Success = true;
                response.Message = "User found";
                return response;
            }
            catch (Exception ex)
            {
                response = new ServiceResponse<IUserInfoResponseDTO>("An error occurred while finding user");
                _logger.LogError(ex, "An error occurred while finding user");
                response.Success = false;
                response.Errors = new[] { ex.Message };
            }

            return response;
        }

        private string GetBaseRoleFromUserRoles(IEnumerable<string> userRoles)
        {
            var validRoles = new[] { "patient", "physiotherapist" };
            var userRole = userRoles.FirstOrDefault(role => validRoles.Contains(role.ToLower()));

            if (userRole == null || userRoles.Count(role => validRoles.Contains(role.ToLower())) > 1)
            {
                throw new ArgumentException("User must have exactly one role: either 'patient' or 'physiotherapist'");
            }

            return userRole;
        }
        private User ModifyUser(User userToEdit, UserEditRequestDTO userEdit)
        {
            if (userToEdit.FirstName != userEdit.FirstName)
                userToEdit.FirstName = userEdit.FirstName;
            if (userToEdit.LastName != userEdit.LastName)
                userToEdit.LastName = userEdit.LastName;
            if (userToEdit.Email != userEdit.Email)
                userToEdit.Email = userEdit.Email;
            if (userToEdit.Gender != userEdit.Gender)
                userToEdit.Gender = userEdit.Gender;
            if (userToEdit.City != userEdit.City)
                userToEdit.City = userEdit.City;
            if (userToEdit.Country != userEdit.Country)
                userToEdit.Country = userEdit.Country;
            if (userToEdit.DateOfBirth != userEdit.DateOfBirth)
                userToEdit.DateOfBirth = userEdit.DateOfBirth;
            if (userToEdit.Pesel != userEdit.Pesel)
                userToEdit.Pesel = userEdit.Pesel;
            if (userToEdit.PostCode != userEdit.PostCode)
                userToEdit.PostCode = userEdit.PostCode;
            if (userToEdit.StreetWithHouseNumber != userEdit.StreetWithHouseNumber)
                userToEdit.StreetWithHouseNumber = userEdit.StreetWithHouseNumber;
            if (userToEdit.PhoneNumber != userEdit.PhoneNumber)
                userToEdit.PhoneNumber = userEdit.PhoneNumber;
            if (userToEdit.LastModifiedDate < DateTime.UtcNow)
                userToEdit.LastModifiedDate = DateTime.UtcNow;

            return userToEdit;
        }

        private User ModifyUser(User userToEdit, UserEditRequestDTO userEdit)
        {
            if (userToEdit.FirstName != userEdit.FirstName)
                userToEdit.FirstName = userEdit.FirstName;
            if (userToEdit.LastName != userEdit.LastName)
                userToEdit.LastName = userEdit.LastName;
            if (userToEdit.Email != userEdit.Email)
                userToEdit.Email = userEdit.Email;
            if (userToEdit.Gender != userEdit.Gender)
                userToEdit.Gender = userEdit.Gender;
            if (userToEdit.City != userEdit.City)
                userToEdit.City = userEdit.City;
            if (userToEdit.Country != userEdit.Country)
                userToEdit.Country = userEdit.Country;
            if (userToEdit.DateOfBirth != userEdit.DateOfBirth)
                userToEdit.DateOfBirth = userEdit.DateOfBirth;
            if (userToEdit.Pesel != userEdit.Pesel)
                userToEdit.Pesel = userEdit.Pesel;
            if (userToEdit.PostCode != userEdit.PostCode)
                userToEdit.PostCode = userEdit.PostCode;
            if (userToEdit.StreetWithHouseNumber != userEdit.StreetWithHouseNumber)
                userToEdit.StreetWithHouseNumber = userEdit.StreetWithHouseNumber;
            if (userToEdit.PhoneNumber != userEdit.PhoneNumber)
                userToEdit.PhoneNumber = userEdit.PhoneNumber;
            if (userToEdit.LastModifiedDate < DateTime.UtcNow)
                userToEdit.LastModifiedDate = DateTime.UtcNow;

            return userToEdit;
        }

    }
}
