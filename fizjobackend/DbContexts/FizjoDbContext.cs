using fizjobackend.Entities.AppointmentEntities;
using fizjobackend.Entities.PatientEntities;
using fizjobackend.Entities.PhysiotherapistEntities;
using fizjobackend.Entities.UserEntities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace fizjobackend.DbContexts
{
    public class FizjoDbContext : IdentityDbContext<User, UserRoles, Guid>
    {
        public FizjoDbContext(DbContextOptions<FizjoDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            BuildPhysiothreapistSpecializationEntity(modelBuilder);
            BuildAppointmentEntity(modelBuilder);
            modelBuilder.Entity<Physiotherapist>()
                .HasMany(p => p.PhysiotherapySpecializations)
                .WithMany(s => s.Physiotherapists)
                .UsingEntity(j => j.ToTable("PhysiotherapistSpecializations"));
        }

        private static void BuildAppointmentEntity(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Appointment>()
                .Property(e => e.AppointmentStatus)
                .HasConversion<string>();

            modelBuilder.Entity<Appointment>()
                .HasOne(e => e.Patient)
                .WithMany(e => e.Appointments)
                .HasForeignKey(e => e.PatientId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Appointment>()
                .HasOne(e => e.Physiotherapist)
                .WithMany(e => e.Appointments)
                .HasForeignKey(e => e.PhysiotherapistId)
                .OnDelete(DeleteBehavior.Restrict);
        }

        private static void BuildPhysiothreapistSpecializationEntity(ModelBuilder modelBuilder)
        {
            modelBuilder
                .Entity<PhysiotherapySpecializationEntity>()
                .Property(e => e.PhysiotherapySpecialization)
                .HasConversion<string>();
        }

        public DbSet<Patient> Patients { get; set; }
        public DbSet<Physiotherapist> Physiotherapists { get; set; }
        public DbSet<UserRoles> UserRoles { get; set; }
        public DbSet<PhysiotherapySpecializationEntity> PhysiotherapySpecializationEntities { get; set; }
        public DbSet<Appointment> Appointments { get; set; }

    }
}
