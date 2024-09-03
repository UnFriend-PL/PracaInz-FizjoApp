using fizjobackend.Models.BodyVisualizerDTOs;

namespace fizjobackend.Models.AppointmentsDTOs
{
    public class LoadAppointmentBodyDetailsResponseDTO
    {
        public List<MuscleResponseDTO> SelectedMuscles { get; set; }
        public BodyPartDetailsResponseDTO BodyPartMusclesAndJoints { get; set; }
        public List<JointResponseDTO> SelectedJoints { get; set; }
    }
}
