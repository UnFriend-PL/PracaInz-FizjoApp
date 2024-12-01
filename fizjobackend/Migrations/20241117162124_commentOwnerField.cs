using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Fizjobackend.Migrations
{
    /// <inheritdoc />
    public partial class commentOwnerField : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("00600f31-317d-4162-a1ac-b96922a7201a"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("1135f5f6-c79c-4442-87ee-03c8a805c2a7"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("1561653d-b792-478c-b941-7067f753cad4"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("456f4983-80f7-49fe-85c8-b845ea4292c8"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("49553c2a-916b-47a0-a148-a3e58a49c96d"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("5a2f8eac-5c0b-45e2-8e09-8dbd24ff4c3b"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("8383d303-2fa2-4524-b3a5-ce706e30a2a2"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("a27580bf-4f09-4367-9fc8-d78f2e8f2b90"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("d1449272-7b16-4295-9b05-08bb5a048144"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("edc16061-2bda-4f03-bb49-e69b4b21bf72"));

            migrationBuilder.AddColumn<Guid>(
                name: "AuthorId",
                schema: "Blog",
                table: "Comment",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.InsertData(
                table: "PhysiotherapySpecializationEntities",
                columns: new[] { "PhysiotherapySpecializationId", "PhysiotherapySpecialization" },
                values: new object[,]
                {
                    { new Guid("2834de1d-8ee7-446c-89bf-6e6e85cee1cc"), "Urogynecological" },
                    { new Guid("2b3e3fbb-2c84-45d0-8c1c-c09810faf645"), "Oncological" },
                    { new Guid("6d89986e-1ff3-4318-a4bf-79911446f5a0"), "Neurological" },
                    { new Guid("991af9f2-5c26-48b8-b8f1-55b855127862"), "Occupational" },
                    { new Guid("a18a2424-ae9a-4970-811b-2a9f6f7e52ab"), "Dental" },
                    { new Guid("a82988fe-b5a5-421e-8f82-1038abb5638c"), "CardiovascularAndPulmonary" },
                    { new Guid("d82c9029-9075-48a4-adb1-ac719f489c43"), "Pediatric" },
                    { new Guid("ec56eb7a-9267-44d4-afd1-1ac847ac948c"), "Geriatric" },
                    { new Guid("fc756b6c-44c2-4c92-9647-6e85ff284423"), "Orthopedic" },
                    { new Guid("ff7d8a96-c2f8-4448-8118-3809a1719169"), "Sports" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("2834de1d-8ee7-446c-89bf-6e6e85cee1cc"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("2b3e3fbb-2c84-45d0-8c1c-c09810faf645"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("6d89986e-1ff3-4318-a4bf-79911446f5a0"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("991af9f2-5c26-48b8-b8f1-55b855127862"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("a18a2424-ae9a-4970-811b-2a9f6f7e52ab"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("a82988fe-b5a5-421e-8f82-1038abb5638c"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("d82c9029-9075-48a4-adb1-ac719f489c43"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("ec56eb7a-9267-44d4-afd1-1ac847ac948c"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("fc756b6c-44c2-4c92-9647-6e85ff284423"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("ff7d8a96-c2f8-4448-8118-3809a1719169"));

            migrationBuilder.DropColumn(
                name: "AuthorId",
                schema: "Blog",
                table: "Comment");

            migrationBuilder.InsertData(
                table: "PhysiotherapySpecializationEntities",
                columns: new[] { "PhysiotherapySpecializationId", "PhysiotherapySpecialization" },
                values: new object[,]
                {
                    { new Guid("00600f31-317d-4162-a1ac-b96922a7201a"), "Dental" },
                    { new Guid("1135f5f6-c79c-4442-87ee-03c8a805c2a7"), "Neurological" },
                    { new Guid("1561653d-b792-478c-b941-7067f753cad4"), "CardiovascularAndPulmonary" },
                    { new Guid("456f4983-80f7-49fe-85c8-b845ea4292c8"), "Pediatric" },
                    { new Guid("49553c2a-916b-47a0-a148-a3e58a49c96d"), "Occupational" },
                    { new Guid("5a2f8eac-5c0b-45e2-8e09-8dbd24ff4c3b"), "Oncological" },
                    { new Guid("8383d303-2fa2-4524-b3a5-ce706e30a2a2"), "Sports" },
                    { new Guid("a27580bf-4f09-4367-9fc8-d78f2e8f2b90"), "Urogynecological" },
                    { new Guid("d1449272-7b16-4295-9b05-08bb5a048144"), "Geriatric" },
                    { new Guid("edc16061-2bda-4f03-bb49-e69b4b21bf72"), "Orthopedic" }
                });
        }
    }
}
