using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace fizjobackend.Migrations
{
    /// <inheritdoc />
    public partial class OpinionsPatients : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Opinions",
                columns: table => new
                {
                    OpinionId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PatientId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PhysiotherapistId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    nameAndFirstLetterOfTheLastName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    comment = table.Column<string>(type: "nvarchar(max)", nullable: false),
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
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Opinions_PatientId",
                table: "Opinions",
                column: "PatientId");

            migrationBuilder.CreateIndex(
                name: "IX_Opinions_PhysiotherapistId",
                table: "Opinions",
                column: "PhysiotherapistId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Opinions");
        }
    }
}
