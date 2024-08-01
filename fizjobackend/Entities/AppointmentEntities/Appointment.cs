﻿using fizjobackend.Entities.PatientEntities;
using fizjobackend.Entities.PhysiotherapistEntities;
using fizjobackend.Enums.AppointmentEnums;
using System.ComponentModel.DataAnnotations.Schema;

namespace fizjobackend.Entities.AppointmentEntities
{
    public class Appointment
    {
        public Guid AppointmentId { get; set; }
        public AppointmentStatus AppointmentStatus { get; set; } = AppointmentStatus.Scheduled;
        public virtual Patient Patient { get; set; } = new();
        [ForeignKey("PatientId")]
        public Guid PatientId { get; set; }
        public virtual Physiotherapist Physiotherapist { get; set; } = new();
        [ForeignKey("PhysiotherapistId")]
        public Guid PhysiotherapistId { get; set; }
        public DateTime AppointmentDate { get; set; } = DateTime.Now;
        public DateTime? MovedFromDate { get; set; }
        public string AppointmentDescription { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string? Notes { get; set; }
        public string? Diagnosis { get; set; }
    }
}