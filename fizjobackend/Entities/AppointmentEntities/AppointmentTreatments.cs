using Fizjobackend.Entities.ConectorsEntities;
using Fizjobackend.Entities.TreatmentsEntities;
using Fizjobackend.Models.TreatmentsDTOs;

namespace Fizjobackend.Entities.AppointmentEntities
{
    public class AppointmentTreatments
    {
        public Guid Id { get; set; }
        public Guid AppointmentId { get; set; }
        public Appointment Appointment { get; set; }
        public Guid TreatmentId { get; set; }
        public Treatment Treatment { get; set; }
        public TimeSpan Duration { get; set; }
        public string Notes { get; set; }
        public DateTime? UpdateDate { get; set; }

        public AppointmentTreatments()
        {
        }

        public AppointmentTreatments(AppointmentSaveTreatment request, Guid appointmentId)
        {
            AppointmentId = appointmentId;
            TreatmentId = request.TreatmentId;
            Duration = request.Duration;
            Notes = request.Notes;
            UpdateDate = DateTime.Now;
        }
    }
}