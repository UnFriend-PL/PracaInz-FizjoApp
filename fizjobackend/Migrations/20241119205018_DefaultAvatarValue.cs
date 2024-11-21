using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Fizjobackend.Migrations
{
    /// <inheritdoc />
    public partial class DefaultAvatarValue : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AlterColumn<string>(
                name: "AvatarPath",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "default-avatar.png",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AlterColumn<string>(
                name: "AvatarPath",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldDefaultValue: "default-avatar.png");

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
    }
}
