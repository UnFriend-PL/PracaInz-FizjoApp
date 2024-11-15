using fizjobackend.Models.BodyVisualizerDTOs;

namespace fizjobackend.Services.BodyVisualizerService
{
    public interface IBodyVisualizerService
    {
        Task<ServiceResponse<BodyPartDetailsResponseDTO>> GetBodyPartDetails(BodyPartDetailsRequestDTO bodyRequest);
    }
}
