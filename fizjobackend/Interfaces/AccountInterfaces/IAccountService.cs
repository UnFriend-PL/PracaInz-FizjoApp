using fizjobackend.Models.AccountDTOs;

namespace fizjobackend.Interfaces.AccountInterfaces
{
    public interface IAccountService
    {
        Task<ServiceResponse<bool>> RegisterPatientAccount(PatientRegisterRequestDTO patient);
        Task<ServiceResponse<bool>> RegisterPhysiotherapistAccount(PhysiotherapisRegistertRequestDTO physiotherapist);
        Task<ServiceResponse<string>> Login(LoginRequestDTO login);
        Task<ServiceResponse<string>> RefreshSession(string refreshToken);
    }
}
