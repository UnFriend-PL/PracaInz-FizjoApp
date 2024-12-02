using Fizjobackend.Entities.PhysiotherapistEntities;

namespace Fizjobackend.Models.UserDTOs
{
    public class PhysiotherapistInfoResponseDTO : IUserInfoResponseDTO
    {
        public Guid Id { get; set; }
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
        public string AvatarPath { get; set; } = string.Empty;

        public PhysiotherapistInfoResponseDTO() { }

        public PhysiotherapistInfoResponseDTO(Physiotherapist physiotherapist)
        {
            Id = physiotherapist.Id;
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
            AvatarPath = physiotherapist.AvatarPath;

        }
    }
}
