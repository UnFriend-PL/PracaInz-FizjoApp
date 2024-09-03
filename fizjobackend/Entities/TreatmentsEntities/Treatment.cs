using fizjobackend.Entities.AppointmentEntities;
using fizjobackend.Entities.PhysiotherapistEntities;

namespace fizjobackend.Entities.TreatmentsEntities
{
    public class Treatment
    {
        public Guid Id { get; set; }
        public Guid AppointmentId { get; set;}
        public virtual Appointment Appointment { get; set; }
        public Guid PhysiotherapistId { get; set; }
        public virtual Physiotherapist Physiotherapist { get; set; }
        public string Description { get; set; }
        public string Name { get; set; }
        public TimeSpan Duration { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime UpdateDate { get; set; }
        public bool IsDeleted { get; set; }
    }
}
