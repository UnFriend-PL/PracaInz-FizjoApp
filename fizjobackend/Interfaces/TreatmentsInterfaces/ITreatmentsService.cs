using fizjobackend.Models.TreatmentsDTOs;

namespace fizjobackend.Interfaces.TreatmentsInterfaces
{
    public interface ITreatmentsService
    {
        Task<ServiceResponse<IEnumerable<TreatmentsAutoCompleteResponseDTO>>> GetTreatments(Guid userId);
        Task<ServiceResponse<TreatmentResponseDTO>> GetTreatment(TreatmentRequestDTO treatmentRequest);
    }
}
