using Azure;
using fizjobackend.Models.StaffDTOs;
using Fizjobackend.DbContexts;
using Fizjobackend.Entities.OpinionEntities;
using Fizjobackend.Entities.PhysiotherapistEntities;
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
            
            var pagedResponse = new StaffWrapperResponseDTO(staffList, pageNumber, pageSize, totalCount, maxAveragePrice);
            
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

    //private async Task<ServiceResponse<double>> CalculateAverageRating(Guid physiotherapistId)
    //{
    //    try
    //    {
    //        var opinions = await _dbContext.Opinions
    //            .Where(o => o.PhysiotherapistId == physiotherapistId)
    //            .ToListAsync();

    //        if (!opinions.Any())
    //        {
    //            return new ServiceResponse<double>("No opinions found for the specified physiotherapist.")
    //            {
    //                Success = false
    //            };
    //        }

    //        double totalRating = opinions.Sum(o => o.Rating);
    //        double averageRating = Math.Floor(totalRating / opinions.Count);
    //        averageRating = Math.Round(averageRating * 2) / 2;


    //        return new ServiceResponse<double>("Average rating calculated successfully.")
    //        {
    //            Success = true,
    //            Data = averageRating
    //        };
    //    }
    //    catch (Exception ex)
    //    {
    //        return new ServiceResponse<double>($"An error occurred: {ex.Message}")
    //        {
    //            Success = false
    //        };
    //    }
    //}

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