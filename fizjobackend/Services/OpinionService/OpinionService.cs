using Fizjobackend.Entities.OpinionEntities;
using Fizjobackend.Models.OpinionDTOs;
using Fizjobackend.Models.UserDTOs;
using Fizjobackend;
using Fizjobackend.DbContexts;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Sprache;
using System.Linq;
using fizjobackend.Services.OpinionService;
using fizjobackend.Models.OpinionDTOs;

namespace Fizjobackend.Services.OpinionService
{
    public class OpinionService : IOpinionService
    {
        private readonly FizjoDbContext _context;
        private readonly ILogger<OpinionService> _logger;


        public OpinionService(FizjoDbContext context, ILogger<OpinionService> logger)
        {
            _context = context;
            _logger = logger;

        }
        public async Task<ServiceResponse<Opinion>> AddOpinion(Guid userId, OpinionRequestDTOs opinionFromBody)
        {
            ServiceResponse<Opinion> response = new ServiceResponse<Opinion>("");
            try
            {
                var patient = await _context.Patients.FindAsync(userId);
                var physiotherapist = await _context.Physiotherapists.FindAsync(opinionFromBody.PhysiotherapistId);
                var appointment = await _context.Appointments.Where(a => a.PatientId == userId && a.PhysiotherapistId== physiotherapist.Id).FirstOrDefaultAsync();
                if(appointment==null)
                {
                    response.Success = false;
                    response.Message = "Appointment not found";
                    return response;
                }
                if (appointment.AppointmentDate > DateTime.Now)
                {
                    response.Success = false;
                    response.Message = "Visit does not take place";
                    return response;
                }
                var lastOpinion = await _context.Opinions.Where(a => a.PatientId == userId && a.PhysiotherapistId == physiotherapist.Id).FirstOrDefaultAsync();
                if(lastOpinion!=null)
                {
                    response.Success = false;
                    response.Message = "Opinion exists";
                    return response;
                }
                if (opinionFromBody.Rating > 5)
                {
                    response.Success = false;
                    response.Message = "Rating is not between 0 - 5";
                    return response;
                }
                string nameAndFirstLetterOfTheLastName = patient.FirstName + " " + patient.LastName[0] + ".";
                Opinion finallyOpinion = new Opinion
                {
                    PatientId = userId,
                    PhysiotherapistId = opinionFromBody.PhysiotherapistId,
                    NameAndFirstLetterOfTheLastName = nameAndFirstLetterOfTheLastName,
                    Comment = opinionFromBody.Comment,
                    Rating = opinionFromBody.Rating,
                    UploadDate = DateTime.Now
                };
                _context.Opinions.Add(finallyOpinion);
                await _context.SaveChangesAsync();

                response.Message = "Opinion added successfully";
                response.Success = true;
                return response;
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = $"An error occurred: {ex.Message}";
                return response;
            }
        }

        public async Task<ServiceResponse<Opinion>> DeleteOpinion(Guid patientId, Guid opinionId)
        {
            var response = new ServiceResponse<Opinion>("");

            try
            {
                var opinion = await _context.Opinions.FindAsync(opinionId);

                if (opinion == null)
                {
                    response.Success = false;
                    response.Message = "Opinion not found.";
                    return response;
                }

                if (opinion.PatientId != patientId)
                {
                    response.Success = false;
                    response.Message = "User is not authorized to delete this opinion.";
                    return response;
                }

                _context.Opinions.Remove(opinion);
                await _context.SaveChangesAsync();

                response.Success = true;
                response.Message = "Opinion deleted successfully.";
                response.Data = opinion;
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = $"An error occurred: {ex.Message}";
            }

            return response;
        }
        public async Task<ServiceResponse<Opinion>> UpdateOpinion(Guid patientId, Guid opinionId, UpdateOpinionRequestDTO updateOpinion)
        {
            var response = new ServiceResponse<Opinion>("");

            try
            {
                var opinion = await _context.Opinions.FindAsync(opinionId);

                if (opinion == null)
                {
                    response.Success = false;
                    response.Message = "Opinion not found.";
                    return response;
                }

                if (opinion.PatientId != patientId)
                {
                    response.Success = false;
                    response.Message = "User is not authorized to update this opinion.";
                    return response;
                }
                if (updateOpinion.Rating > 5)
                {
                    response.Success = false;
                    response.Message = "Rating is not between 0 - 5";
                }
                opinion.Rating = updateOpinion.Rating;
                opinion.Comment = updateOpinion.Comment;

                
                _context.Opinions.Update(opinion);
                await _context.SaveChangesAsync();

                response.Success = true;
                response.Message = "Opinion updated successfully.";
                response.Data = opinion;
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = $"An error occurred: {ex.Message}";
            }

            return response;
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
        private string GetFistNameAndLastNamePhysio(Guid userId)
        {
            var physiotherapist = _context.Users.Find(userId);
            string FirstNameAndLastNamePhysio = $"{physiotherapist.FirstName} {physiotherapist.LastName}";
            if (physiotherapist == null)
            {
                throw new ArgumentException("Physiotherapist not found");
            }
            return FirstNameAndLastNamePhysio;
        }
        public async Task<ServiceResponse<ListOfOpinionResponseDTO>> GetAllOpinions(IEnumerable<string> userRoles,string userId, int page, int pageSize)
        {
            var response = new ServiceResponse<ListOfOpinionResponseDTO>("");
            try
            {
                ListOfOpinionResponseDTO opinionResponse = new ListOfOpinionResponseDTO();
                if (!Guid.TryParse(userId, out Guid userGuidId))
                {
                    response.Success = false;
                    response.Message = "ERROR WITH GUID";
                    return response;
                }
                var isUser = await _context.Users.FindAsync(userGuidId);
                if (isUser == null)
                {
                    response.Success = false;
                    response.Message = "User not found";
                    return response;
                }
                var userRole = GetBaseRoleFromUserRoles(userRoles);
                List<Opinion> opinions;
                double opinionsCount;
                switch (userRole.ToLower())
                {
                    case "patient":
                        opinions = await _context.Opinions
                            .Where(o => o.PatientId == userGuidId)
                            .Skip((page - 1) * pageSize)
                            .Take(pageSize)
                            .ToListAsync();
                        opinionsCount = await _context.Opinions
                            .Where(o => o.PatientId == userGuidId)
                            .CountAsync(); 
                        break;

                    case "physiotherapist":
                        opinions = await _context.Opinions
                            .Where(o => o.PhysiotherapistId == userGuidId)
                            .Skip((page - 1) * pageSize)
                            .Take(pageSize)
                            .ToListAsync();
                        opinionsCount = await _context.Opinions
                            .Where(o => o.PhysiotherapistId == userGuidId)
                            .CountAsync();
                        break;

                    default:
                        throw new ArgumentException("Invalid user role");
                }
                if (opinions == null || opinions.Count == 0)
                    {
                        response.Success = false;
                        response.Message = "No opinions found for this patient.";
                        return response;
                    }

                opinionResponse.Opinions = opinions.Select(o => new OpinionListDTO
                {
                    OpinionId = o.OpinionId,
                    NameAndFirstLetterOfTheLastName = o.NameAndFirstLetterOfTheLastName,
                    Comment = o.Comment,
                    Rating = o.Rating,
                    UploadDate = o.UploadDate,
                    About = GetFistNameAndLastNamePhysio(o.PhysiotherapistId)
                }).ToList();
                opinionResponse.Page = page;
                opinionResponse.TotalPage = (int)Math.Ceiling((double)opinionsCount / pageSize); response.Data = opinionResponse;
                response.Success = true;
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = $"An error occurred: {ex.Message}";
            }

            return response;
        }

        public async Task<ServiceResponse<OpinionExistsResposneDTO>> DoesOpinionExist(string userId, string physiotherapistId)
        {
            var response = new ServiceResponse<OpinionExistsResposneDTO>("");

            try
            {
                if (!Guid.TryParse(userId, out Guid patientGuidId))
                {
                    response.Success = false;
                    response.Message = "Invalid patient GUID";
                    return response;
                }

                if (!Guid.TryParse(physiotherapistId, out Guid physiotherapistGuidId))
                {
                    response.Success = false;
                    response.Message = "Invalid physiotherapist GUID";
                    return response;
                }
                List<Opinion> opinions;

                opinions = await _context.Opinions
                    .Where(o => o.PatientId == patientGuidId)
                    .ToListAsync();

                var opinionForPhysiotherapist = opinions
                    .FirstOrDefault(o => o.PhysiotherapistId == physiotherapistGuidId);


                if (opinionForPhysiotherapist != null)
                {
                    response.Data = new OpinionExistsResposneDTO
                    {
                        PhysiotherapistId = opinionForPhysiotherapist.PhysiotherapistId,
                        PatientId = opinionForPhysiotherapist.PatientId,
                        OpinionId = opinionForPhysiotherapist.OpinionId,
                        Exists = true,
                        Rating=opinionForPhysiotherapist.Rating,
                        Comment=opinionForPhysiotherapist.Comment
                    };
                }
                else
                {
                    response.Data = new OpinionExistsResposneDTO
                    {
                        PhysiotherapistId = physiotherapistGuidId,
                        PatientId = patientGuidId,
                        OpinionId = Guid.Empty,
                        Exists = false
                    };
                }

                response.Success = true;
            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = $"An error occurred: {ex.Message}";
            }

            return response;
        }
    }
}
