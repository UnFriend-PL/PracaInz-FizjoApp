using Fizjobackend.Entities.UserEntities;

namespace Fizjobackend.Services.EmailService
{
    public interface IEmailService
    {
        Task<bool> SendVerificationEmail(string email, string token);

    }
}
