using fizjobackend.Models.AccountDTOs;

namespace fizjobackend.Interfaces.AccountInterfaces
{
    public interface IAccountService
    {
        Task<ServiceResponse<bool>> RegisterPatientAccount(RegisterPatientDTO patient);
        Task<ServiceResponse<bool>> RegisterPhysiotherapistAccount(RegisterPhisiotherapistDTO phisiotherapist);
        Task<ServiceResponse<string>> Login(LoginDTO login);
    }
}
