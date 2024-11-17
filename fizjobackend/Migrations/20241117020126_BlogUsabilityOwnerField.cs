using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Fizjobackend.Migrations
{
    /// <inheritdoc />
    public partial class BlogUsabilityOwnerField : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Usability_Comment_CommentId",
                schema: "Blog",
                table: "Usability");

            migrationBuilder.DropIndex(
                name: "IX_Usability_CommentId",
                schema: "Blog",
                table: "Usability");

            migrationBuilder.DropColumn(
                name: "UsabilityId",
                schema: "Blog",
                table: "Comment");

            migrationBuilder.RenameColumn(
                name: "CommentId",
                schema: "Blog",
                table: "Usability",
                newName: "OwnerId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "OwnerId",
                schema: "Blog",
                table: "Usability",
                newName: "CommentId");

            migrationBuilder.AddColumn<Guid>(
                name: "UsabilityId",
                schema: "Blog",
                table: "Comment",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Usability_CommentId",
                schema: "Blog",
                table: "Usability",
                column: "CommentId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Usability_Comment_CommentId",
                schema: "Blog",
                table: "Usability",
                column: "CommentId",
                principalSchema: "Blog",
                principalTable: "Comment",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
