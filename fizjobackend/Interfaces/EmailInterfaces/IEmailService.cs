using fizjobackend.Entities.UserEntities;

namespace fizjobackend.Interfaces.EmailInterface
{
    public interface IEmailService
    {
        Task<bool> SendVerificationEmail(string email, string token);

    }
}
