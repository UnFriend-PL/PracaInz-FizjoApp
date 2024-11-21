using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Fizjobackend.Migrations
{
    /// <inheritdoc />
    public partial class SeedPhysiotherapySpecializations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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
        }
    }
}
