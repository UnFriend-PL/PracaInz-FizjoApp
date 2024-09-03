using fizjobackend.Models.BodyVisualizerDTOs;

namespace fizjobackend.Interfaces.BodyVisualizerInterfaces
{
    public interface IBodyVisualizerService
    {
        Task<ServiceResponse<BodyPartDetailsResponseDTO>> GetBodyPartDetails(BodyPartDetailsRequestDTO bodyRequest);
    }
}
