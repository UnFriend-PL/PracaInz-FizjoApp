using fizjobackend.Entities.AppointmentEntities;
using fizjobackend.Entities.PatientEntities;
using fizjobackend.Entities.PhysiotherapistEntities;
using fizjobackend.Entities.UserEntities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace fizjobackend.DbContexts
{
    public class FizjoDbContext : DbContext
    {
        public FizjoDbContext(DbContextOptions<FizjoDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<IdentityRole<Guid>>()
                .ToTable("Roles");
            modelBuilder.Entity<IdentityUserRole<Guid>>()
                .ToTable("UsersRoles")
                .HasKey(ur => new { ur.UserId, ur.RoleId });
            modelBuilder.Entity<IdentityUserClaim<Guid>>()
                .ToTable("UserClaims")
                .HasKey(uc => uc.Id);
            modelBuilder.Entity<IdentityUserLogin<Guid>>()
                .ToTable("UserLogins")
                .HasKey(ul => new { ul.LoginProvider, ul.ProviderKey });
            modelBuilder.Entity<IdentityRoleClaim<Guid>>()
                .ToTable("RoleClaims")
                .HasKey(rc => rc.Id);
            modelBuilder.Entity<IdentityUserToken<Guid>>()
                 .ToTable("UserTokens")
                .HasKey(ut => new { ut.UserId, ut.LoginProvider, ut.Name });


            modelBuilder.Entity<User>().ToTable("Users");
            modelBuilder.Entity<Patient>().ToTable("Patients");
            modelBuilder.Entity<Physiotherapist>().ToTable("Physiotherapists");

            BuildPhysiothreapistSpecializationEntity(modelBuilder);
            BuildAppointmentEntity(modelBuilder);
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

            modelBuilder.Entity<Physiotherapist>()
                 .HasMany(p => p.PhysiotherapySpecializations)
                 .WithMany(s => s.Physiotherapists)
                 .UsingEntity(j => j.ToTable("PhysiotherapistSpecializations"));
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Patient> Patients { get; set; }
        public DbSet<Physiotherapist> Physiotherapists { get; set; }
        public DbSet<PhysiotherapySpecializationEntity> PhysiotherapySpecializationEntities { get; set; }
        public DbSet<Appointment> Appointments { get; set; }

    }
}
