using fizjobackend.Entities.PatientEntities;
using fizjobackend.Entities.UserEntities;

namespace fizjobackend.Models.UserDTOs
{
    public class UserEditRequestDTO
    {
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

        public UserEditRequestDTO()
        {
        }
        public UserEditRequestDTO(User user)
        {
            FirstName = user.FirstName;
            LastName = user.LastName;
            Gender = user.Gender;
            Country = user.Country;
            City = user.City;
            StreetWithHouseNumber = user.StreetWithHouseNumber;
            PostCode = user.PostCode;
            Pesel = user.Pesel;
            DateOfBirth = user.DateOfBirth;
            Email = user.Email;
            PhoneNumber = user.PhoneNumber;
            
        }
    }
}
