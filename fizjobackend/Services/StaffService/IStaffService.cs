using Fizjobackend.Entities.PhysiotherapistEntities;
using Fizjobackend.Models.AppointmentsDTOs;
using fizjobackend.Models.StaffDTOs;
using Fizjobackend.Models.StaffDTOs;

namespace Fizjobackend.Services.StaffService;

public interface IStaffService
{
    Task<ServiceResponse<StaffWrapperResponseDTO>> GetAllStaff(string? searchTerm, double? averagePrice, string? city, int pageNumber, int pageSize);
    Task<ServiceResponse<StaffResponseDTO>> GetStaffById(Guid id);
    Task<ServiceResponse<UpdateStaffInfoResponseDTO>> UpdateStaff(Guid guid, UpdateStaffInfoRequestDTO updateUserInfoRequest, IEnumerable<string> userRoles);
    Task<ServiceResponse<List<DateTimeOffset>>> GetAvailableSlots(WorkingHoursRequestDTO request);
    Task<ServiceResponse<bool>> SaveStaffWorkingHours(SaveWorkingHoursRequestDTO request);
    Task<ServiceResponse<List<WorkingHoursResponseDto>>> GetStaffWorkingHours(Guid physiotherapistId);
}