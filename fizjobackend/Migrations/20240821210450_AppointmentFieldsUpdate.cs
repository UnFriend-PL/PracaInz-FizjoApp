using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace fizjobackend.Migrations
{
    /// <inheritdoc />
    public partial class AppointmentFieldsUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "isPaid",
                table: "Appointments",
                newName: "IsPaid");

            migrationBuilder.AddColumn<double>(
                name: "Price",
                table: "Appointments",
                type: "float",
                nullable: false,
                defaultValue: 0.0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Price",
                table: "Appointments");

            migrationBuilder.RenameColumn(
                name: "IsPaid",
                table: "Appointments",
                newName: "isPaid");
        }
    }
}
