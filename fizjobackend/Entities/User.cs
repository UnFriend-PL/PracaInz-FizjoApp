﻿using System.ComponentModel.DataAnnotations;

namespace fizjobackend.Entities
{
    public abstract class User
    {
        [Key]
        public Guid UserId { get; set; }
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public string Gender { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string Pesel { get; set; } = string.Empty;
        public DateTime DateOfBirth { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.Now;
    }
}
