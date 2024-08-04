using fizjobackend.Enums.UserEnums;

namespace fizjobackend.Interfaces.RegisterDTOInterfaces
{
    public interface IUserRegisterDTO
    {
        public RegisterType RegisterType { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Gender { get; set; }
        public string Address { get; set; }
        public string Pesel { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
        public string PhoneNumber { get; set; }
    }
}
