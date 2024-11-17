using Fizjobackend.Models.BodyVisualizerDTOs;

namespace Fizjobackend.Services.BodyVisualizerService
{
    public interface IBodyVisualizerService
    {
        Task<ServiceResponse<BodyPartDetailsResponseDTO>> GetBodyPartDetails(BodyPartDetailsRequestDTO bodyRequest);
    }
}
