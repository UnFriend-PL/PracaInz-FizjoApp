﻿using Microsoft.AspNetCore.Identity;

namespace fizjobackend.Entities.UserEntities
{
    public abstract class User : IdentityUser<Guid>
    {
        public string AvatarPath { get; set; } = string.Empty;
        [PersonalData]
        public string FirstName { get; set; } = string.Empty;
        [PersonalData]
        public string LastName { get; set; } = string.Empty;
        [PersonalData]
        public string Gender { get; set; } = string.Empty;
        [ProtectedPersonalData]
        public string Address { get; set; } = string.Empty;
        [ProtectedPersonalData]
        public string Pesel { get; set; } = string.Empty;
        [PersonalData]
        public DateTime DateOfBirth { get; set; }
        [PersonalData]
        public override string? UserName { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.Now;
        public DateTime? LastModifiedDate { get; set; } 
    }
}
