using fizjobackend.Entities.UserEntities;
using fizjobackend.Interfaces.DTOInterfaces.UserDTOInterfaces;
using fizjobackend.Models.UserDTOs;

namespace fizjobackend.Interfaces.UsersInterfaces
{
    public interface IUserService
    {
        Task<ServiceResponse<IUserInfoResponseDTO>> EditUserInfo(Guid userId, string userRole, UserEditRequestDTO userEdit);
        Task<ServiceResponse<IUserInfoResponseDTO>> GetUserInfo(Guid userId, string userRole);
    }
}
