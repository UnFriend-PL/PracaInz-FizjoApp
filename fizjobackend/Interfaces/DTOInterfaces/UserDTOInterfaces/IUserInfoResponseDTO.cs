namespace fizjobackend.Interfaces.DTOInterfaces.UserDTOInterfaces
{
    public interface IUserInfoResponseDTO
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Gender { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public string StreetWithHouseNumber { get; set; }
        public string PostCode { get; set; }
        public string Pesel { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
    }
}
