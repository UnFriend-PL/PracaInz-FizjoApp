using Azure;
using fizjobackend.Models.StaffDTOs;
using Fizjobackend.DbContexts;
using Fizjobackend.Entities.OpinionEntities;
using Fizjobackend.Entities.PhysiotherapistEntities;
using Fizjobackend.Models.AppointmentsDTOs;
using Fizjobackend.Models.OpinionDTOs;
using Fizjobackend.Models.StaffDTOs;
using Microsoft.EntityFrameworkCore;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Fizjobackend.Services.StaffService;

public class StaffService : IStaffService
{
    private readonly FizjoDbContext _dbContext;
    private readonly ILogger<StaffService> _logger;

    public StaffService(FizjoDbContext dbContext, ILogger<StaffService> logger)
    {
        _dbContext = dbContext;
        _logger = logger;
    }

    public async Task<ServiceResponse<StaffWrapperResponseDTO>> GetAllStaff(
        string? searchTerm,
        double? averagePrice,
        string? city,
        int pageNumber,
        int pageSize
    )
    {
        var response = new ServiceResponse<StaffWrapperResponseDTO>("Staff fetched");
        try
        {
            var query = _dbContext.Physiotherapists
                .Include(p => p.PhysiotherapySpecializations)
                .Include(p => p.Appointments.Where(a => a.Price > 0))
                .AsSplitQuery()
                .AsNoTracking();

            if (!string.IsNullOrEmpty(searchTerm))
            {
                string lowerSearchTerm = searchTerm.ToLower();
                query = query.Where(p =>
                    p.FirstName.ToLower().Contains(lowerSearchTerm) ||
                    p.LastName.ToLower().Contains(lowerSearchTerm) ||
                    p.Description.ToLower().Contains(lowerSearchTerm) ||
                    p.City.ToLower().Contains(lowerSearchTerm)
                );
            }

            if (!string.IsNullOrEmpty(city))
            {
                string lowerCity = city.ToLower();
                query = query.Where(p => p.City.ToLower().Contains(lowerCity));
            }

            var totalCount = await query.CountAsync();

            var staff = await query
                .Select(s => new StaffResponseDTO(s))
                .ToListAsync();

            var staffList = staff
                .Where(s => averagePrice == null || s.AveragePrice < averagePrice)
                .OrderBy(s => s.Rating)
                .ThenBy(s => s.AveragePrice)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToList();
            double? maxAveragePrice = staff.Max(s => s.AveragePrice);

            var pagedResponse =
                new StaffWrapperResponseDTO(staffList, pageNumber, pageSize, totalCount, maxAveragePrice);

            response.Data = pagedResponse;
        }
        catch (Exception ex)
        {
            response.Success = false;
            response.Message = ex.Message;
            _logger.LogError(ex.Message);
        }

        return response;
    }

    public async Task<ServiceResponse<StaffResponseDTO>> GetStaffById(Guid id)
    {
        var response = new ServiceResponse<StaffResponseDTO>("Staff fetched");
        try
        {
            //var rating = CalculateAverageRating(id);
            var staff = await _dbContext.Physiotherapists
                .Include(p => p.PhysiotherapySpecializations)
                .Include(p => p.Appointments.Where(a => a.IsPaid && a.Price > 0))
                .AsSplitQuery()
                .AsNoTracking()
                .FirstOrDefaultAsync(p => p.Id == id);

            if (staff == null)
            {
                response.Success = false;
                response.Message = "Staff not found";
                return response;
            }

            var staffResponse = new StaffResponseDTO(staff);
            response.Data = staffResponse;
        }
        catch (Exception ex)
        {
            response.Success = false;
            response.Message = ex.Message;
            _logger.LogError(ex.Message);
        }

        return response;
    }

    public async Task<ServiceResponse<UpdateStaffInfoResponseDTO>> UpdateStaff(
        Guid id,
        UpdateStaffInfoRequestDTO updateStaffInfoRequest,
        IEnumerable<string> userRoles)
    {
        ServiceResponse<UpdateStaffInfoResponseDTO> response = new ServiceResponse<UpdateStaffInfoResponseDTO>("");

        try
        {
            var role = GetBaseRoleFromUserRoles(userRoles);
            if (role != "Physiotherapist")
            {
                response.Success = false;
                response.Message = "Permission denied: Only physiotherapists can perform this action.";
                return response;
            }

            var physiotherapist = await _dbContext.Physiotherapists
                .Include(p => p.Appointments)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (physiotherapist == null)
            {
                response.Success = false;
                response.Message = "Physiotherapist not found.";
                return response;
            }

            if (!string.IsNullOrWhiteSpace(updateStaffInfoRequest.Description))
            {
                physiotherapist.Description = updateStaffInfoRequest.Description;
            }

            if (updateStaffInfoRequest.YearsOfExperience.HasValue)
            {
                physiotherapist.Experience = updateStaffInfoRequest.YearsOfExperience.Value;
            }

            if (!string.IsNullOrWhiteSpace(updateStaffInfoRequest.Education))
            {
                physiotherapist.Education = updateStaffInfoRequest.Education;
            }


            await _dbContext.SaveChangesAsync();

            var responseDto = new UpdateStaffInfoResponseDTO
            {
                Description = physiotherapist.Description,
                YearsOfExperience = physiotherapist.Experience,
                Education = physiotherapist.Education,
                NumberOfDoneAppointments = physiotherapist.Appointments?.Count ?? 0
            };

            response.Success = true;
            response.Data = responseDto;
            response.Message = "Physiotherapist information updated successfully.";
        }
        catch (Exception ex)
        {
            response.Success = false;
            response.Message = $"An error occurred: {ex.Message}";
        }

        return response;
    }

    public async Task<ServiceResponse<List<TimeSpan>>> GetAvailableSlots(WorkingHoursRequestDTO request)
    {
        ServiceResponse<List<TimeSpan>> response = new ServiceResponse<List<TimeSpan>>("Available slots fetched");
        var workingHours = await _dbContext.WorkingHours
            .FirstOrDefaultAsync(w =>
                w.PhysiotherapistId == request.PhysiotherapistId && w.DayOfWeek == request.Date.DayOfWeek);

        if (workingHours == null)
        {
            response.Data = new List<TimeSpan>();
            return response;
        }

        var appointments = await _dbContext.Appointments
            .Where(a => a.PhysiotherapistId == request.PhysiotherapistId && a.AppointmentDate.Date == request.Date.Date)
            .ToListAsync();

        var busySlots = appointments
            .Select(a => a.AppointmentDate.TimeOfDay)
            .ToHashSet();

        var availableSlots = new List<TimeSpan>();
        for (var time = workingHours.StartHour; time < workingHours.EndHour; time = time.Add(TimeSpan.FromHours(1)))
        {
            if (!busySlots.Contains(time))
                availableSlots.Add(time);
        }

        response.Data = availableSlots;

        return response;
    }

    public async Task<ServiceResponse<List<WorkingHoursResponseDto>>> GetStaffWorkingHours(Guid physiotherapistId)
    {
        var response = new ServiceResponse<List<WorkingHoursResponseDto>>("Working hours fetched");
        try
        {
            var workingHours = await _dbContext.WorkingHours.Where(wh => wh.PhysiotherapistId == physiotherapistId)
                .Select(whd => new WorkingHoursResponseDto()
                {
                    DayOfWeek = whd.DayOfWeek,
                    StartHour = whd.StartHour,
                    EndHour = whd.EndHour
                })
                .ToListAsync();
            
            response.Data = workingHours;
        }
        catch (Exception ex)
        {
            _logger.LogError($"");
        }

        return response;
    }
    
    public async Task<ServiceResponse<bool>> SaveStaffWorkingHours(SaveWorkingHoursRequestDTO request)
    {
        var response = new ServiceResponse<bool>("Working hours saved successfully");
        try
        {
            var dayOfWeek = Enum.Parse<DayOfWeek>(request.DayOfWeek);
            var startHour = TimeSpan.Parse(request.StartHour);
            var endHour = TimeSpan.Parse(request.EndHour);
            
            var exisitingDay = await _dbContext.WorkingHours
                .Where(w => w.PhysiotherapistId == request.PhysiotherapistId && w.DayOfWeek == dayOfWeek)
                .FirstOrDefaultAsync();

            if (exisitingDay == null)
            {
                var workingHours = new WorkingHours
                {
                    PhysiotherapistId = request.PhysiotherapistId,
                    DayOfWeek = dayOfWeek,
                    StartHour = startHour,
                    EndHour = endHour
                };
                _dbContext.WorkingHours.Add(workingHours);
            }
            else
            {
                exisitingDay.StartHour = startHour;
                exisitingDay.EndHour = endHour;
            }

            await _dbContext.SaveChangesAsync();
            return response;
        }
        catch (Exception ex)
        {
            response.Success = false;
            response.Message = ex.Message;
            _logger.LogError(ex.Message);
            return response;
        }
    }

    private string GetBaseRoleFromUserRoles(IEnumerable<string> userRoles)
    {
        var validRoles = new[] { "patient", "physiotherapist" };
        var userRole = userRoles.FirstOrDefault(role => validRoles.Contains(role.ToLower()));

        if (userRole == null || userRoles.Count(role => validRoles.Contains(role.ToLower())) > 1)
        {
            throw new ArgumentException("User must have exactly one role: either 'patient' or 'physiotherapist'");
        }

        return userRole;
    }
}