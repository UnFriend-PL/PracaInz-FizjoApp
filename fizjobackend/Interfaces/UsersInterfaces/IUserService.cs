using fizjobackend.Interfaces.DTOInterfaces.UserDTOInterfaces;
using fizjobackend.Models.UserDTOs;

namespace fizjobackend.Interfaces.UsersInterfaces
{
    public interface IUserService
    {
        Task<ServiceResponse<IUserInfoResponseDTO>> GetUserInfo(Guid userId, IEnumerable<string> userRoles);
        Task<ServiceResponse<IUserInfoResponseDTO>> FindPatient(SearchPatientRequestDTO searchParam, IEnumerable<string> userRoles);
        Task<ServiceResponse<IUserInfoResponseDTO>> UpdateInfo(Guid userId, UpdateUserInfoRequestDTO updateUserInfoRequest, IEnumerable<string> userRoles);
    }
}
