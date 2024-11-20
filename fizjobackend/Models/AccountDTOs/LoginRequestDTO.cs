namespace Fizjobackend.Models.AccountDTOs
{
    public class LoginRequestDTO
    {
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string LoginType { get; set; } = "Patient";
    }
}
