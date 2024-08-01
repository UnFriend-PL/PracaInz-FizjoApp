using fizjobackend.Entities.AppointmentEntities;
using fizjobackend.Entities.UserEntities;
using fizjobackend.Enums.PhysiotherapistEnums;
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
    }
}
