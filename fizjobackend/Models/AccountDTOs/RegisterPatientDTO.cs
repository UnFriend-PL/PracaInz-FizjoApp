using fizjobackend.Entities.PatientEntities;

namespace fizjobackend.Models.AccountDTOs
{
    public class RegisterPatientDTO : RegisterUserDTO
    {
        public string? InsuranceNumber { get; set; }
    }
}
