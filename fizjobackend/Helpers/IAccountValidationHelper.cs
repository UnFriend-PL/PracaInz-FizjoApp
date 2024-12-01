using Fizjobackend.Entities.UserEntities;

namespace Fizjobackend.Helpers
{
    public interface IAccountValidationHelper
    {
        string[] Validate(User user);
    }
}
