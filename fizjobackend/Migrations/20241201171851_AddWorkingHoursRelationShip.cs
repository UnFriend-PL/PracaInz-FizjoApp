using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Fizjobackend.Migrations
{
    /// <inheritdoc />
    public partial class AddWorkingHoursRelationShip : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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
                    { new Guid("273dac7b-a31b-48e3-89c9-48b34adb8f9c"), "Occupational" },
                    { new Guid("58f4e0b1-1a91-40d6-9b3a-853a1a494724"), "CardiovascularAndPulmonary" },
                    { new Guid("5ba4008a-2a05-48ca-aa4c-d3b80870d125"), "Geriatric" },
                    { new Guid("70520719-c705-4258-b74f-6a954f5212c4"), "Orthopedic" },
                    { new Guid("78df9ed0-9041-407c-8fc1-49aeed15b251"), "Neurological" },
                    { new Guid("8aa59136-a1bc-455b-8632-e28ab16cd809"), "Urogynecological" },
                    { new Guid("8d847f15-1f28-489f-af11-e136cbb9a715"), "Dental" },
                    { new Guid("c6149bfd-f4b0-4b14-aae9-79604fa64805"), "Pediatric" },
                    { new Guid("d36bd6d4-d17d-483f-bfb0-67ab456a5c1f"), "Oncological" },
                    { new Guid("fc0a1ba4-4c9d-49f9-932d-fb2c10b093b7"), "Sports" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("273dac7b-a31b-48e3-89c9-48b34adb8f9c"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("58f4e0b1-1a91-40d6-9b3a-853a1a494724"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("5ba4008a-2a05-48ca-aa4c-d3b80870d125"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("70520719-c705-4258-b74f-6a954f5212c4"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("78df9ed0-9041-407c-8fc1-49aeed15b251"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("8aa59136-a1bc-455b-8632-e28ab16cd809"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("8d847f15-1f28-489f-af11-e136cbb9a715"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("c6149bfd-f4b0-4b14-aae9-79604fa64805"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("d36bd6d4-d17d-483f-bfb0-67ab456a5c1f"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("fc0a1ba4-4c9d-49f9-932d-fb2c10b093b7"));

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
        }
    }
}
