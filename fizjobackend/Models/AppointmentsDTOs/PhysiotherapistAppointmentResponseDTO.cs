using Fizjobackend.Entities.PhysiotherapistEntities;

namespace Fizjobackend.Models.AppointmentsDTOs
{
    public class PhysiotherapistAppointmentResponseDTO
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Gender { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public string LicenseNumber { get; set; } = string.Empty;

        public PhysiotherapistAppointmentResponseDTO(Physiotherapist physiotherapist)
        {
            FirstName = physiotherapist.FirstName;
            LastName = physiotherapist.LastName;
            Gender = physiotherapist.Gender;
            Email = physiotherapist.Email;
            PhoneNumber = physiotherapist.PhoneNumber;
            LicenseNumber = physiotherapist.LicenseNumber;
        }
    }
}
