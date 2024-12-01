using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Fizjobackend.Migrations
{
    /// <inheritdoc />
    public partial class AddWorkingHours : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

            migrationBuilder.InsertData(
                table: "PhysiotherapySpecializationEntities",
                columns: new[] { "PhysiotherapySpecializationId", "PhysiotherapySpecialization" },
                values: new object[,]
                {
                    { new Guid("0af0e6b8-6241-4a9a-ba02-b86c0d069796"), "Geriatric" },
                    { new Guid("59baf05a-8707-4138-a839-1c53d558b9de"), "CardiovascularAndPulmonary" },
                    { new Guid("75eee302-c148-4b17-af9b-f0bb73ebfe8c"), "Occupational" },
                    { new Guid("98ac6140-b338-463c-93b7-650d3dd6510c"), "Urogynecological" },
                    { new Guid("ab1861bf-81c4-40a3-9291-bf3380b473ea"), "Oncological" },
                    { new Guid("ade2ac6a-36b6-4986-95a7-c4312ac225ef"), "Sports" },
                    { new Guid("c0b6cdc3-5148-46a1-bee6-2a248d3e368b"), "Dental" },
                    { new Guid("e98b4119-02a0-42b0-8250-de64c19e3cf1"), "Orthopedic" },
                    { new Guid("ee860695-652e-440d-ade0-61c56a7df1da"), "Pediatric" },
                    { new Guid("ef29a6da-2070-4d76-b679-17531bd8057e"), "Neurological" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_WorkingHours_PhysiotherapistId",
                table: "WorkingHours",
                column: "PhysiotherapistId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "WorkingHours");

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("0af0e6b8-6241-4a9a-ba02-b86c0d069796"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("59baf05a-8707-4138-a839-1c53d558b9de"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("75eee302-c148-4b17-af9b-f0bb73ebfe8c"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("98ac6140-b338-463c-93b7-650d3dd6510c"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("ab1861bf-81c4-40a3-9291-bf3380b473ea"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("ade2ac6a-36b6-4986-95a7-c4312ac225ef"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("c0b6cdc3-5148-46a1-bee6-2a248d3e368b"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("e98b4119-02a0-42b0-8250-de64c19e3cf1"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("ee860695-652e-440d-ade0-61c56a7df1da"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("ef29a6da-2070-4d76-b679-17531bd8057e"));

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
        }
    }
}
