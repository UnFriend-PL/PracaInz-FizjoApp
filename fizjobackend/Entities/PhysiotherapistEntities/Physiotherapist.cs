using fizjobackend.Entities.AppointmentEntities;
using fizjobackend.Entities.UserEntities;
using fizjobackend.Models.AccountDTOs;
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

        public Physiotherapist(PhysiotherapisRegistertRequestDTO patient)
        {
            Email = patient.Email;
            FirstName = patient.FirstName;
            LastName = patient.LastName;
            Gender = patient.Gender;
            Address = patient.Address;
            Pesel = patient.Pesel;
            DateOfBirth = patient.DateOfBirth;
            Address = patient.Address;
            PhoneNumber = patient.PhoneNumber;
            LicenseNumber = patient.LicenseNumber;
            CreatedDate = DateTime.UtcNow;
        }
    }
}
