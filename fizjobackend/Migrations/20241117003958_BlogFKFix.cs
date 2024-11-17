using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Fizjobackend.Migrations
{
    /// <inheritdoc />
    public partial class BlogFKFix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "UsabilityId",
                schema: "Blog",
                table: "Comment",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UsabilityId",
                schema: "Blog",
                table: "Comment");
        }
    }
}
