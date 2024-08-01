namespace fizjobackend.Models.AccountDTOs
{
    public class RegisterPhisiotherapistDTO : RegisterUserDTO
    {
        public string LicenseNumber { get; set; } = string.Empty;
    }
}
