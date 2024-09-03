using fizjobackend.Entities.ConectorsEntities;
using fizjobackend.Entities.TreatmentsEntities;

namespace fizjobackend.Entities.AppointmentEntities
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
