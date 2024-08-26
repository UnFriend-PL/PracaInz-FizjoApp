using fizjobackend.Entities.AppointmentEntities;
using fizjobackend.Entities.UserEntities;
using fizjobackend.Models.AccountDTOs;
using fizjobackend.Models.UserDTOs;
using System.ComponentModel.DataAnnotations.Schema;

namespace fizjobackend.Entities.PhysiotherapistEntities
{
    public class Physiotherapist : User
    {
        public string LicenseNumber { get; set; } = string.Empty;

        [InverseProperty("Physiotherapists")]
        public ICollection<PhysiotherapySpecializationEntity> PhysiotherapySpecializations { get; set; } = [];
        [InverseProperty("Physiotherapist")]
        public ICollection<Appointment> Appointments { get; set; } = [];

        public Physiotherapist() { }

        public Physiotherapist(PhysiotherapisRegistertRequestDTO physiotherapist)
        {
            Email = physiotherapist.Email;
            FirstName = physiotherapist.FirstName;
            LastName = physiotherapist.LastName;
            Gender = physiotherapist.Gender;
            Country = physiotherapist.Country;
            City = physiotherapist.City;
            StreetWithHouseNumber = physiotherapist.StreetWithHouseNumber;
            PostCode = physiotherapist.PostCode;
            Pesel = physiotherapist.Pesel;
            DateOfBirth = physiotherapist.DateOfBirth;
            PhoneNumber = physiotherapist.PhoneNumber;
            LicenseNumber = physiotherapist.LicenseNumber;
            CreatedDate = DateTime.UtcNow;
        }

        public Physiotherapist(PhysiotherapistEditRequestDTO physiotherapist)
        {
            Email = physiotherapist.Email;
            FirstName = physiotherapist.FirstName;
            LastName = physiotherapist.LastName;
            Gender = physiotherapist.Gender;
            Country = physiotherapist.Country;
            City = physiotherapist.City;
            StreetWithHouseNumber = physiotherapist.StreetWithHouseNumber;
            PostCode = physiotherapist.PostCode;
            Pesel = physiotherapist.Pesel;
            DateOfBirth = physiotherapist.DateOfBirth;
            PhoneNumber = physiotherapist.PhoneNumber;
            LicenseNumber = physiotherapist.LicenseNumber;
            LastModifiedDate = DateTime.UtcNow;
        }
    }
}
