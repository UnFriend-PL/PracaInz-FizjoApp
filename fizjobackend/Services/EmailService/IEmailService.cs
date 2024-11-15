using fizjobackend.Entities.UserEntities;

namespace fizjobackend.Services.EmailService
{
    public interface IEmailService
    {
        Task<bool> SendVerificationEmail(string email, string token);

    }
}
