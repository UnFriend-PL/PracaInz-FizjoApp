using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Fizjobackend.Migrations
{
    /// <inheritdoc />
    public partial class treatmentsGender : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AddColumn<string>(
                name: "gender",
                table: "Treatments",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.DropColumn(
                name: "gender",
                table: "Treatments");

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
    }
}
