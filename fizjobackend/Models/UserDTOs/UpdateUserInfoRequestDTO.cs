namespace fizjobackend.Models.UserDTOs
{
    public class UpdateUserInfoRequestDTO
    {
        public Guid userId { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Gender { get; set; } = string.Empty;
        public string Country { get; set; } = string.Empty;
        public string City { get; set; } = string.Empty;
        public string StreetWithHouseNumber { get; set; } = string.Empty;
        public string PostCode { get; set; } = string.Empty;
        public string Pesel { get; set; } = string.Empty;
        public DateTime DateOfBirth { get; set; }
        public string Email { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
    }
}
