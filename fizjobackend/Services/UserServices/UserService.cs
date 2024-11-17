using Azure;
using Fizjobackend;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Fizjobackend.DbContexts;
using Fizjobackend.Entities.UserEntities;
using Fizjobackend.Helpers;
using Fizjobackend.Models.UserDTOs;

namespace Fizjobackend.Services.UserServices
{
    public class UserService : IUserService
    {

        private readonly FizjoDbContext _context;
        private readonly ILogger<UserService> _logger;
        private readonly IAccountValidationHelper _accountValidationHelper;
        private readonly string _imageAvatarDirectory = Path.Combine(Directory.GetCurrentDirectory(), "Images/Avatars");
        private const long MaxFileSize = 5 * 1024 * 1024; // 5MB
        public UserService(FizjoDbContext context, ILogger<UserService> logger, IAccountValidationHelper accountValidationHelper)
        {
            _context = context;
            _logger = logger;
            _accountValidationHelper = accountValidationHelper;
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

        public async Task<ServiceResponse<IUserInfoResponseDTO>> UpdateInfo(Guid userId, UpdateUserInfoRequestDTO updateUserInfoRequest, IEnumerable<string> userRoles)
        {
            ServiceResponse<IUserInfoResponseDTO> response;

            try
            {
                var userRole = GetBaseRoleFromUserRoles(userRoles);
                if (userRole.ToLower() == "patient" && userId != updateUserInfoRequest.userId)
                {
                    response = new ServiceResponse<IUserInfoResponseDTO>("You can only update your own info");
                    response.Success = false;
                    return response;
                }

                var user = await _context.Users.FindAsync(userId);
                if (user == null)
                {
                    response = new ServiceResponse<IUserInfoResponseDTO>("User not found");
                    response.Success = false;
                    response.Message = "User not found";
                    return response;
                }
                var validateErrors = _accountValidationHelper.Validate(UpdateUser(updateUserInfoRequest, user));
                if (validateErrors.Length > 0)
                {
                    return new ServiceResponse<IUserInfoResponseDTO>("Validation error") { Success = false, Errors = validateErrors };
                }

                await _context.SaveChangesAsync();
                response = new ServiceResponse<IUserInfoResponseDTO>("User info updated");
                return response;
            }
            catch (Exception ex)
            {
                response = new ServiceResponse<IUserInfoResponseDTO>("An error occurred while updating user info");
                _logger.LogError(ex, "An error occurred while updating user info");
                response.Success = false;
                response.Errors = new[] { ex.Message };
            }
            return response;
        }

        private static User UpdateUser(UpdateUserInfoRequestDTO updateUserInfoRequest, User user)
        {
            if (!string.IsNullOrEmpty(updateUserInfoRequest.Email) && user.Email != updateUserInfoRequest.Email)
            {
                user.Email = updateUserInfoRequest.Email;
            }

            if (!string.IsNullOrEmpty(updateUserInfoRequest.PhoneNumber) && user.PhoneNumber != updateUserInfoRequest.PhoneNumber)
            {
                user.PhoneNumber = updateUserInfoRequest.PhoneNumber;
            }

            if (!string.IsNullOrEmpty(updateUserInfoRequest.FirstName) && user.FirstName != updateUserInfoRequest.FirstName)
            {
                user.FirstName = updateUserInfoRequest.FirstName;
            }

            if (!string.IsNullOrEmpty(updateUserInfoRequest.LastName) && user.LastName != updateUserInfoRequest.LastName)
            {
                user.LastName = updateUserInfoRequest.LastName;
            }
            if (!string.IsNullOrEmpty(updateUserInfoRequest.City) && user.City != updateUserInfoRequest.City)
            {
                user.City = updateUserInfoRequest.City;
            }
            if (!string.IsNullOrEmpty(updateUserInfoRequest.Country) && user.Country != updateUserInfoRequest.Country)
            {
                user.Country = updateUserInfoRequest.Country;
            }
            if (!string.IsNullOrEmpty(updateUserInfoRequest.StreetWithHouseNumber) && user.StreetWithHouseNumber != updateUserInfoRequest.StreetWithHouseNumber)
            {
                user.StreetWithHouseNumber = updateUserInfoRequest.StreetWithHouseNumber;
            }
            if (!string.IsNullOrEmpty(updateUserInfoRequest.PostCode) && user.PostCode != updateUserInfoRequest.PostCode)
            {
                user.PostCode = updateUserInfoRequest.PostCode;
            }
            if (!string.IsNullOrEmpty(updateUserInfoRequest.Pesel) && user.Pesel != updateUserInfoRequest.Pesel)
            {
                user.Pesel = updateUserInfoRequest.Pesel;
            }
            if (updateUserInfoRequest.DateOfBirth != DateTime.MinValue && user.DateOfBirth != updateUserInfoRequest.DateOfBirth)
            {
                user.DateOfBirth = updateUserInfoRequest.DateOfBirth;
            }
            return user;
        }

        public async Task<ServiceResponse<string>> UploadAvatar(Guid userId, IFormFile avatarFile)
        {
            ServiceResponse<string> response;
            try
            {
                if (avatarFile == null || avatarFile.Length == 0)
                {
                    response = new ServiceResponse<string>("No file uploaded")
                    {
                        Success = false
                    };
                    return response;
                }

                if (avatarFile.Length > MaxFileSize)
                {
                    response = new ServiceResponse<string>("File is too large")
                    {
                        Success = false
                    };
                    return response;
                }

                var permittedExtensions = new[] { ".jpg", ".jpeg", ".png" };
                var extension = Path.GetExtension(avatarFile.FileName).ToLowerInvariant();

                if (string.IsNullOrEmpty(extension) || !permittedExtensions.Contains(extension))
                {
                    response = new ServiceResponse<string>("Invalid file type")
                    {
                        Success = false
                    };
                    return response;
                }

                var user = await _context.Users.FindAsync(userId);

                if (user == null)
                {
                    response = new ServiceResponse<string>("User not found")
                    {
                        Success = false
                    };
                    return response;
                }

                if (!Directory.Exists(_imageAvatarDirectory))
                    Directory.CreateDirectory(_imageAvatarDirectory);

                var filename = GetAvatarPath(userId, extension, true);
                var avatarPath = Path.Combine(_imageAvatarDirectory, filename);
                using (var stream = new FileStream(avatarPath, FileMode.Create))
                {
                    await avatarFile.CopyToAsync(stream);
                }

                // Save only the relative path
                user.AvatarPath = filename;
                await _context.SaveChangesAsync();

                response = new ServiceResponse<string>("Avatar uploaded")
                {
                    Success = true,
                    Data = filename // Return the relative path
                };
            }
            catch (UnauthorizedAccessException ex)
            {
                _logger.LogError(ex, "Unauthorized access while uploading avatar");
                response = new ServiceResponse<string>("Unauthorized access")
                {
                    Success = false,
                    Errors = new[] { ex.Message }
                };
            }
            catch (PathTooLongException ex)
            {
                _logger.LogError(ex, "Path too long while uploading avatar");
                response = new ServiceResponse<string>("Path too long")
                {
                    Success = false,
                    Errors = new[] { ex.Message }
                };
            }
            catch (DirectoryNotFoundException ex)
            {
                _logger.LogError(ex, "Directory not found while uploading avatar");
                response = new ServiceResponse<string>("Directory not found")
                {
                    Success = false,
                    Errors = new[] { ex.Message }
                };
            }
            catch (IOException ex)
            {
                _logger.LogError(ex, "IO error while uploading avatar");
                response = new ServiceResponse<string>("IO error")
                {
                    Success = false,
                    Errors = new[] { ex.Message }
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while uploading avatar");
                response = new ServiceResponse<string>("An error occurred while uploading avatar")
                {
                    Success = false,
                    Errors = new[] { ex.Message }
                };
            }

            return response;
        }

        public async Task<ServiceResponse<FileStreamResult>> GetAvatarFile(string avatarPath)
        {
            ServiceResponse<FileStreamResult> response;
            try
            {
                if (string.IsNullOrEmpty(avatarPath))
                {
                    response = new ServiceResponse<FileStreamResult>("No avatar path provided")
                    {
                        Success = false
                    };
                    return response;
                }

                var fullPath = Path.Combine(_imageAvatarDirectory, avatarPath);

                if (!File.Exists(fullPath))
                {
                    response = new ServiceResponse<FileStreamResult>("Avatar not found")
                    {
                        Success = false
                    };
                    return response;
                }

                var imageStream = File.OpenRead(fullPath);
                var fileResult = new FileStreamResult(imageStream, "image/jpeg");
                response = new ServiceResponse<FileStreamResult>("Avatar found")
                {
                    Success = true,
                    Data = fileResult
                };
            }
            catch (UnauthorizedAccessException ex)
            {
                _logger.LogError(ex, "Unauthorized access while getting avatar");
                response = new ServiceResponse<FileStreamResult>("Unauthorized access")
                {
                    Success = false,
                    Errors = new[] { ex.Message }
                };
            }
            catch (PathTooLongException ex)
            {
                _logger.LogError(ex, "Path too long while getting avatar");
                response = new ServiceResponse<FileStreamResult>("Path too long")
                {
                    Success = false,
                    Errors = new[] { ex.Message }
                };
            }
            catch (DirectoryNotFoundException ex)
            {
                _logger.LogError(ex, "Directory not found while getting avatar");
                response = new ServiceResponse<FileStreamResult>("Directory not found")
                {
                    Success = false,
                    Errors = new[] { ex.Message }
                };
            }
            catch (IOException ex)
            {
                _logger.LogError(ex, "IO error while getting avatar");
                response = new ServiceResponse<FileStreamResult>("IO error")
                {
                    Success = false,
                    Errors = new[] { ex.Message }
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while getting avatar");
                response = new ServiceResponse<FileStreamResult>("An error occurred while getting avatar")
                {
                    Success = false,
                    Errors = new[] { ex.Message }
                };
            }

            return response;
        }

        private string GetAvatarPath(Guid userId, string extension, bool creatingPathMode = false)
        {
            var avatarPath = $"avatar-{userId}{extension}";
            var fullPath = Path.Combine(_imageAvatarDirectory, avatarPath);
            if (!File.Exists(fullPath) && !creatingPathMode)
            {
                return "avatar-default.png";
            }
            return avatarPath;
        }

    }
}
