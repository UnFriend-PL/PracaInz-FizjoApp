using fizjobackend.Entities.PhysiotherapistEntities;
using fizjobackend.Interfaces.DTOInterfaces.UserDTOInterfaces;

namespace fizjobackend.Models.UserDTOs
{
    public class PhysiotherapistEditRequestDTO : IUserEditRequestDTO
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
        public string LicenseNumber { get; set; } = string.Empty;

        public PhysiotherapistEditRequestDTO() { }

        public PhysiotherapistEditRequestDTO(Physiotherapist physiotherapist)
        {
            FirstName = physiotherapist.FirstName;
            LastName = physiotherapist.LastName;
            Gender = physiotherapist.Gender;
            Country = physiotherapist.Country;
            City = physiotherapist.City;
            StreetWithHouseNumber = physiotherapist.StreetWithHouseNumber;
            PostCode = physiotherapist.PostCode;
            Pesel = physiotherapist.Pesel;
            DateOfBirth = physiotherapist.DateOfBirth;
            Email = physiotherapist.Email;
            PhoneNumber = physiotherapist.PhoneNumber;
            LicenseNumber = physiotherapist.LicenseNumber;
        }
    }
}
