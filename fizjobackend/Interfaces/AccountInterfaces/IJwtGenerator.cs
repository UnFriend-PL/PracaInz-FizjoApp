using fizjobackend.Entities.UserEntities;
using System.Security.Claims;

namespace fizjobackend.Interfaces.AccountInterfaces
{
    public interface IJwtGenerator
    {
        string GenerateJwtToken(User user);
        ClaimsPrincipal? RefreshJwtToken(string token);

    }
}
