using fizjobackend.DbContexts;
using fizjobackend.Interfaces.BodyVisualizerInterfaces;
using fizjobackend.Models.BodyVisualizerDTOs;
using Microsoft.EntityFrameworkCore;

namespace fizjobackend.Services.BodyVisualizerService
{
    public class BodyVisualizerService : IBodyVisualizerService
    {
        private readonly FizjoDbContext _context;
        private readonly ILogger<BodyVisualizerService> _logger;

        public BodyVisualizerService(FizjoDbContext context, ILogger<BodyVisualizerService> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<ServiceResponse<BodyPartDetailsResponseDTO>> GetBodyPartDetails(BodyPartDetailsRequestDTO bodyRequest)
        {
            var serviceResponse = new ServiceResponse<BodyPartDetailsResponseDTO>("Body part details retrieved successfully");
            try
            {

                _logger.LogDebug("Attempting to find view with Gender: {Gender}, ViewPosition: {ViewPosition}", bodyRequest.Gender, bodyRequest.ViewPosition);
                var view = await _context.Views
                    .FirstOrDefaultAsync(v => v.Gender == bodyRequest.Gender && v.Name == bodyRequest.ViewPosition);

                if (view == null)
                {
                    serviceResponse.Success = false;
                    serviceResponse.Message = "View not found";
                    _logger.LogWarning("View not found for Gender: {Gender}, ViewPosition: {ViewPosition}", bodyRequest.Gender, bodyRequest.ViewPosition);
                    return serviceResponse;
                }

                _logger.LogDebug("View found with Id: {ViewId}. Attempting to find body section with BodySectionName: {BodySectionName}, ViewId: {ViewId}, ViewSide: {ViewSide}", bodyRequest.BodySectionName, view.Id, bodyRequest.ViewSide);
                var bodySection = await _context.BodySections
                    .FirstOrDefaultAsync(bs => bs.BodySectionName == bodyRequest.BodySectionName && bs.ViewId == view.Id && bs.BodySide == bodyRequest.ViewSide);

                if (bodySection == null)
                {
                    serviceResponse.Success = false;
                    serviceResponse.Message = "Body part not found";
                    _logger.LogWarning("Body part not found for BodySectionName: {BodySectionName}, ViewId: {ViewId}, ViewSide: {ViewSide}", bodyRequest.BodySectionName, view.Id, bodyRequest.ViewSide);
                    return serviceResponse;
                }

                _logger.LogDebug("Body section found with Id: {BodySectionId}", bodySection.Id);
                if (bodySection == null)
                {
                    serviceResponse.Success = false;
                    serviceResponse.Message = "Body part not found";
                    return serviceResponse;
                }

                var muscles = await _context.Muscles
                    .Where(m => m.BodySectionId == bodySection.Id)
                    .Select(m => new MuscleResponseDTO(m))
                    .ToListAsync();

                var joints = await _context.Joints
                    .Where(j => j.BodySectionId == bodySection.Id)
                    .Select(j => new JointResponseDTO(j))
                    .ToListAsync();

                var name = bodySection.BodySide != null ? $"{bodySection.BodySide}-{bodySection.BodySectionName}" : $"{bodySection.BodySectionName}";
                var bodyPartDetailsResponseDTO = new BodyPartDetailsResponseDTO()
                {
                    ViewId = view.Id,
                    BodySectionId = bodySection.Id,
                    Name = name,
                    NamePL = bodySection.BodySectionNamePL,
                    Muscles = muscles,
                    Joints = joints
                };

                serviceResponse.Data = bodyPartDetailsResponseDTO;
                return serviceResponse;
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = "Failed to get body part details";
                _logger.LogError(ex, "Failed to get body part details");
                return serviceResponse;
            }
        }
    }
}
