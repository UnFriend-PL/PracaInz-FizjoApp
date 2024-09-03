using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace fizjobackend.Migrations
{
    /// <inheritdoc />
    public partial class AppointmentBodyDetails : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AppointmentBodyDetails",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    AppointmentId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    BodySectionId = table.Column<int>(type: "int", nullable: false),
                    ViewId = table.Column<int>(type: "int", nullable: false),
                    MuscleId = table.Column<int>(type: "int", nullable: false),
                    JointId = table.Column<int>(type: "int", nullable: false),
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
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AppointmentBodyDetails");
        }
    }
}
