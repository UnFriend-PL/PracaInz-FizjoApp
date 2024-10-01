using fizjobackend.DbContexts;
using fizjobackend.Entities.OpinionEntities;
using fizjobackend.Entities.UserEntities;
using fizjobackend.Interfaces.AccountInterfaces;
using fizjobackend.Interfaces.EmailInterface;
using fizjobackend.Interfaces.HelpersInterfaces;
using fizjobackend.Interfaces.OpinionInterfaces;
using fizjobackend.Models.AccountDTOs;
using fizjobackend.Models.OpinionDTOs;
using fizjobackend.Services.AccountService;
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
        public async Task<ServiceResponse<Opinion>> AddOpinion(Guid userId, OpinionRequestDTOs opinion)
        {
            try
            {
                var user = await _context.Users.FindAsync(userId);
                if(user != null)
                {
                    string nameAndFirstLetterOfTheLastName = user.FirstName + " " + user.LastName[0] + ".";
                    new OpinionRequestDTOs opinion = new OpinionRequestDTOs
                    {
                        PhysiotherapistId = opinion.PhysiotherapistId,
                        NameAndFirstLetterOfTheLastName = nameAndFirstLetterOfTheLastName,
                        Comment = opinion.Comment,
                        Rating = opinion.Rating,
                        UploadDate = DateTime.Now
                    };
                }
                return null;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}
