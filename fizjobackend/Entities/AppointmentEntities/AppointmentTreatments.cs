using Fizjobackend.Entities.ConectorsEntities;
using Fizjobackend.Entities.TreatmentsEntities;

namespace Fizjobackend.Entities.AppointmentEntities
{
    public class AppointmentTreatments
    {
        public Guid Id { get; set; }
        public Guid AppointmentId { get; set; }
        public virtual Appointment Appointment { get; set; }
        public Guid TreatmentId { get; set; }
        public virtual Treatment Treatment { get; set; }
    }
}
