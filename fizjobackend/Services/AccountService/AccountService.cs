using fizjobackend.DbContexts;
using fizjobackend.Entities.PatientEntities;
using fizjobackend.Entities.PhysiotherapistEntities;
using fizjobackend.Entities.UserEntities;
using fizjobackend.Interfaces.AccountInterfaces;
using fizjobackend.Interfaces.RegisterDTOInterfaces;
using fizjobackend.Models.AccountDTOs;
using Microsoft.AspNetCore.Identity;

namespace fizjobackend.Services.AccountService
{
    public class AccountService : IAccountService
    {   
        private readonly FizjoDbContext _context;
        private readonly UserManager<User> _userManager;

        public AccountService(FizjoDbContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        public async Task<ServiceResponse<string>> Login(LoginDTO login)
        {
            throw new NotImplementedException();
        }

        public async Task<ServiceResponse<bool>> RegisterPatientAccount(PatientRegisterDTO patient)
        {
            return await RegisterUserAccount<PatientRegisterDTO>(patient);
        }

        public async Task<ServiceResponse<bool>> RegisterPhysiotherapistAccount(PhysiotherapisRegistertDTO physiotherapist)
        {
            return await RegisterUserAccount<PhysiotherapisRegistertDTO>(physiotherapist);
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
                return new ServiceResponse<bool>("An error occurred") { Success = false, Errors = new[] { ex.Message } };
            }
        }

        private User CreateUserInstance<T>(T userDto) where T : IUserRegisterDTO
        {
            if(userDto is PatientRegisterDTO patient)
            {
                return new Patient(patient);
            }
            else if(userDto is PhysiotherapisRegistertDTO physiotherapist)
            {
                return new Physiotherapist(physiotherapist);
            }
            throw new Exception("Invalid user type");
        }

        private async Task<bool> UserExists(string email)
        {
            return await _userManager.FindByEmailAsync(email) != null;
        }
    }
}
