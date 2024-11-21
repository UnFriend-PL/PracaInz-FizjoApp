using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Fizjobackend.Migrations
{
    /// <inheritdoc />
    public partial class PhysiotherapistEducationField : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("00332f5c-64ca-462e-a876-3ce07e35cd62"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("192b28cb-295c-47f1-9c82-6c31943df366"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("37cf5274-5aa0-4733-a517-dba9d69ef75a"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("441ad959-0a04-4c0c-9964-11424d4543bb"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("65850569-d61f-4200-bcb1-87875699ebad"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("698f1e30-4199-4278-ae37-5a0810a4c89c"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("913de6cf-78ee-44a2-b7cc-95bf365ca35f"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("9f2633bd-c9d6-4095-b077-d5effd39210e"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("b852386f-476c-45de-ac95-58526aa6b64f"));

            migrationBuilder.DeleteData(
                table: "PhysiotherapySpecializationEntities",
                keyColumn: "PhysiotherapySpecializationId",
                keyValue: new Guid("f1e03f8f-9eae-4b7a-825f-7ac7e0ed7f1d"));

            migrationBuilder.AddColumn<string>(
                name: "Education",
                table: "Physiotherapists",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.DropColumn(
                name: "Education",
                table: "Physiotherapists");

            migrationBuilder.InsertData(
                table: "PhysiotherapySpecializationEntities",
                columns: new[] { "PhysiotherapySpecializationId", "PhysiotherapySpecialization" },
                values: new object[,]
                {
                    { new Guid("00332f5c-64ca-462e-a876-3ce07e35cd62"), "Orthopedic" },
                    { new Guid("192b28cb-295c-47f1-9c82-6c31943df366"), "Oncological" },
                    { new Guid("37cf5274-5aa0-4733-a517-dba9d69ef75a"), "Geriatric" },
                    { new Guid("441ad959-0a04-4c0c-9964-11424d4543bb"), "Neurological" },
                    { new Guid("65850569-d61f-4200-bcb1-87875699ebad"), "Pediatric" },
                    { new Guid("698f1e30-4199-4278-ae37-5a0810a4c89c"), "CardiovascularAndPulmonary" },
                    { new Guid("913de6cf-78ee-44a2-b7cc-95bf365ca35f"), "Urogynecological" },
                    { new Guid("9f2633bd-c9d6-4095-b077-d5effd39210e"), "Occupational" },
                    { new Guid("b852386f-476c-45de-ac95-58526aa6b64f"), "Sports" },
                    { new Guid("f1e03f8f-9eae-4b7a-825f-7ac7e0ed7f1d"), "Dental" }
                });
        }
    }
}
