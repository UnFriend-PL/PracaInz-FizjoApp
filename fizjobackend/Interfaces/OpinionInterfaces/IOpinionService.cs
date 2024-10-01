using fizjobackend.Entities.OpinionEntities;
using fizjobackend.Models.AccountDTOs;

namespace fizjobackend.Interfaces.OpinionInterfaces
{
    public interface IOpinionService
    {
        Task<ServiceResponse<Opinion>> AddOpinion(Guid userId);

    }
}
