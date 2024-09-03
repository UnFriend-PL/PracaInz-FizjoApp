using fizjobackend.Entities.BodyEntities;

namespace fizjobackend.Entities.AppointmentEntities
{
    public class AppointmentBodyDetails
    {
        public Guid Id { get; set; }
        public Guid AppointmentId { get; set; }
        public virtual Appointment Appointment { get; set; }
        public int BodySectionId { get; set; }
        public virtual BodySection BodySection { get; set; }
        public int ViewId { get; set; }
        public virtual View View { get; set; }
        public int? MuscleId { get; set; }
        public virtual Muscle Muscle { get; set; }
        public int? JointId { get; set; }
        public virtual Joint Joint { get; set; }
        public string BodySide { get; set; }
        public int? PainLevel { get; set; }

    }
}
