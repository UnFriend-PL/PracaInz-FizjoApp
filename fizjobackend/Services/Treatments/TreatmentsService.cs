using Fizjobackend.DbContexts;
using Fizjobackend.Entities.TreatmentsEntities;
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
            var response = new ServiceResponse<IEnumerable<TreatmentsAutoCompleteResponseDTO>>("Treatments retrieved");

            try
            {
                var searchWords = GetSearchWords(request.SearchTerm);
                var requestBodyParts = GetRequestBodyParts(request.BodyParts);

                var query = _context.Treatments
                    .AsNoTracking()
                    .AsSplitQuery()
                    .Where(t => t.Gender == request.Gender);

                query = ApplyBodyPartsFilters(query, requestBodyParts);
                query = ApplySearchWordsFilters(query, searchWords);

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

                response.Data = treatmentsDTO;
                response.Success = true;
                response.Message = "Treatments retrieved";
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = "An error occurred while retrieving treatments";
                response.Errors = new[] { ex.Message };
                _logger.LogError(ex, "An error occurred while retrieving treatments");
            }

            return response;
        }

        private string[] GetSearchWords(string searchTerm)
        {
            return string.IsNullOrWhiteSpace(searchTerm)
                ? Array.Empty<string>()
                : searchTerm.ToLower().Split(' ', StringSplitOptions.RemoveEmptyEntries);
        }

        private List<string[]> GetRequestBodyParts(IEnumerable<string> bodyParts)
        {
            return bodyParts == null
                ? new List<string[]>()
                : bodyParts
                    .Select(bp => bp.ToLower().Replace(" ", "-").Split('-'))
                    .ToList();
        }

        private IQueryable<Treatment> ApplyBodyPartsFilters(
            IQueryable<Treatment> query, List<string[]> requestBodyParts)
        {
            foreach (var part in requestBodyParts)
            {
                if (part.Length == 2)
                {
                    string bodySidePart = part[0];
                    string sectionNamePart = part[1];

                    query = query.Where(t =>
                        t.BodySide.ToLower().Contains(bodySidePart) &&
                        t.SectionName.ToLower().Contains(sectionNamePart)
                    );
                }
                else if (part.Length == 3)
                {
                    string bodySidePart = part[0];
                    string sectionNamePart = part[1];
                    string viewNamePart = part[2];

                    query = query.Where(t =>
                        t.BodySide.ToLower().Contains(bodySidePart) &&
                        t.SectionName.ToLower().Contains(sectionNamePart) &&
                        t.ViewName.ToLower().Contains(viewNamePart)
                    );
                }
            }

            return query;
        }

        private IQueryable<Treatment> ApplySearchWordsFilters(
            IQueryable<Treatment> query, string[] searchWords)
        {
            if (searchWords.Length == 0)
                return query;

            query = query.Where(t =>
                searchWords.Any(sw =>
                    t.Name.ToLower().Contains(sw) ||
                    t.NamePL.ToLower().Contains(sw) ||
                    t.ViewName.ToLower().Contains(sw) ||
                    t.ViewNamePL.ToLower().Contains(sw) ||
                    t.SectionName.ToLower().Contains(sw) ||
                    t.BodySide.ToLower().Contains(sw) ||
                    t.BodySidePL.ToLower().Contains(sw) ||
                    t.Description.ToLower().Contains(sw) ||
                    t.DescriptionPL.ToLower().Contains(sw)
                )
            );

            return query;
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