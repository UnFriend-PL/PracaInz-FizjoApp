using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace fizjobackend.Migrations
{
    /// <inheritdoc />
    public partial class Treatments2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TreatmentBodySections",
                columns: table => new
                {
                    BodySectionsId = table.Column<int>(type: "int", nullable: false),
                    TreatmentsId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TreatmentBodySections", x => new { x.BodySectionsId, x.TreatmentsId });
                    table.ForeignKey(
                        name: "FK_TreatmentBodySections_BodySections_BodySectionsId",
                        column: x => x.BodySectionsId,
                        principalTable: "BodySections",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TreatmentBodySections_Treatments_TreatmentsId",
                        column: x => x.TreatmentsId,
                        principalTable: "Treatments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TreatmentViews",
                columns: table => new
                {
                    TreatmentsId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ViewsId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TreatmentViews", x => new { x.TreatmentsId, x.ViewsId });
                    table.ForeignKey(
                        name: "FK_TreatmentViews_Treatments_TreatmentsId",
                        column: x => x.TreatmentsId,
                        principalTable: "Treatments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TreatmentViews_Views_ViewsId",
                        column: x => x.ViewsId,
                        principalTable: "Views",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TreatmentBodySections_TreatmentsId",
                table: "TreatmentBodySections",
                column: "TreatmentsId");

            migrationBuilder.CreateIndex(
                name: "IX_TreatmentViews_ViewsId",
                table: "TreatmentViews",
                column: "ViewsId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TreatmentBodySections");

            migrationBuilder.DropTable(
                name: "TreatmentViews");
        }
    }
}
