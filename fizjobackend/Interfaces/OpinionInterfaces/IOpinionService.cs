using fizjobackend.Entities.OpinionEntities;
using fizjobackend.Models.AccountDTOs;
using fizjobackend.Models.OpinionDTOs;

namespace fizjobackend.Interfaces.OpinionInterfaces
{
    public interface IOpinionService
    {
        Task<ServiceResponse<Opinion>> AddOpinion(Guid userId, OpinionRequestDTOs opinion);


    }
}
