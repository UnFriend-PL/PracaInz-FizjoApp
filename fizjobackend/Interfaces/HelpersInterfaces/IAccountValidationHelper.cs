using fizjobackend.Entities.UserEntities;

namespace fizjobackend.Interfaces.HelpersInterfaces
{
    public interface IAccountValidationHelper
    {
        string[] Validate(User user);
    }
}
