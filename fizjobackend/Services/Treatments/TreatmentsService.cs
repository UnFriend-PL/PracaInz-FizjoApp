using Fizjobackend.DbContexts;
using Fizjobackend.Models.TreatmentsDTOs;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;

namespace Fizjobackend.Services.Treatments
{
    public class TreatmentsService : ITreatmentsService
    {
        private readonly FizjoDbContext _context;
        private readonly ILogger<TreatmentsService> _logger;
        private readonly IMemoryCache _cache;

        public TreatmentsService(FizjoDbContext context, ILogger<TreatmentsService> logger, IMemoryCache cahe)
        {
            _context = context;
            _logger = logger;
            _cache = cahe;
        }

   public async Task<ServiceResponse<IEnumerable<TreatmentsAutoCompleteResponseDTO>>> GetTreatments(
    TreatmentAutoCompleteRequestDTO request)
{
    ServiceResponse<IEnumerable<TreatmentsAutoCompleteResponseDTO>> response;
    var searchWords = !string.IsNullOrWhiteSpace(request.SearchTerm)
        ? request.SearchTerm.ToLower().Split(' ', StringSplitOptions.RemoveEmptyEntries)
        : Array.Empty<string>();

    var requestBodyParts = request.BodyParts?.Select(bp => bp.ToLower().Replace(" ", "-").Split('-')).ToList() ?? new List<string[]>();
   
    try
    {
        var query = _context.Treatments
            .AsNoTracking()
            .AsSplitQuery()
            .AsQueryable()
            .Where(t => t.Gender == request.Gender)
            ;
        
        if (requestBodyParts.Count > 0)
        {
            foreach (var part in requestBodyParts)
            {
                if (part.Length == 2)
                {
                    query = query.Where(t =>
                        part.Any(bp => t.BodySide.ToLower().Contains(bp)) &&
                        part.Any(bp => t.SectionName.ToLower().Contains(bp))
                    );
                }
                else
                {
                    query = query.Where(t =>
                        part.Any(bp => t.BodySide.ToLower().Contains(bp)) &&
                        part.Any(bp => t.SectionName.ToLower().Contains(bp)) &&
                        part.Any(bp => t.ViewName.ToLower().Contains(bp))
                    );
                }
            }
        }
        
        if (searchWords.Length > 0)
        {
            query = query.Where(t =>
                searchWords.Any(sw => 
                    t.Name.ToLower().Contains(sw) || 
                    t.NamePL.ToLower().Contains(sw) || 
                    t.ViewName.ToLower().Contains(sw) || 
                    t.ViewNamePL.ToLower().Contains(sw) || 
                    t.SectionName.ToLower().Contains(sw) ||
                    t.BodySide.ToLower().Contains(sw) || 
                    t.BodySidePL.ToLower().Contains(sw) || 
                    t.DescriptionPL.ToLower().Contains(sw) ||
                    t.Description.ToLower().Contains(sw)) // || 
                );
        }

        if (request.OwnerId != null)
        {
            // query = query.Where(t => t.OwnerId == request.OwnerId || t.OwnerId == null);
        }

        var treatmentsDTO = await query
            .Distinct()
            .OrderBy(t => t.Name)
            .Skip((request.Page - 1) * request.Limit)
            .Take(request.Limit)
            .Select(t => new TreatmentsAutoCompleteResponseDTO(t))
            .ToListAsync();

        response = new ServiceResponse<IEnumerable<TreatmentsAutoCompleteResponseDTO>>("Treatments retrieved")
        {
            Data = treatmentsDTO,
            Success = true,
            Message = "Treatments retrieved"
        };
    }
    catch (Exception ex)
    {
        response = new ServiceResponse<IEnumerable<TreatmentsAutoCompleteResponseDTO>>(
            "An error occurred while retrieving treatments")
        {
            Success = false,
            Errors = new[] { ex.Message }
        };
        _logger.LogError(ex, "An error occurred while retrieving treatments");
    }

    return response;
}

        public async Task<ServiceResponse<TreatmentResponseDTO>> GetTreatment(TreatmentRequestDTO treatmentRequest)
        {
            ServiceResponse<TreatmentResponseDTO> response;

            try
            {
                var treatment = await _context.Treatments
                    .AsSplitQuery()
                    .AsNoTracking()
                    .Include(t => t.Muscles)
                    .Include(t => t.Joints)
                    .Where(t => t.Id == treatmentRequest.Id)
                    .AsQueryable()
                    .FirstOrDefaultAsync();
                if (treatment == null)
                {
                    response = new ServiceResponse<TreatmentResponseDTO>("Treatment not found") { Success = false };
                    return response;
                }

                var treatmentDTO = new TreatmentResponseDTO(treatment, treatmentRequest.Gender);
                response = new ServiceResponse<TreatmentResponseDTO>("Treatment retrieved");
                response.Data = treatmentDTO;
                response.Success = true;
                response.Message = "Treatment retrieved";
            }
            catch (Exception ex)
            {
                response = new ServiceResponse<TreatmentResponseDTO>("An error occurred while retrieving treatment");
                _logger.LogError(ex, "An error occurred while retrieving treatment");
                response.Success = false;
                response.Errors = new[] { ex.Message };
            }

            return response;
        }
    }
}