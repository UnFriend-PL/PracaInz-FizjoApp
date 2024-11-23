using Fizjobackend.Models.TreatmentsDTOs;

namespace Fizjobackend.Services.Treatments
{
    public interface ITreatmentsService
    {
        Task<ServiceResponse<IEnumerable<TreatmentsAutoCompleteResponseDTO>>> GetTreatments(
            TreatmentAutoCompleteRequestDTO request);
        Task<ServiceResponse<TreatmentResponseDTO>> GetTreatment(TreatmentRequestDTO treatmentRequest);
    }
}
