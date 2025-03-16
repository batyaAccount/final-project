using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ApiBusiness.DATA.Migrations
{
    public partial class _5 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ReceiptId",
                table: "files",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_files_ReceiptId",
                table: "files",
                column: "ReceiptId");

            migrationBuilder.AddForeignKey(
                name: "FK_files_Recipts_ReceiptId",
                table: "files",
                column: "ReceiptId",
                principalTable: "Recipts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_files_Recipts_ReceiptId",
                table: "files");

            migrationBuilder.DropIndex(
                name: "IX_files_ReceiptId",
                table: "files");

            migrationBuilder.DropColumn(
                name: "ReceiptId",
                table: "files");
        }
    }
}
