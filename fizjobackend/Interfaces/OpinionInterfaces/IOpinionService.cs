using fizjobackend.Entities.OpinionEntities;
using fizjobackend.Models.AccountDTOs;
using fizjobackend.Models.OpinionDTOs;

namespace fizjobackend.Interfaces.OpinionInterfaces
{
    public interface IOpinionService
    {
        Task<ServiceResponse<Opinion>> AddOpinion(Guid userId, OpinionRequestDTOs opinion);
        Task<ServiceResponse<Opinion>> DeleteOpinion(Guid guid, Guid opinionId);
        Task<ServiceResponse<List<Opinion>>> GetOpinionsByPatientId(Guid patientId, int page, int pageSize);
        Task<ServiceResponse<List<Opinion>>> GetOpinionsByPhysiotherapistId(Guid physiotherapistId, int page, int pageSize);
        Task<ServiceResponse<Opinion>> UpdateOpinion(Guid guid, Guid opinionId, UpdateOpinionRequestDTO updateOpinion);
    }
}
