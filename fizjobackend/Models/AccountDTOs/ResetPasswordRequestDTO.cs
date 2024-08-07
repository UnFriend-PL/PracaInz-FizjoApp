using System.ComponentModel.DataAnnotations;

namespace fizjobackend.Models.AccountDTOs
{
    public class ResetPasswordRequestDTO
    {
        [Required]
        public string Token { get; set; } = string.Empty;
        [Required]
        public string Password { get; set; } = string.Empty;
        [Required, Compare("Password")]
        public string ConfirmPassword { get; set; } = string.Empty;
    }
}
