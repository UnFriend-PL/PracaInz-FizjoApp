using fizjobackend.Enums.UserEnums;
using fizjobackend.Interfaces.RegisterDTOInterfaces;

namespace fizjobackend.Models.AccountDTOs
{
    public class PhysiotherapisRegistertDTO : IUserRegisterDTO
    {
        public string LicenseNumber { get; set; } = string.Empty;
        public RegisterType RegisterType { get; set; }

        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Gender { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string Pesel { get; set; } = string.Empty;
        public DateTime DateOfBirth { get; set; }
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string ConfirmPassword { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
    }
}
