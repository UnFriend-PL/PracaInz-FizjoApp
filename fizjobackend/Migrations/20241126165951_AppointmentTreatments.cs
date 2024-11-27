using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Fizjobackend.Migrations
{
    /// <inheritdoc />
    public partial class AppointmentTreatments : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("04a11910-76b3-4f3a-b30a-c1234795865a"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("09d0865c-42e2-4d4e-8a01-e1c9a03893e9"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("1a1d552c-bdd4-4b64-9cc2-1fb6dc5a084f"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("3cef2f40-d4c9-4454-871c-1a464acecd0c"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("49f469c0-f183-4bb8-bc45-465b2e57031a"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("850b0ac7-ebfc-4478-9f08-7cd51acef08a"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("a2474db1-27a4-4e42-a04e-2191f07552a8"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("dc490b10-aaef-44dc-90e4-8b2b0408ba3a"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("ec963ef8-aec0-490e-a3f5-1dd6bf1ec525"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("f15f0e28-a946-44e3-985d-bb172f6b95ef"));

            migrationBuilder.RenameColumn(
                name: "gender",
                table: "Treatments",
                newName: "Gender");

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

            migrationBuilder.InsertData(
                table: "PhysiotherapySpecializationEntities",
                columns: new[] { "PhysiotherapySpecializationId", "PhysiotherapySpecialization" },
                values: new object[,]
                {
                    { new Guid("0223adad-d8cc-4f7e-adfe-e6470840e227"), "Geriatric" },
                    { new Guid("2df6e858-4983-4fd3-b6e0-3e160c4014ba"), "CardiovascularAndPulmonary" },
                    { new Guid("3bc10cec-9405-45ac-89d0-29c259247b60"), "Oncological" },
                    { new Guid("462f2336-9b7e-4d74-85b1-f4a66d25cef5"), "Neurological" },
                    { new Guid("73bf716c-7da5-4100-a1c4-d63ec74eb53c"), "Orthopedic" },
                    { new Guid("7524500f-89c1-4f5b-862a-cc76ae3690d7"), "Occupational" },
                    { new Guid("76fb0d1a-cd78-4f45-ad96-35e340884ff7"), "Urogynecological" },
                    { new Guid("bbc10bda-d543-4b03-9259-71ecf25a3232"), "Pediatric" },
                    { new Guid("d54880b2-8c2b-4f38-9abf-b450d77f2fe0"), "Dental" },
                    { new Guid("fca23d9f-b18a-426f-b3f7-61a6b4115316"), "Sports" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_AppointmentTreatmens_AppointmentId",
                table: "AppointmentTreatmens",
                column: "AppointmentId");

            migrationBuilder.CreateIndex(
                name: "IX_AppointmentTreatmens_TreatmentId",
                table: "AppointmentTreatmens",
                column: "TreatmentId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AppointmentTreatmens");

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("0223adad-d8cc-4f7e-adfe-e6470840e227"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("2df6e858-4983-4fd3-b6e0-3e160c4014ba"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("3bc10cec-9405-45ac-89d0-29c259247b60"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("462f2336-9b7e-4d74-85b1-f4a66d25cef5"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("73bf716c-7da5-4100-a1c4-d63ec74eb53c"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("7524500f-89c1-4f5b-862a-cc76ae3690d7"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("76fb0d1a-cd78-4f45-ad96-35e340884ff7"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("bbc10bda-d543-4b03-9259-71ecf25a3232"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("d54880b2-8c2b-4f38-9abf-b450d77f2fe0"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("fca23d9f-b18a-426f-b3f7-61a6b4115316"));

            migrationBuilder.RenameColumn(
                name: "Gender",
                table: "Treatments",
                newName: "gender");

            migrationBuilder.InsertData(
                table: "PhysiotherapySpecializationEntities",
                columns: new[] { "PhysiotherapySpecializationId", "PhysiotherapySpecialization" },
                values: new object[,]
                {
                    { new Guid("04a11910-76b3-4f3a-b30a-c1234795865a"), "Geriatric" },
                    { new Guid("09d0865c-42e2-4d4e-8a01-e1c9a03893e9"), "Dental" },
                    { new Guid("1a1d552c-bdd4-4b64-9cc2-1fb6dc5a084f"), "Neurological" },
                    { new Guid("3cef2f40-d4c9-4454-871c-1a464acecd0c"), "Occupational" },
                    { new Guid("49f469c0-f183-4bb8-bc45-465b2e57031a"), "Sports" },
                    { new Guid("850b0ac7-ebfc-4478-9f08-7cd51acef08a"), "Urogynecological" },
                    { new Guid("a2474db1-27a4-4e42-a04e-2191f07552a8"), "CardiovascularAndPulmonary" },
                    { new Guid("dc490b10-aaef-44dc-90e4-8b2b0408ba3a"), "Pediatric" },
                    { new Guid("ec963ef8-aec0-490e-a3f5-1dd6bf1ec525"), "Oncological" },
                    { new Guid("f15f0e28-a946-44e3-985d-bb172f6b95ef"), "Orthopedic" }
                });
        }
    }
}
