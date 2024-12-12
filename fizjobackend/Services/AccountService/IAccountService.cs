using Fizjobackend.Models.AccountDTOs;

namespace Fizjobackend.Services.AccountService
{
    public interface IAccountService
    {
        Task<ServiceResponse<bool>> RegisterPatientAccount(PatientRegisterRequestDTO patient);
        Task<ServiceResponse<bool>> RegisterPhysiotherapistAccount(PhysiotherapisRegistertRequestDTO physiotherapist);
        Task<ServiceResponse<string>> Login(LoginRequestDTO login);
        Task<ServiceResponse<string>> RefreshSession(string refreshToken);
        Task<ServiceResponse<bool>> ConfirmEmail(string email, string token);

    }
}
