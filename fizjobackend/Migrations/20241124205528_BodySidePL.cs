using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Fizjobackend.Migrations
{
    /// <inheritdoc />
    public partial class BodySidePL : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("416b253c-9dd3-4328-a17c-71844fcaad26"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("922da888-f637-459d-a51d-98b4adbc8a68"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("a1168abc-f5bd-4690-8e35-9fb22fb7e549"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("a37020d5-e0ba-4f06-93d1-55f577e77fbf"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("a5ec9c74-7f25-4dfd-b898-f7d54ce5591f"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("acce3959-684c-4e17-bbf7-a823d68db972"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("b30a7569-3a8a-4fb5-bf6c-2ecb1afd427d"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("bc5ddc67-6129-4365-8c78-ae030743cbff"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("bedd6e07-2889-490b-b4e7-b882e627171d"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("c2f3a62d-05bc-41af-b245-cfbc0849f7a4"));

            migrationBuilder.AddColumn<string>(
                name: "BodySidePL",
                table: "Treatments",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.InsertData(
                table: "PhysiotherapySpecializationEntities",
                columns: new[] { "PhysiotherapySpecializationId", "PhysiotherapySpecialization" },
                values: new object[,]
                {
                    { new Guid("11337100-1056-4ca3-9af4-8b38b724d614"), "Pediatric" },
                    { new Guid("28a85cf1-52f0-47e8-b8ca-ccf258a53a7b"), "Orthopedic" },
                    { new Guid("2a216d51-a212-46b3-9ec5-3cec411763a9"), "Sports" },
                    { new Guid("55a47b88-c9c0-4d00-8c91-f0fb2be3c816"), "Occupational" },
                    { new Guid("703d8a66-40c4-4fb0-a51c-400a2cfe43e1"), "Dental" },
                    { new Guid("7dfa3ae8-62c6-4beb-9aad-126942badc06"), "Urogynecological" },
                    { new Guid("963d9047-d0c0-4911-bd5f-f8029b46cc01"), "Neurological" },
                    { new Guid("a7ccfbd9-6950-4ebe-81eb-fc27d4fb2f28"), "Oncological" },
                    { new Guid("a8b82708-e309-44f3-add4-2a0978054e44"), "CardiovascularAndPulmonary" },
                    { new Guid("e75e6a1e-bd47-4e5c-80aa-d88b4f91778c"), "Geriatric" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("11337100-1056-4ca3-9af4-8b38b724d614"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("28a85cf1-52f0-47e8-b8ca-ccf258a53a7b"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("2a216d51-a212-46b3-9ec5-3cec411763a9"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("55a47b88-c9c0-4d00-8c91-f0fb2be3c816"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("703d8a66-40c4-4fb0-a51c-400a2cfe43e1"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("7dfa3ae8-62c6-4beb-9aad-126942badc06"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("963d9047-d0c0-4911-bd5f-f8029b46cc01"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("a7ccfbd9-6950-4ebe-81eb-fc27d4fb2f28"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("a8b82708-e309-44f3-add4-2a0978054e44"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("e75e6a1e-bd47-4e5c-80aa-d88b4f91778c"));

            migrationBuilder.DropColumn(
                name: "BodySidePL",
                table: "Treatments");

            migrationBuilder.InsertData(
                table: "PhysiotherapySpecializationEntities",
                columns: new[] { "PhysiotherapySpecializationId", "PhysiotherapySpecialization" },
                values: new object[,]
                {
                    { new Guid("416b253c-9dd3-4328-a17c-71844fcaad26"), "CardiovascularAndPulmonary" },
                    { new Guid("922da888-f637-459d-a51d-98b4adbc8a68"), "Sports" },
                    { new Guid("a1168abc-f5bd-4690-8e35-9fb22fb7e549"), "Orthopedic" },
                    { new Guid("a37020d5-e0ba-4f06-93d1-55f577e77fbf"), "Geriatric" },
                    { new Guid("a5ec9c74-7f25-4dfd-b898-f7d54ce5591f"), "Oncological" },
                    { new Guid("acce3959-684c-4e17-bbf7-a823d68db972"), "Urogynecological" },
                    { new Guid("b30a7569-3a8a-4fb5-bf6c-2ecb1afd427d"), "Pediatric" },
                    { new Guid("bc5ddc67-6129-4365-8c78-ae030743cbff"), "Neurological" },
                    { new Guid("bedd6e07-2889-490b-b4e7-b882e627171d"), "Occupational" },
                    { new Guid("c2f3a62d-05bc-41af-b245-cfbc0849f7a4"), "Dental" }
                });
        }
    }
}
