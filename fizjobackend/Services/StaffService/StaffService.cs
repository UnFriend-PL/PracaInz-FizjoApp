using Fizjobackend.DbContexts;
using Fizjobackend.Models.StaffDTOs;
using Microsoft.EntityFrameworkCore;

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
}