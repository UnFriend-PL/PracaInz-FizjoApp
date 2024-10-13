﻿using fizjobackend.DbContexts;
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

    }
}
