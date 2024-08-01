using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace fizjobackend.Entities.UserEntities
{
    public abstract class User : IdentityUser<Guid>
    {
        public string AvatarPath { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Gender { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string Pesel { get; set; } = string.Empty;
        public DateTime DateOfBirth { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.Now;
    }
}
