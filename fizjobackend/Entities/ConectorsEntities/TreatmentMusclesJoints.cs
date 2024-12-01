using Fizjobackend.Entities.BodyEntities;
using Fizjobackend.Entities.TreatmentsEntities;

namespace Fizjobackend.Entities.ConectorsEntities
{
    public class TreatmentMusclesJoints
    {
        public Guid Id { get; set; }
        public Guid TreatmentId { get; set; }
        public virtual Treatment Treatment { get; set; }
        public int? MuscleId { get; set; }
        public Muscle Muscle { get; set; }
        public int? JointId { get; set; }
        public Joint Joint { get; set; }
    }
}
