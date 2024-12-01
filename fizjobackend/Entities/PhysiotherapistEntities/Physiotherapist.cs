using Fizjobackend.Entities.AppointmentEntities;
using Fizjobackend.Entities.TreatmentsEntities;
using Fizjobackend.Entities.OpinionEntities;
using Fizjobackend.Entities.UserEntities;
using Fizjobackend.Models.AccountDTOs;
using System.ComponentModel.DataAnnotations.Schema;
using Fizjobackend.Entities.AppointmentEntities;
using Fizjobackend.Entities.TreatmentsEntities;
using Fizjobackend.Entities.UserEntities;
using Fizjobackend.Models.AccountDTOs;

namespace Fizjobackend.Entities.PhysiotherapistEntities
{
    public class Physiotherapist : User
    {
        public string LicenseNumber { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int Experience { get; set; } = 1;
        public string Education { get; set; } = string.Empty;
        
        [InverseProperty("Physiotherapists")]
        public ICollection<PhysiotherapySpecializationEntity> PhysiotherapySpecializations { get; set; } = [];
        [InverseProperty("Physiotherapist")]
        public ICollection<Appointment> Appointments { get; set; } = [];
        public virtual ICollection<Treatment> Treatments { get; set; } = new List<Treatment>();
        public ICollection<Opinion> Opinions { get; set; } = [];
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
    }
}
