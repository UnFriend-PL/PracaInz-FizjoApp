using fizjobackend.DbContexts;
using fizjobackend.Models.BodyVisualizerDTOs;
using fizjobackend.Models.TreatmentsDTOs;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;

namespace fizjobackend.Services.Treatments
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

        public async Task<ServiceResponse<IEnumerable<TreatmentsAutoCompleteResponseDTO>>> GetTreatments(Guid userId)
        {
            ServiceResponse<IEnumerable<TreatmentsAutoCompleteResponseDTO>> response;

            try
            {
                var treatments = await _context.Treatments
                    .AsNoTracking()
                    .AsQueryable()
                    .ToListAsync();
                var treatmentsDTO = treatments.Select(t => new TreatmentsAutoCompleteResponseDTO(t)).ToList();
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
