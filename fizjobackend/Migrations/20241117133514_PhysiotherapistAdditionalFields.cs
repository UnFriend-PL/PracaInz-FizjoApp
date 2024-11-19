using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Fizjobackend.Migrations
{
    /// <inheritdoc />
    public partial class PhysiotherapistAdditionalFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("3f7365e9-8cb9-4873-a3b8-604abdf3a6aa"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("5be5992e-a0ea-4f47-9872-ef6532cd8023"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("60fdadb6-7a83-4251-9a38-2b235aef5b55"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("7946b21d-df79-4c59-9cde-e6999c51cf1a"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("7cafd9d7-2d5a-4fd4-9b50-600123d57c1b"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("a40a56f5-5e68-4818-b152-ff4c399ea9dc"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("c24970d1-7351-4473-acab-7c89c85c74fe"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("daab6592-dacc-4f6f-9612-92c81b8845d6"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("e1ac8c17-4bb8-4d30-b054-c3d76b76ef65"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("fe594244-6f26-4574-bd4e-e3f973ba006e"));

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Physiotherapists",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "Experience",
                table: "Physiotherapists",
                type: "int",
                nullable: false,
                defaultValue: 0);

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Physiotherapists");

            migrationBuilder.DropColumn(
                name: "Experience",
                table: "Physiotherapists");

            migrationBuilder.InsertData(
                table: "PhysiotherapySpecializationEntities",
                columns: new[] { "PhysiotherapySpecializationId", "PhysiotherapySpecialization" },
                values: new object[,]
                {
                    { new Guid("3f7365e9-8cb9-4873-a3b8-604abdf3a6aa"), "Oncological" },
                    { new Guid("5be5992e-a0ea-4f47-9872-ef6532cd8023"), "Urogynecological" },
                    { new Guid("60fdadb6-7a83-4251-9a38-2b235aef5b55"), "Sports" },
                    { new Guid("7946b21d-df79-4c59-9cde-e6999c51cf1a"), "Geriatric" },
                    { new Guid("7cafd9d7-2d5a-4fd4-9b50-600123d57c1b"), "Pediatric" },
                    { new Guid("a40a56f5-5e68-4818-b152-ff4c399ea9dc"), "Dental" },
                    { new Guid("c24970d1-7351-4473-acab-7c89c85c74fe"), "Occupational" },
                    { new Guid("daab6592-dacc-4f6f-9612-92c81b8845d6"), "Neurological" },
                    { new Guid("e1ac8c17-4bb8-4d30-b054-c3d76b76ef65"), "Orthopedic" },
                    { new Guid("fe594244-6f26-4574-bd4e-e3f973ba006e"), "CardiovascularAndPulmonary" }
                });
        }
    }
}
