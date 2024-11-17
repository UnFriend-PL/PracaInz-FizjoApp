using Fizjobackend.Entities.AppointmentEntities;
using Fizjobackend.Entities.BlogEntities;
using Fizjobackend.Entities.BodyEntities;
using Fizjobackend.Entities.PatientEntities;
using Fizjobackend.Entities.PhysiotherapistEntities;
using Fizjobackend.Entities.TreatmentsEntities;
using Fizjobackend.Entities.UserEntities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Fizjobackend.DbContexts
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

            BuildBlogEntities(modelBuilder);
            BuildTreatmentsEntities(modelBuilder);
            BuildPhysiotherapistSpecializationEntities(modelBuilder);
            BuildAppointmentEntities(modelBuilder);
            BuildBodyEntities(modelBuilder);
            BuildAppointmentBodyDetailsEntities(modelBuilder);

            static void BuildTreatmentsEntities(ModelBuilder modelBuilder)
            {
                modelBuilder.Entity<Treatment>()
                    .HasMany(t => t.Muscles)
                    .WithMany(m => m.Treatments)
                    .UsingEntity(j => j.ToTable("TreatmentMuscles"));

                modelBuilder.Entity<Treatment>()
                    .HasMany(t => t.Joints)
                    .WithMany(j => j.Treatments)
                    .UsingEntity(j => j.ToTable("TreatmentJoints"));

                modelBuilder.Entity<Treatment>()
                    .HasKey(t => t.Id);
                modelBuilder.Entity<Treatment>()
                    .HasOne(t => t.Physiotherapist)
                    .WithMany(p => p.Treatments)
                    .HasForeignKey(t => t.OwnerId)
                    .OnDelete(DeleteBehavior.Restrict);
            }
        }

        private static void BuildBlogEntities(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Post>().ToTable("Posts", "Blog");
            modelBuilder.Entity<Usability>().ToTable("Usability", "Blog");
            modelBuilder.Entity<Comment>().ToTable("Comment", "Blog");
            modelBuilder.Entity<Tag>().ToTable("Tag", "Blog");

            modelBuilder.Entity<Post>()
                .Property(p => p.Id).ValueGeneratedOnAdd();
            modelBuilder.Entity<Comment>()
                .Property(c => c.Id).ValueGeneratedOnAdd();
            modelBuilder.Entity<Tag>()
                .Property(t => t.Id).ValueGeneratedOnAdd();
            modelBuilder.Entity<Usability>()
                .Property(u => u.Id).ValueGeneratedOnAdd();

            modelBuilder.Entity<Post>()
                .HasMany(p => p.Tags)
                .WithOne(t => t.Post)
                .HasForeignKey(t => t.PostId)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Post>()
                .HasMany(p => p.Comments)
                .WithOne(c => c.Post)
                .HasForeignKey(c=> c.PostId)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Comment>()
                .HasOne(c => c.Post)
                .WithMany(p => p.Comments)
                .HasForeignKey(c=> c.PostId)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<Post>()
                .HasMany(p => p.Usabilities)
                .WithOne(u => u.Post)
                .HasForeignKey(u => u.PostId);
            
        }

        private static void BuildBodyEntities(ModelBuilder modelBuilder)
        {
            // View -> BodySection
            modelBuilder.Entity<BodySection>()
                .HasOne(bs => bs.View)
                .WithMany(v => v.BodySections)
                .HasForeignKey(bs => bs.ViewId);

            // BodySection -> Muscle
            modelBuilder.Entity<Muscle>()
                .HasOne(m => m.BodySection)
                .WithMany(bs => bs.Muscles)
                .HasForeignKey(m => m.BodySectionId);

            // BodySection -> Joint
            modelBuilder.Entity<Joint>()
                .HasOne(j => j.BodySection)
                .WithMany(bs => bs.Joints)
                .HasForeignKey(j => j.BodySectionId);
        }

        private static void BuildAppointmentEntities(ModelBuilder modelBuilder)
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

            modelBuilder.Entity<Appointment>()
                .HasMany(e => e.AppointmentBodyDetails)
                .WithOne(e => e.Appointment)
                .HasForeignKey(e => e.AppointmentId)
                .OnDelete(DeleteBehavior.Cascade);
        }

        private static void BuildAppointmentBodyDetailsEntities(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AppointmentBodyDetails>()
                .HasOne(e => e.BodySection)
                .WithMany()
                .HasForeignKey(e => e.BodySectionId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<AppointmentBodyDetails>()
                .HasOne(e => e.View)
                .WithMany()
                .HasForeignKey(e => e.ViewId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<AppointmentBodyDetails>()
                .HasOne(e => e.Muscle)
                .WithMany()
                .HasForeignKey(e => e.MuscleId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<AppointmentBodyDetails>()
                .HasOne(e => e.Joint)
                .WithMany()
                .HasForeignKey(e => e.JointId)
                .OnDelete(DeleteBehavior.Restrict);
        }

        private static void BuildPhysiotherapistSpecializationEntities(ModelBuilder modelBuilder)
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

        // Body parts db entities
        public DbSet<View> Views { get; set; }
        public DbSet<BodySection> BodySections { get; set; }
        public DbSet<Muscle> Muscles { get; set; }
        public DbSet<Joint> Joints { get; set; }

        // Appointment body details
        public DbSet<AppointmentBodyDetails> AppointmentBodyDetails { get; set; }

        // Treatment db entities
        public DbSet<Treatment> Treatments { get; set; }

        // Blog

        public DbSet<Post> Posts { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<Usability> Usabilities { get; set; }
    }
}
