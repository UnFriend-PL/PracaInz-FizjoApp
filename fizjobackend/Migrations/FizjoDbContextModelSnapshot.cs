﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using fizjobackend.DbContexts;

#nullable disable

namespace fizjobackend.Migrations
{
    [DbContext(typeof(FizjoDbContext))]
    partial class FizjoDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.7")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("PhysiotherapistPhysiotherapySpecializationEntity", b =>
                {
                    b.Property<Guid>("PhysiotherapistsId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("PhysiotherapySpecializationsPhysiotherapySpecializationId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("PhysiotherapistsId", "PhysiotherapySpecializationsPhysiotherapySpecializationId");

                    b.HasIndex("PhysiotherapySpecializationsPhysiotherapySpecializationId");

                    b.ToTable("PhysiotherapistSpecializations", (string)null);
                });

            modelBuilder.Entity("fizjobackend.Entities.AppointmentEntities.Appointment", b =>
                {
                    b.Property<Guid>("AppointmentId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("AppointmentDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("AppointmentDescription")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("AppointmentStatus")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Diagnosis")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("MovedFromDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Notes")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("PatientId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("PhysiotherapistId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("AppointmentId");

                    b.HasIndex("PatientId");

                    b.HasIndex("PhysiotherapistId");

                    b.ToTable("Appointments");
                });

            modelBuilder.Entity("fizjobackend.Entities.PatientEntities.MedicalRaport", b =>
                {
                    b.Property<Guid>("MedicalRaportId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("PatientId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("RaportName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RaportPath")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("UploadDate")
                        .HasColumnType("datetime2");

                    b.HasKey("MedicalRaportId");

                    b.HasIndex("PatientId");

                    b.ToTable("MedicalRaport");
                });

            modelBuilder.Entity("fizjobackend.Entities.PhysiotherapistEntities.PhysiotherapySpecializationEntity", b =>
                {
                    b.Property<Guid>("PhysiotherapySpecializationId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("PhysiotherapySpecialization")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("PhysiotherapySpecializationId");

                    b.ToTable("PhysiotherapySpecializationEntities");
                });

            modelBuilder.Entity("fizjobackend.Entities.UserEntities.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("AvatarPath")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ConcurrencyStamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("DateOfBirth")
                        .HasColumnType("datetime2");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Gender")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("bit");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("datetimeoffset");

                    b.Property<string>("NormalizedEmail")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NormalizedUserName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Pesel")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("bit");

                    b.Property<string>("UserName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Users", (string)null);

                    b.UseTptMappingStrategy();
                });

            modelBuilder.Entity("fizjobackend.Entities.UserEntities.UserRoles", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("ConcurrencyStamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NormalizedName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("UserRoles");
                });

            modelBuilder.Entity("fizjobackend.Entities.PatientEntities.Patient", b =>
                {
                    b.HasBaseType("fizjobackend.Entities.UserEntities.User");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("HealthInsuranceNumber")
                        .HasColumnType("nvarchar(max)");

                    b.ToTable("Patients", (string)null);
                });

            modelBuilder.Entity("fizjobackend.Entities.PhysiotherapistEntities.Physiotherapist", b =>
                {
                    b.HasBaseType("fizjobackend.Entities.UserEntities.User");

                    b.Property<string>("LicenseNumber")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.ToTable("Physiotherapists", (string)null);
                });

            modelBuilder.Entity("PhysiotherapistPhysiotherapySpecializationEntity", b =>
                {
                    b.HasOne("fizjobackend.Entities.PhysiotherapistEntities.Physiotherapist", null)
                        .WithMany()
                        .HasForeignKey("PhysiotherapistsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("fizjobackend.Entities.PhysiotherapistEntities.PhysiotherapySpecializationEntity", null)
                        .WithMany()
                        .HasForeignKey("PhysiotherapySpecializationsPhysiotherapySpecializationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("fizjobackend.Entities.AppointmentEntities.Appointment", b =>
                {
                    b.HasOne("fizjobackend.Entities.PatientEntities.Patient", "Patient")
                        .WithMany("Appointments")
                        .HasForeignKey("PatientId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("fizjobackend.Entities.PhysiotherapistEntities.Physiotherapist", "Physiotherapist")
                        .WithMany("Appointments")
                        .HasForeignKey("PhysiotherapistId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Patient");

                    b.Navigation("Physiotherapist");
                });

            modelBuilder.Entity("fizjobackend.Entities.PatientEntities.MedicalRaport", b =>
                {
                    b.HasOne("fizjobackend.Entities.PatientEntities.Patient", null)
                        .WithMany("MedicalRaports")
                        .HasForeignKey("PatientId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("fizjobackend.Entities.PatientEntities.Patient", b =>
                {
                    b.HasOne("fizjobackend.Entities.UserEntities.User", null)
                        .WithOne()
                        .HasForeignKey("fizjobackend.Entities.PatientEntities.Patient", "Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("fizjobackend.Entities.PhysiotherapistEntities.Physiotherapist", b =>
                {
                    b.HasOne("fizjobackend.Entities.UserEntities.User", null)
                        .WithOne()
                        .HasForeignKey("fizjobackend.Entities.PhysiotherapistEntities.Physiotherapist", "Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("fizjobackend.Entities.PatientEntities.Patient", b =>
                {
                    b.Navigation("Appointments");

                    b.Navigation("MedicalRaports");
                });

            modelBuilder.Entity("fizjobackend.Entities.PhysiotherapistEntities.Physiotherapist", b =>
                {
                    b.Navigation("Appointments");
                });
#pragma warning restore 612, 618
        }
    }
}
