using System.Security.Claims;
using Fizjobackend.Entities.UserEntities;

namespace Fizjobackend.Services.AccountService
{
    public interface IJwtGenerator
    {
        string GenerateJwtToken(User user);
        ClaimsPrincipal? RefreshJwtToken(string token);

    }
}
