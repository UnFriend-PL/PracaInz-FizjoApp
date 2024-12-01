using fizjobackend.Models.StaffDTOs;
using Fizjobackend.Models.StaffDTOs;

namespace Fizjobackend.Services.StaffService;

public interface IStaffService
{
    Task<ServiceResponse<StaffWrapperResponseDTO>> GetAllStaff(string? searchTerm, double? averagePrice, string? city, int pageNumber, int pageSize);
    Task<ServiceResponse<StaffResponseDTO>> GetStaffById(Guid id);
    Task<ServiceResponse<UpdateStaffInfoResponseDTO>> UpdateStaff(Guid guid, UpdateStaffInfoRequestDTO updateUserInfoRequest, IEnumerable<string> userRoles);
}