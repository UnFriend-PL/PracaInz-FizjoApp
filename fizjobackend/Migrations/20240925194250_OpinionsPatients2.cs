using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace fizjobackend.Migrations
{
    /// <inheritdoc />
    public partial class OpinionsPatients2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "nameAndFirstLetterOfTheLastName",
                table: "Opinions",
                newName: "NameAndFirstLetterOfTheLastName");

            migrationBuilder.RenameColumn(
                name: "comment",
                table: "Opinions",
                newName: "Comment");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "NameAndFirstLetterOfTheLastName",
                table: "Opinions",
                newName: "nameAndFirstLetterOfTheLastName");

            migrationBuilder.RenameColumn(
                name: "Comment",
                table: "Opinions",
                newName: "comment");
        }
    }
}
