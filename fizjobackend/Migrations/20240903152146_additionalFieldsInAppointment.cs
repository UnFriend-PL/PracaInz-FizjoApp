using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace fizjobackend.Migrations
{
    /// <inheritdoc />
    public partial class additionalFieldsInAppointment : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "InitialCondition",
                table: "Appointments",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "PainLevelAfter",
                table: "Appointments",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PainLevelBeofore",
                table: "Appointments",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PainLevel",
                table: "AppointmentBodyDetails",
                type: "int",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "InitialCondition",
                table: "Appointments");

            migrationBuilder.DropColumn(
                name: "PainLevelAfter",
                table: "Appointments");

            migrationBuilder.DropColumn(
                name: "PainLevelBeofore",
                table: "Appointments");

            migrationBuilder.DropColumn(
                name: "PainLevel",
                table: "AppointmentBodyDetails");
        }
    }
}
