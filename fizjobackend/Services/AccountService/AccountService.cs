using fizjobackend.DbContexts;
using fizjobackend.Entities.PatientEntities;
using fizjobackend.Entities.PhysiotherapistEntities;
using fizjobackend.Entities.UserEntities;
using fizjobackend.Interfaces.AccountInterfaces;
using fizjobackend.Interfaces.RegisterDTOInterfaces;
using fizjobackend.Models.AccountDTOs;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using System.Security.Cryptography;

namespace fizjobackend.Services.AccountService
{
    public class AccountService : IAccountService
    {
        private readonly FizjoDbContext _context;
        private readonly UserManager<User> _userManager;
        private readonly ILogger<AccountService> _logger;
        private readonly IConfiguration _configuration;
        private readonly IJwtGenerator _jwtGenerator;

        public AccountService(FizjoDbContext context, UserManager<User> userManager, ILogger<AccountService> logger, IConfiguration configuration, IJwtGenerator jwtGenerator)
        {
            _context = context;
            _userManager = userManager;
            _logger = logger;
            _configuration = configuration;
            _jwtGenerator = jwtGenerator;
        }

        public async Task<ServiceResponse<string>> Login(LoginRequestDTO login)
        {
            try
            {
                var user = await _userManager.FindByEmailAsync(login.Email);
                if (user == null || !await _userManager.CheckPasswordAsync(user, login.Password))
                {
                    return new ServiceResponse<string>("Invalid login attempt") { Success = false };
                }

                var token = _jwtGenerator.GenerateJwtToken(user);
                return new ServiceResponse<string>("Login successful") { Data = token };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred");
                return new ServiceResponse<string>("An error occurred") { Success = false, Errors = new[] { ex.Message } };
            }
        }

        public async Task<ServiceResponse<bool>> RegisterPatientAccount(PatientRegisterRequestDTO patient)
        {
            return await RegisterUserAccount<PatientRegisterRequestDTO>(patient);
        }

        public async Task<ServiceResponse<bool>> RegisterPhysiotherapistAccount(PhysiotherapisRegistertRequestDTO physiotherapist)
        {
            return await RegisterUserAccount<PhysiotherapisRegistertRequestDTO>(physiotherapist);
        }

        public async Task<ServiceResponse<string>> RefreshSession(string refreshToken)
        {
            try
            {
                var principal = _jwtGenerator.RefreshJwtToken(refreshToken);
                if (principal == null)
                {
                    return new ServiceResponse<string>("Invalid refresh token") { Success = false };
                }

                var userId = principal.FindFirstValue(ClaimTypes.NameIdentifier);
                var user = await _userManager.FindByIdAsync(userId);
                if (user == null)
                {
                    return new ServiceResponse<string>("User not found") { Success = false };
                }

                var newToken = _jwtGenerator.GenerateJwtToken(user);
                return new ServiceResponse<string>("Token refreshed successfully") { Data = newToken };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while refreshing the token");
                return new ServiceResponse<string>("An error occurred") { Success = false, Errors = new[] { ex.Message } };
            }
        }


        private async Task<ServiceResponse<bool>> RegisterUserAccount<T>(T userDto) where T : IUserRegisterDTO
        {
            try
            {
                if (await UserExists(userDto.Email))
                {
                    return new ServiceResponse<bool>("User already exists") { Success = false };

                }
                if (userDto.Password != userDto.ConfirmPassword)
                {
                    return new ServiceResponse<bool>("Passwords do not match") { Success = false };
                }
                var user = CreateUserInstance(userDto);
                if (user == null)
                {
                    return new ServiceResponse<bool>("Invalid user type") { Success = false };
                }

                var result = await _userManager.CreateAsync(user, userDto.Password);
                if (!result.Succeeded)
                {
                    var errors = result.Errors.Select(e => e.Description).ToArray();
                    return new ServiceResponse<bool>("User creation failed") { Success = false, Errors = errors };
                }

                return new ServiceResponse<bool>("User registered successfully") { Data = true };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred");
                return new ServiceResponse<bool>("An error occurred") { Success = false, Errors = new[] { ex.Message } };
            }
        }

        private User CreateUserInstance<T>(T userDto) where T : IUserRegisterDTO
        {
            if (userDto is PatientRegisterRequestDTO patient)
            {
                return new Patient(patient);
            }
            else if (userDto is PhysiotherapisRegistertRequestDTO physiotherapist)
            {
                return new Physiotherapist(physiotherapist);
            }
            throw new Exception("Invalid user type");
        }

        private async Task<bool> UserExists(string email)
        {
            return await _userManager.FindByEmailAsync(email) != null;
        }

        private string CreateRandomConfirmationToken()
        {
            return Convert.ToHexString(RandomNumberGenerator.GetBytes(64));
        }
    }
}
