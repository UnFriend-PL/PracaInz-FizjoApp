using fizjobackend.Models.OpinionDTOs;
using Fizjobackend;
using Fizjobackend.Entities.OpinionEntities;
using Fizjobackend.Models.AccountDTOs;
using Fizjobackend.Models.OpinionDTOs;

namespace fizjobackend.Services.OpinionService
{
    public interface IOpinionService
    {
        Task<ServiceResponse<Opinion>> AddOpinion(Guid userId, OpinionRequestDTOs opinion);
        Task<ServiceResponse<Opinion>> DeleteOpinion(Guid guid, Guid opinionId);
        Task<ServiceResponse<ListOfOpinionResponseDTO>> GetAllOpinions(IEnumerable<string> userRoles, string userId, int page, int pageSize);
        Task<ServiceResponse<ListOfOpinionResponseDTO>> GetAllOpinionsByPhysiotherapistId(Guid userId, int page, int pageSize);
        Task<ServiceResponse<Opinion>> UpdateOpinion(Guid guid, Guid opinionId, UpdateOpinionRequestDTO updateOpinion);
        Task<ServiceResponse<OpinionExistsResposneDTO>> DoesOpinionExist(string userId, string physiotherapistId);

    }
}
