using System.Linq.Expressions;
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
            var cacheKey =
                $"Treatments_{request.Gender}_{string.Join(",", request.BodyParts ?? new List<string>())}_{request.SearchTerm}_{request.Page}_{request.Limit}";
            if (_cache.TryGetValue(cacheKey, out IEnumerable<TreatmentsAutoCompleteResponseDTO> cachedTreatments))
            {
                return new ServiceResponse<IEnumerable<TreatmentsAutoCompleteResponseDTO>>(
                    "Treatments retrieved from cache")
                {
                    Data = cachedTreatments,
                    Success = true
                };
            }

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

                _cache.Set(cacheKey, treatmentsDTO, TimeSpan.FromMinutes(5));

                response.Data = treatmentsDTO;
                response.Success = true;
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
            if (requestBodyParts == null || !requestBodyParts.Any())
                return query;

            var parameter = Expression.Parameter(typeof(Treatment), "t");
            var conditions = new List<Expression>();

            foreach (var part in requestBodyParts)
            {
                Expression condition = null;

                if (part.Length == 2)
                {
                    string bodySidePart = part[0].ToLower();
                    string sectionNamePart = part[1].ToLower();

                    var bodySideCondition = Expression.Call(
                        Expression.Call(
                            Expression.Property(parameter, nameof(Treatment.BodySide)),
                            nameof(string.ToLower), Type.EmptyTypes),
                        nameof(string.Contains), null, Expression.Constant(bodySidePart));

                    var sectionNameCondition = Expression.Call(
                        Expression.Call(
                            Expression.Property(parameter, nameof(Treatment.SectionName)),
                            nameof(string.ToLower), Type.EmptyTypes),
                        nameof(string.Contains), null, Expression.Constant(sectionNamePart));

                    condition = Expression.AndAlso(bodySideCondition, sectionNameCondition);
                }
                else if (part.Length == 3)
                {
                    string bodySidePart = part[0].ToLower();
                    string sectionNamePart = part[1].ToLower();
                    string viewNamePart = part[2].ToLower();

                    var bodySideCondition = Expression.Call(
                        Expression.Call(
                            Expression.Property(parameter, nameof(Treatment.BodySide)),
                            nameof(string.ToLower), Type.EmptyTypes),
                        nameof(string.Contains), null, Expression.Constant(bodySidePart));

                    var sectionNameCondition = Expression.Call(
                        Expression.Call(
                            Expression.Property(parameter, nameof(Treatment.SectionName)),
                            nameof(string.ToLower), Type.EmptyTypes),
                        nameof(string.Contains), null, Expression.Constant(sectionNamePart));

                    var viewNameCondition = Expression.Call(
                        Expression.Call(
                            Expression.Property(parameter, nameof(Treatment.ViewName)),
                            nameof(string.ToLower), Type.EmptyTypes),
                        nameof(string.Contains), null, Expression.Constant(viewNamePart));

                    condition = Expression.AndAlso(
                        Expression.AndAlso(bodySideCondition, sectionNameCondition),
                        viewNameCondition);
                }

                if (condition != null)
                {
                    conditions.Add(condition);
                }
            }

            var finalCondition = conditions.Aggregate((current, next) => Expression.OrElse(current, next));
            var lambda = Expression.Lambda<Func<Treatment, bool>>(finalCondition, parameter);
            return query.Where(lambda);
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
            var cacheKey = $"Treatment_{treatmentRequest.Id}";
            if (_cache.TryGetValue(cacheKey, out TreatmentResponseDTO cachedTreatment))
            {
                return new ServiceResponse<TreatmentResponseDTO>("Treatment retrieved from cache")
                {
                    Data = cachedTreatment,
                    Success = true
                };
            }

            ServiceResponse<TreatmentResponseDTO> response;

            try
            {
                var treatment = await _context.Treatments
                    .AsSplitQuery()
                    .AsNoTracking()
                    .Where(t => t.Id == treatmentRequest.Id)
                    .FirstOrDefaultAsync();

                if (treatment == null)
                {
                    response = new ServiceResponse<TreatmentResponseDTO>("Treatment not found") { Success = false };
                    return response;
                }

                var treatmentDTO = new TreatmentResponseDTO(treatment, treatmentRequest.Gender);

                _cache.Set(cacheKey, treatmentDTO, TimeSpan.FromMinutes(10));

                response = new ServiceResponse<TreatmentResponseDTO>("Treatment retrieved");
                response.Data = treatmentDTO;
                response.Success = true;
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