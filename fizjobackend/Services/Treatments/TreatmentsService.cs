using Fizjobackend.DbContexts;
using Fizjobackend.Models.BodyVisualizerDTOs;
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

        public async Task<ServiceResponse<IEnumerable<TreatmentsAutoCompleteResponseDTO>>> GetTreatments(TreatmentAutoCompleteRequestDTO request)
        {
            ServiceResponse<IEnumerable<TreatmentsAutoCompleteResponseDTO>> response;
            var searchWords = request.SearchTerm.ToLower().Split(' ');
            var requestBodyPart = request.BodyPart.ToLower().Split("-");
            try
            {
                var query = _context.Treatments
                    .AsSplitQuery()
                    .AsNoTracking()
                    .AsQueryable();

                if (requestBodyPart.Length > 1)
                {
                    query = query.Where(t => t.BodySide.ToLower() == requestBodyPart[0] && t.SectionName.ToLower() == requestBodyPart[1]);
                }
                if( searchWords.Length > 2)
                {
                    query = query.Where(t => t.ViewName.ToLower() == requestBodyPart[2]);
                }
                
                if (searchWords.Length > 0)
                {
                    query = query.Where(t => searchWords.Any(sw => t.Name.ToLower().Contains(sw)) || searchWords.Any(sw => t.NamePL.ToLower().Contains(sw)));
                }
                if(request.OwnerId != null)
                {
                    query = query.Where(t => t.OwnerId == request.OwnerId);
                }
                
                var treatmentsDTO = await query.Select(t => new TreatmentsAutoCompleteResponseDTO(t)).ToListAsync();
                
                response = new ServiceResponse<IEnumerable<TreatmentsAutoCompleteResponseDTO>>(" Treatments retrieved");
                response.Data = treatmentsDTO;
                response.Success = true;
                response.Message = "Treatments retrieved";
            }
            catch (Exception ex)
            {
                response = new ServiceResponse<IEnumerable<TreatmentsAutoCompleteResponseDTO>>("An error occurred while retrieving treatments");
                _logger.LogError(ex, "An error occurred while retrieving treatments");
                response.Success = false;
                response.Errors = new[] { ex.Message };
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
