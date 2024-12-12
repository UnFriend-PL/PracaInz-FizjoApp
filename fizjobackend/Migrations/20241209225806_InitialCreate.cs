using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace fizjobackend.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "Blog");

            migrationBuilder.CreateTable(
                name: "PhysiotherapySpecializationEntities",
                columns: table => new
                {
                    PhysiotherapySpecializationId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PhysiotherapySpecialization = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PhysiotherapySpecializationEntities", x => x.PhysiotherapySpecializationId);
                });

            migrationBuilder.CreateTable(
                name: "Posts",
                schema: "Blog",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Body = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ImagePath = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Author = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UsabilityRating = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Posts", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ClaimType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RoleClaims", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NormalizedName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ClaimType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserClaims", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProviderKey = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProviderDisplayName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserLogins", x => new { x.LoginProvider, x.ProviderKey });
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    AvatarPath = table.Column<string>(type: "nvarchar(max)", nullable: false, defaultValue: "default-avatar.png"),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Gender = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Country = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    City = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StreetWithHouseNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PostCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Pesel = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DateOfBirth = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UserName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LastModifiedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    VerificationToken = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    VerifiedAt = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ResetTokenExpires = table.Column<DateTime>(type: "datetime2", nullable: true),
                    NormalizedUserName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NormalizedEmail = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SecurityStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "bit", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "bit", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UsersRoles",
                columns: table => new
                {
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    RoleId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UsersRoles", x => new { x.UserId, x.RoleId });
                });

            migrationBuilder.CreateTable(
                name: "UserTokens",
                columns: table => new
                {
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    LoginProvider = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                });

            migrationBuilder.CreateTable(
                name: "Views",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NamePL = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Gender = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Views", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Comment",
                schema: "Blog",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Body = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Author = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AuthorId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PostId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Comment", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Comment_Posts_PostId",
                        column: x => x.PostId,
                        principalSchema: "Blog",
                        principalTable: "Posts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Tag",
                schema: "Blog",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PostId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tag", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Tag_Posts_PostId",
                        column: x => x.PostId,
                        principalSchema: "Blog",
                        principalTable: "Posts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Usability",
                schema: "Blog",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Rating = table.Column<int>(type: "int", nullable: false),
                    PostId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    OwnerId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Usability", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Usability_Posts_PostId",
                        column: x => x.PostId,
                        principalSchema: "Blog",
                        principalTable: "Posts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Patients",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    HealthInsuranceNumber = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Patients", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Patients_Users_Id",
                        column: x => x.Id,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Physiotherapists",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    LicenseNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Experience = table.Column<int>(type: "int", nullable: false),
                    Education = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Physiotherapists", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Physiotherapists_Users_Id",
                        column: x => x.Id,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "BodySections",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BodySectionName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BodySectionNamePL = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BodySide = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BodySidePL = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ViewId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BodySections", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BodySections_Views_ViewId",
                        column: x => x.ViewId,
                        principalTable: "Views",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MedicalRaport",
                columns: table => new
                {
                    MedicalRaportId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PatientId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    RaportPath = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RaportName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UploadDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MedicalRaport", x => x.MedicalRaportId);
                    table.ForeignKey(
                        name: "FK_MedicalRaport_Patients_PatientId",
                        column: x => x.PatientId,
                        principalTable: "Patients",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Appointments",
                columns: table => new
                {
                    AppointmentId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    AppointmentStatus = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PatientId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PhysiotherapistId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    AppointmentDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    MovedFromDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    AppointmentDescription = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Notes = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Diagnosis = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsPaid = table.Column<bool>(type: "bit", nullable: false),
                    Price = table.Column<double>(type: "float", nullable: false),
                    PainLevelBeofore = table.Column<int>(type: "int", nullable: true),
                    PainLevelAfter = table.Column<int>(type: "int", nullable: true),
                    InitialCondition = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Appointments", x => x.AppointmentId);
                    table.ForeignKey(
                        name: "FK_Appointments_Patients_PatientId",
                        column: x => x.PatientId,
                        principalTable: "Patients",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Appointments_Physiotherapists_PhysiotherapistId",
                        column: x => x.PhysiotherapistId,
                        principalTable: "Physiotherapists",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Opinions",
                columns: table => new
                {
                    OpinionId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PatientId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PhysiotherapistId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    NameAndFirstLetterOfTheLastName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Comment = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Rating = table.Column<int>(type: "int", nullable: false),
                    UploadDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Opinions", x => x.OpinionId);
                    table.ForeignKey(
                        name: "FK_Opinions_Patients_PatientId",
                        column: x => x.PatientId,
                        principalTable: "Patients",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Opinions_Physiotherapists_PhysiotherapistId",
                        column: x => x.PhysiotherapistId,
                        principalTable: "Physiotherapists",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PhysiotherapistSpecializations",
                columns: table => new
                {
                    PhysiotherapistsId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PhysiotherapySpecializationsPhysiotherapySpecializationId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PhysiotherapistSpecializations", x => new { x.PhysiotherapistsId, x.PhysiotherapySpecializationsPhysiotherapySpecializationId });
                    table.ForeignKey(
                        name: "FK_PhysiotherapistSpecializations_Physiotherapists_PhysiotherapistsId",
                        column: x => x.PhysiotherapistsId,
                        principalTable: "Physiotherapists",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PhysiotherapistSpecializations_PhysiotherapySpecializationEntities_PhysiotherapySpecializationsPhysiotherapySpecializationId",
                        column: x => x.PhysiotherapySpecializationsPhysiotherapySpecializationId,
                        principalTable: "PhysiotherapySpecializationEntities",
                        principalColumn: "PhysiotherapySpecializationId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Treatments",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    OwnerId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    IsDefault = table.Column<bool>(type: "bit", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DescriptionPL = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NamePL = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Duration = table.Column<TimeSpan>(type: "time", nullable: false),
                    CreateDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdateDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    ViewId = table.Column<int>(type: "int", nullable: false),
                    ViewName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ViewNamePL = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BodySide = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BodySidePL = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SectionName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SectionNamePL = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Gender = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BodySectionId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Treatments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Treatments_Physiotherapists_OwnerId",
                        column: x => x.OwnerId,
                        principalTable: "Physiotherapists",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "WorkingHours",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PhysiotherapistId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    DayOfWeek = table.Column<int>(type: "int", nullable: false),
                    StartHour = table.Column<TimeSpan>(type: "time", nullable: false),
                    EndHour = table.Column<TimeSpan>(type: "time", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkingHours", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WorkingHours_Physiotherapists_PhysiotherapistId",
                        column: x => x.PhysiotherapistId,
                        principalTable: "Physiotherapists",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Joints",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NamePL = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BodySectionId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Joints", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Joints_BodySections_BodySectionId",
                        column: x => x.BodySectionId,
                        principalTable: "BodySections",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Muscles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NamePL = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BodySectionId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Muscles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Muscles_BodySections_BodySectionId",
                        column: x => x.BodySectionId,
                        principalTable: "BodySections",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AppointmentTreatmens",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    AppointmentId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TreatmentId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Duration = table.Column<TimeSpan>(type: "time", nullable: false),
                    Notes = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UpdateDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppointmentTreatmens", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AppointmentTreatmens_Appointments_AppointmentId",
                        column: x => x.AppointmentId,
                        principalTable: "Appointments",
                        principalColumn: "AppointmentId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AppointmentTreatmens_Treatments_TreatmentId",
                        column: x => x.TreatmentId,
                        principalTable: "Treatments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "TreatmentJoints",
                columns: table => new
                {
                    JointsId = table.Column<int>(type: "int", nullable: false),
                    TreatmentsId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TreatmentJoints", x => new { x.JointsId, x.TreatmentsId });
                    table.ForeignKey(
                        name: "FK_TreatmentJoints_Joints_JointsId",
                        column: x => x.JointsId,
                        principalTable: "Joints",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TreatmentJoints_Treatments_TreatmentsId",
                        column: x => x.TreatmentsId,
                        principalTable: "Treatments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AppointmentBodyDetails",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    AppointmentId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    BodySectionId = table.Column<int>(type: "int", nullable: false),
                    ViewId = table.Column<int>(type: "int", nullable: false),
                    MuscleId = table.Column<int>(type: "int", nullable: true),
                    JointId = table.Column<int>(type: "int", nullable: true),
                    BodySide = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppointmentBodyDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AppointmentBodyDetails_Appointments_AppointmentId",
                        column: x => x.AppointmentId,
                        principalTable: "Appointments",
                        principalColumn: "AppointmentId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AppointmentBodyDetails_BodySections_BodySectionId",
                        column: x => x.BodySectionId,
                        principalTable: "BodySections",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AppointmentBodyDetails_Joints_JointId",
                        column: x => x.JointId,
                        principalTable: "Joints",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AppointmentBodyDetails_Muscles_MuscleId",
                        column: x => x.MuscleId,
                        principalTable: "Muscles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AppointmentBodyDetails_Views_ViewId",
                        column: x => x.ViewId,
                        principalTable: "Views",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "TreatmentMuscles",
                columns: table => new
                {
                    MusclesId = table.Column<int>(type: "int", nullable: false),
                    TreatmentsId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TreatmentMuscles", x => new { x.MusclesId, x.TreatmentsId });
                    table.ForeignKey(
                        name: "FK_TreatmentMuscles_Muscles_MusclesId",
                        column: x => x.MusclesId,
                        principalTable: "Muscles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TreatmentMuscles_Treatments_TreatmentsId",
                        column: x => x.TreatmentsId,
                        principalTable: "Treatments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "PhysiotherapySpecializationEntities",
                columns: new[] { "PhysiotherapySpecializationId", "PhysiotherapySpecialization" },
                values: new object[,]
                {
                    { new Guid("03e45b5a-2c80-4187-b672-0f1aec15e5f4"), "Pediatric" },
                    { new Guid("343af049-1b68-47bf-8cec-ac89f20a8b06"), "Neurological" },
                    { new Guid("516aa73d-49cf-434e-a8a9-9b30e3f1a9f6"), "Oncological" },
                    { new Guid("6be4ebde-f6fe-4239-a55c-88906b311dc4"), "Orthopedic" },
                    { new Guid("86da9521-68ca-402f-8592-0e5e80b14dc1"), "Urogynecological" },
                    { new Guid("896a2465-9f63-4be4-af39-00377d9e5b2d"), "Occupational" },
                    { new Guid("8e1618c9-df9d-4f33-b293-10622c87c0d1"), "Geriatric" },
                    { new Guid("a627ab87-9fa7-4e6e-a94f-2a5f0b60fccf"), "Dental" },
                    { new Guid("da89c3c6-029a-4b1f-9b0d-fad4f94f1d92"), "Sports" },
                    { new Guid("ef2f6545-1a5f-4831-b896-4f7a1e191892"), "CardiovascularAndPulmonary" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_AppointmentBodyDetails_AppointmentId",
                table: "AppointmentBodyDetails",
                column: "AppointmentId");

            migrationBuilder.CreateIndex(
                name: "IX_AppointmentBodyDetails_BodySectionId",
                table: "AppointmentBodyDetails",
                column: "BodySectionId");

            migrationBuilder.CreateIndex(
                name: "IX_AppointmentBodyDetails_JointId",
                table: "AppointmentBodyDetails",
                column: "JointId");

            migrationBuilder.CreateIndex(
                name: "IX_AppointmentBodyDetails_MuscleId",
                table: "AppointmentBodyDetails",
                column: "MuscleId");

            migrationBuilder.CreateIndex(
                name: "IX_AppointmentBodyDetails_ViewId",
                table: "AppointmentBodyDetails",
                column: "ViewId");

            migrationBuilder.CreateIndex(
                name: "IX_Appointments_PatientId",
                table: "Appointments",
                column: "PatientId");

            migrationBuilder.CreateIndex(
                name: "IX_Appointments_PhysiotherapistId",
                table: "Appointments",
                column: "PhysiotherapistId");

            migrationBuilder.CreateIndex(
                name: "IX_AppointmentTreatmens_AppointmentId",
                table: "AppointmentTreatmens",
                column: "AppointmentId");

            migrationBuilder.CreateIndex(
                name: "IX_AppointmentTreatmens_TreatmentId",
                table: "AppointmentTreatmens",
                column: "TreatmentId");

            migrationBuilder.CreateIndex(
                name: "IX_BodySections_ViewId",
                table: "BodySections",
                column: "ViewId");

            migrationBuilder.CreateIndex(
                name: "IX_Comment_PostId",
                schema: "Blog",
                table: "Comment",
                column: "PostId");

            migrationBuilder.CreateIndex(
                name: "IX_Joints_BodySectionId",
                table: "Joints",
                column: "BodySectionId");

            migrationBuilder.CreateIndex(
                name: "IX_MedicalRaport_PatientId",
                table: "MedicalRaport",
                column: "PatientId");

            migrationBuilder.CreateIndex(
                name: "IX_Muscles_BodySectionId",
                table: "Muscles",
                column: "BodySectionId");

            migrationBuilder.CreateIndex(
                name: "IX_Opinions_PatientId",
                table: "Opinions",
                column: "PatientId");

            migrationBuilder.CreateIndex(
                name: "IX_Opinions_PhysiotherapistId",
                table: "Opinions",
                column: "PhysiotherapistId");

            migrationBuilder.CreateIndex(
                name: "IX_PhysiotherapistSpecializations_PhysiotherapySpecializationsPhysiotherapySpecializationId",
                table: "PhysiotherapistSpecializations",
                column: "PhysiotherapySpecializationsPhysiotherapySpecializationId");

            migrationBuilder.CreateIndex(
                name: "IX_Tag_PostId",
                schema: "Blog",
                table: "Tag",
                column: "PostId");

            migrationBuilder.CreateIndex(
                name: "IX_TreatmentJoints_TreatmentsId",
                table: "TreatmentJoints",
                column: "TreatmentsId");

            migrationBuilder.CreateIndex(
                name: "IX_TreatmentMuscles_TreatmentsId",
                table: "TreatmentMuscles",
                column: "TreatmentsId");

            migrationBuilder.CreateIndex(
                name: "IX_Treatments_OwnerId",
                table: "Treatments",
                column: "OwnerId");

            migrationBuilder.CreateIndex(
                name: "IX_Usability_PostId",
                schema: "Blog",
                table: "Usability",
                column: "PostId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkingHours_PhysiotherapistId",
                table: "WorkingHours",
                column: "PhysiotherapistId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AppointmentBodyDetails");

            migrationBuilder.DropTable(
                name: "AppointmentTreatmens");

            migrationBuilder.DropTable(
                name: "Comment",
                schema: "Blog");

            migrationBuilder.DropTable(
                name: "MedicalRaport");

            migrationBuilder.DropTable(
                name: "Opinions");

            migrationBuilder.DropTable(
                name: "PhysiotherapistSpecializations");

            migrationBuilder.DropTable(
                name: "RoleClaims");

            migrationBuilder.DropTable(
                name: "Roles");

            migrationBuilder.DropTable(
                name: "Tag",
                schema: "Blog");

            migrationBuilder.DropTable(
                name: "TreatmentJoints");

            migrationBuilder.DropTable(
                name: "TreatmentMuscles");

            migrationBuilder.DropTable(
                name: "Usability",
                schema: "Blog");

            migrationBuilder.DropTable(
                name: "UserClaims");

            migrationBuilder.DropTable(
                name: "UserLogins");

            migrationBuilder.DropTable(
                name: "UsersRoles");

            migrationBuilder.DropTable(
                name: "UserTokens");

            migrationBuilder.DropTable(
                name: "WorkingHours");

            migrationBuilder.DropTable(
                name: "Appointments");

            migrationBuilder.DropTable(
                name: "PhysiotherapySpecializationEntities");

            migrationBuilder.DropTable(
                name: "Joints");

            migrationBuilder.DropTable(
                name: "Muscles");

            migrationBuilder.DropTable(
                name: "Treatments");

            migrationBuilder.DropTable(
                name: "Posts",
                schema: "Blog");

            migrationBuilder.DropTable(
                name: "Patients");

            migrationBuilder.DropTable(
                name: "BodySections");

            migrationBuilder.DropTable(
                name: "Physiotherapists");

            migrationBuilder.DropTable(
                name: "Views");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
