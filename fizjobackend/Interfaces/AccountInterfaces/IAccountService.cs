using fizjobackend.Models.AccountDTOs;

namespace fizjobackend.Interfaces.AccountInterfaces
{
    public interface IAccountService
    {
        Task<ServiceResponse<bool>> RegisterPatientAccount(PatientRegisterDTO patient);
        Task<ServiceResponse<bool>> RegisterPhysiotherapistAccount(PhysiotherapisRegistertDTO physiotherapist);
        Task<ServiceResponse<string>> Login(LoginDTO login);
        Task<ServiceResponse<string>> RefreshSession(string refreshToken);
    }
}
