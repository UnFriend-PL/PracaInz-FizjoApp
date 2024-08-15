using fizjobackend.Interfaces.DTOInterfaces.UserDTOInterfaces;

namespace fizjobackend.Interfaces.UsersInterfaces
{
    public interface IUserService
    {
        Task<ServiceResponse<IUserInfoResponseDTO>> GetUserInfo(Guid userId, string userRole);
    }
}
