using fizjobackend.DbContexts;
using fizjobackend.Entities.PatientEntities;
using fizjobackend.Entities.UserEntities;
using fizjobackend.Helpers;
using fizjobackend.Interfaces.AccountInterfaces;
using fizjobackend.Models.AccountDTOs;
using Microsoft.AspNetCore.Identity;


namespace fizjobackend.Services.AccountService
{
    public class AccountService : IAccountService
    {   
        private readonly FizjoDbContext _context;
        private readonly UserManager<User> _userManager;
        private readonly IAccountService _accountService;

        public AccountService(FizjoDbContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        public async Task<ServiceResponse<string>> Login(LoginDTO login)
        {
            throw new NotImplementedException();
        }

        public async Task<ServiceResponse<bool>> RegisterPatientAccount(RegisterPatientDTO patient)
        {
            try
            {
                if (await UserExists(patient.Email))
                {
                    return new ServiceResponse<bool>("User already exists") { Success = false };
                }
                if (patient.Password != patient.ConfirmPassword)
                {
                    return new ServiceResponse<bool>("Passwords do not match") { Success = false };
                }
                var user = new Patient(patient);
                var userWithHashedPassword = await _userManager.CreateAsync(user, patient.Password);
                if (!userWithHashedPassword.Succeeded)
                {
                    var errors = userWithHashedPassword.Errors.Select(e => e.Description).ToArray();
                    return new ServiceResponse<bool>("User creation failed") { Success = false, Errors = errors };
                }
                AccountValidationHelper validator = new AccountValidationHelper(user);
                if (!validator.Validate(out string[] validateErrors))
                {
                    return new ServiceResponse<bool> ("Validation error"){ Success = false, Errors = validateErrors };
                }
                return new ServiceResponse<bool>("User registered successfully") { Data = true };
            }
            catch(Exception ex)
            {
                return new ServiceResponse<bool>("An error occured") { Success = false, Errors = [ex.Message] };
            }
        }

        public async Task<ServiceResponse<bool>> RegisterPhysiotherapistAccount(RegisterPhisiotherapistDTO phisiotherapist)
        {
            throw new NotImplementedException();
        }

        private async Task<bool> UserExists(string email)
        {
            return await _userManager.FindByEmailAsync(email) != null;
        }
    }
}
