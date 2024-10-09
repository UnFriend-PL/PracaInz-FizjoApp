using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace fizjobackend.Migrations
{
    /// <inheritdoc />
    public partial class multiLangForBodyParts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PainLevel",
                table: "AppointmentBodyDetails");

            migrationBuilder.AddColumn<string>(
                name: "NamePL",
                table: "Views",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "NamePL",
                table: "Muscles",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NamePL",
                table: "Joints",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "BodySectionNamePL",
                table: "BodySections",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "BodySidePL",
                table: "BodySections",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NamePL",
                table: "Views");

            migrationBuilder.DropColumn(
                name: "NamePL",
                table: "Muscles");

            migrationBuilder.DropColumn(
                name: "NamePL",
                table: "Joints");

            migrationBuilder.DropColumn(
                name: "BodySectionNamePL",
                table: "BodySections");

            migrationBuilder.DropColumn(
                name: "BodySidePL",
                table: "BodySections");

            migrationBuilder.AddColumn<int>(
                name: "PainLevel",
                table: "AppointmentBodyDetails",
                type: "int",
                nullable: true);
        }
    }
}
