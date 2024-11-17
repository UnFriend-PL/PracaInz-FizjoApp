﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Fizjobackend.DbContexts;

#nullable disable

namespace Fizjobackend.Migrations
{
    [DbContext(typeof(FizjoDbContext))]
    [Migration("20241115165236_BlogTable")]
    partial class BlogTable
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.7")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("JointTreatment", b =>
                {
                    b.Property<int>("JointsId")
                        .HasColumnType("int");

                    b.Property<Guid>("TreatmentsId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("JointsId", "TreatmentsId");

                    b.HasIndex("TreatmentsId");

                    b.ToTable("TreatmentJoints", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole<System.Guid>", b =>
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

                    b.ToTable("Roles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<System.Guid>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("RoleId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.ToTable("RoleClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<System.Guid>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.ToTable("UserClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<System.Guid>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.ToTable("UserLogins", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<System.Guid>", b =>
                {
                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("RoleId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("UserId", "RoleId");

                    b.ToTable("UsersRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<System.Guid>", b =>
                {
                    b.Property<Guid>("UserId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Value")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("UserTokens", (string)null);
                });

            modelBuilder.Entity("MuscleTreatment", b =>
                {
                    b.Property<int>("MusclesId")
                        .HasColumnType("int");

                    b.Property<Guid>("TreatmentsId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("MusclesId", "TreatmentsId");

                    b.HasIndex("TreatmentsId");

                    b.ToTable("TreatmentMuscles", (string)null);
                });

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

                    b.Property<string>("InitialCondition")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsPaid")
                        .HasColumnType("bit");

                    b.Property<DateTime?>("MovedFromDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Notes")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("PainLevelAfter")
                        .HasColumnType("int");

                    b.Property<int?>("PainLevelBeofore")
                        .HasColumnType("int");

                    b.Property<Guid>("PatientId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("PhysiotherapistId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<double>("Price")
                        .HasColumnType("float");

                    b.HasKey("AppointmentId");

                    b.HasIndex("PatientId");

                    b.HasIndex("PhysiotherapistId");

                    b.ToTable("Appointments");
                });

            modelBuilder.Entity("fizjobackend.Entities.AppointmentEntities.AppointmentBodyDetails", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("AppointmentId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("BodySectionId")
                        .HasColumnType("int");

                    b.Property<string>("BodySide")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("JointId")
                        .HasColumnType("int");

                    b.Property<int?>("MuscleId")
                        .HasColumnType("int");

                    b.Property<int>("ViewId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("AppointmentId");

                    b.HasIndex("BodySectionId");

                    b.HasIndex("JointId");

                    b.HasIndex("MuscleId");

                    b.HasIndex("ViewId");

                    b.ToTable("AppointmentBodyDetails");
                });

            modelBuilder.Entity("fizjobackend.Entities.BlogEntities.Comment", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Author")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Body")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<Guid>("PostId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.HasIndex("PostId");

                    b.ToTable("Comment", "Blog");
                });

            modelBuilder.Entity("fizjobackend.Entities.BlogEntities.Post", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Author")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Body")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("datetime2");

                    b.Property<string>("ImagePath")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("datetime2");

                    b.Property<int>("UsabilityRating")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Posts", "Blog");
                });

            modelBuilder.Entity("fizjobackend.Entities.BlogEntities.Tag", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid>("PostId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("Id");

                    b.HasIndex("PostId");

                    b.ToTable("Tag", "Blog");
                });

            modelBuilder.Entity("fizjobackend.Entities.BlogEntities.Usability", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("CommentId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<Guid>("PostId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("Rating")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("CommentId")
                        .IsUnique();

                    b.HasIndex("PostId");

                    b.ToTable("Usability", "Blog");
                });

            modelBuilder.Entity("fizjobackend.Entities.BodyEntities.BodySection", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("BodySectionName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("BodySectionNamePL")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("BodySide")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("BodySidePL")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("ViewId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("ViewId");

                    b.ToTable("BodySections");
                });

            modelBuilder.Entity("fizjobackend.Entities.BodyEntities.Joint", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("BodySectionId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NamePL")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("BodySectionId");

                    b.ToTable("Joints");
                });

            modelBuilder.Entity("fizjobackend.Entities.BodyEntities.Muscle", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("BodySectionId")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NamePL")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("BodySectionId");

                    b.ToTable("Muscles");
                });

            modelBuilder.Entity("fizjobackend.Entities.BodyEntities.View", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Gender")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NamePL")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Views");
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

            modelBuilder.Entity("fizjobackend.Entities.TreatmentsEntities.Treatment", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("BodySectionId")
                        .HasColumnType("int");

                    b.Property<string>("BodySide")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("CreateDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("DescriptionPL")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<TimeSpan>("Duration")
                        .HasColumnType("time");

                    b.Property<bool>("IsDefault")
                        .HasColumnType("bit");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("NamePL")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<Guid?>("OwnerId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("SectionName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SectionNamePL")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("UpdateDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("ViewId")
                        .HasColumnType("int");

                    b.Property<string>("ViewName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ViewNamePL")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("OwnerId");

                    b.ToTable("Treatments");
                });

            modelBuilder.Entity("fizjobackend.Entities.UserEntities.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<string>("AvatarPath")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("City")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ConcurrencyStamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Country")
                        .IsRequired()
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

                    b.Property<DateTime?>("LastModifiedDate")
                        .HasColumnType("datetime2");

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

                    b.Property<string>("PostCode")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("ResetTokenExpires")
                        .HasColumnType("datetime2");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("StreetWithHouseNumber")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("bit");

                    b.Property<string>("UserName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("VerificationToken")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("VerifiedAt")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.ToTable("Users", (string)null);

                    b.UseTptMappingStrategy();
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

            modelBuilder.Entity("JointTreatment", b =>
                {
                    b.HasOne("fizjobackend.Entities.BodyEntities.Joint", null)
                        .WithMany()
                        .HasForeignKey("JointsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("fizjobackend.Entities.TreatmentsEntities.Treatment", null)
                        .WithMany()
                        .HasForeignKey("TreatmentsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("MuscleTreatment", b =>
                {
                    b.HasOne("fizjobackend.Entities.BodyEntities.Muscle", null)
                        .WithMany()
                        .HasForeignKey("MusclesId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("fizjobackend.Entities.TreatmentsEntities.Treatment", null)
                        .WithMany()
                        .HasForeignKey("TreatmentsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
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

            modelBuilder.Entity("fizjobackend.Entities.AppointmentEntities.AppointmentBodyDetails", b =>
                {
                    b.HasOne("fizjobackend.Entities.AppointmentEntities.Appointment", "Appointment")
                        .WithMany("AppointmentBodyDetails")
                        .HasForeignKey("AppointmentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("fizjobackend.Entities.BodyEntities.BodySection", "BodySection")
                        .WithMany()
                        .HasForeignKey("BodySectionId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("fizjobackend.Entities.BodyEntities.Joint", "Joint")
                        .WithMany()
                        .HasForeignKey("JointId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("fizjobackend.Entities.BodyEntities.Muscle", "Muscle")
                        .WithMany()
                        .HasForeignKey("MuscleId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("fizjobackend.Entities.BodyEntities.View", "View")
                        .WithMany()
                        .HasForeignKey("ViewId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Appointment");

                    b.Navigation("BodySection");

                    b.Navigation("Joint");

                    b.Navigation("Muscle");

                    b.Navigation("View");
                });

            modelBuilder.Entity("fizjobackend.Entities.BlogEntities.Comment", b =>
                {
                    b.HasOne("fizjobackend.Entities.BlogEntities.Post", "Post")
                        .WithMany("Comments")
                        .HasForeignKey("PostId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Post");
                });

            modelBuilder.Entity("fizjobackend.Entities.BlogEntities.Tag", b =>
                {
                    b.HasOne("fizjobackend.Entities.BlogEntities.Post", "Post")
                        .WithMany("Tags")
                        .HasForeignKey("PostId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Post");
                });

            modelBuilder.Entity("fizjobackend.Entities.BlogEntities.Usability", b =>
                {
                    b.HasOne("fizjobackend.Entities.BlogEntities.Comment", "Comment")
                        .WithOne("Usability")
                        .HasForeignKey("fizjobackend.Entities.BlogEntities.Usability", "CommentId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("fizjobackend.Entities.BlogEntities.Post", "Post")
                        .WithMany("Usabilities")
                        .HasForeignKey("PostId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Comment");

                    b.Navigation("Post");
                });

            modelBuilder.Entity("fizjobackend.Entities.BodyEntities.BodySection", b =>
                {
                    b.HasOne("fizjobackend.Entities.BodyEntities.View", "View")
                        .WithMany("BodySections")
                        .HasForeignKey("ViewId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("View");
                });

            modelBuilder.Entity("fizjobackend.Entities.BodyEntities.Joint", b =>
                {
                    b.HasOne("fizjobackend.Entities.BodyEntities.BodySection", "BodySection")
                        .WithMany("Joints")
                        .HasForeignKey("BodySectionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("BodySection");
                });

            modelBuilder.Entity("fizjobackend.Entities.BodyEntities.Muscle", b =>
                {
                    b.HasOne("fizjobackend.Entities.BodyEntities.BodySection", "BodySection")
                        .WithMany("Muscles")
                        .HasForeignKey("BodySectionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("BodySection");
                });

            modelBuilder.Entity("fizjobackend.Entities.PatientEntities.MedicalRaport", b =>
                {
                    b.HasOne("fizjobackend.Entities.PatientEntities.Patient", null)
                        .WithMany("MedicalRaports")
                        .HasForeignKey("PatientId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("fizjobackend.Entities.TreatmentsEntities.Treatment", b =>
                {
                    b.HasOne("fizjobackend.Entities.PhysiotherapistEntities.Physiotherapist", "Physiotherapist")
                        .WithMany("Treatments")
                        .HasForeignKey("OwnerId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.Navigation("Physiotherapist");
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

            modelBuilder.Entity("fizjobackend.Entities.AppointmentEntities.Appointment", b =>
                {
                    b.Navigation("AppointmentBodyDetails");
                });

            modelBuilder.Entity("fizjobackend.Entities.BlogEntities.Comment", b =>
                {
                    b.Navigation("Usability")
                        .IsRequired();
                });

            modelBuilder.Entity("fizjobackend.Entities.BlogEntities.Post", b =>
                {
                    b.Navigation("Comments");

                    b.Navigation("Tags");

                    b.Navigation("Usabilities");
                });

            modelBuilder.Entity("fizjobackend.Entities.BodyEntities.BodySection", b =>
                {
                    b.Navigation("Joints");

                    b.Navigation("Muscles");
                });

            modelBuilder.Entity("fizjobackend.Entities.BodyEntities.View", b =>
                {
                    b.Navigation("BodySections");
                });

            modelBuilder.Entity("fizjobackend.Entities.PatientEntities.Patient", b =>
                {
                    b.Navigation("Appointments");

                    b.Navigation("MedicalRaports");
                });

            modelBuilder.Entity("fizjobackend.Entities.PhysiotherapistEntities.Physiotherapist", b =>
                {
                    b.Navigation("Appointments");

                    b.Navigation("Treatments");
                });
#pragma warning restore 612, 618
        }
    }
}
