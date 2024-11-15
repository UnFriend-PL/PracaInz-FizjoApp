using fizjobackend.Entities.UserEntities;

namespace fizjobackend.Helpers
{
    public interface IAccountValidationHelper
    {
        string[] Validate(User user);
    }
}
