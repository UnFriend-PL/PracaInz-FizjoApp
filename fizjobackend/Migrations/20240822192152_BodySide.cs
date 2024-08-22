using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace fizjobackend.Migrations
{
    /// <inheritdoc />
    public partial class BodySide : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "gender",
                table: "Views",
                newName: "Gender");

            migrationBuilder.AddColumn<string>(
                name: "BodySide",
                table: "BodySections",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BodySide",
                table: "BodySections");

            migrationBuilder.RenameColumn(
                name: "Gender",
                table: "Views",
                newName: "gender");
        }
    }
}
