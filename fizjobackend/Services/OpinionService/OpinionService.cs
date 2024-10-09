using fizjobackend.DbContexts;
using fizjobackend.Entities.OpinionEntities;
using fizjobackend.Entities.UserEntities;
using fizjobackend.Interfaces.AccountInterfaces;
using fizjobackend.Interfaces.DTOInterfaces.UserDTOInterfaces;
using fizjobackend.Interfaces.EmailInterface;
using fizjobackend.Interfaces.HelpersInterfaces;
using fizjobackend.Interfaces.OpinionInterfaces;
using fizjobackend.Models.AccountDTOs;
using fizjobackend.Models.OpinionDTOs;
using fizjobackend.Services.AccountService;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace fizjobackend.Services.OpinionService
{
    public class OpinionService : IOpinionService
    {
        private readonly FizjoDbContext _context;

        public OpinionService(FizjoDbContext context)
        {
            _context = context;
        }
        public async Task<ServiceResponse<Opinion>> AddOpinion(Guid userId, OpinionRequestDTOs opinionFromBody)
        {
            ServiceResponse<Opinion> response = new ServiceResponse<Opinion>("");

            try
            {
                var patient = await _context.Patients.FindAsync(userId);
                var physiotherapist = await _context.Physiotherapists.FindAsync(opinionFromBody.PhysiotherapistId);
                if (patient == null)
                {
                    response.Success = false;
                    response.Message = "Patient not found";
                    return response;
                }
                if (physiotherapist == null)
                {
                    response.Success = false;
                    response.Message = "Physiotherapist not found";
                    return response;
                }
                var appointment = await _context.Appointments.FindAsync(opinionFromBody.AppointmentId);

                if(appointment==null)
                {
                    response.Success=false;
                    response.Message = "Appointment not found";
                }
                if (appointment.PatientId != userId || appointment.PhysiotherapistId != physiotherapist.Id)
                {
                    response.Success = false;
                    response.Message = "Id of the patient or physiotherapist is not correct";
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
    }
}
