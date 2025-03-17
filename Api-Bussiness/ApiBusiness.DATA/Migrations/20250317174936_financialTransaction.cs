using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ApiBusiness.DATA.Migrations
{
    public partial class financialTransaction : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Category",
                table: "Recipts",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<int>(
                name: "FinancialTransactionId",
                table: "Recipts",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "FinancialTransaction",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Type = table.Column<int>(type: "int", nullable: false),
                    Amount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Timestamp = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FinancialTransaction", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Recipts_FinancialTransactionId",
                table: "Recipts",
                column: "FinancialTransactionId");

            migrationBuilder.AddForeignKey(
                name: "FK_Recipts_FinancialTransaction_FinancialTransactionId",
                table: "Recipts",
                column: "FinancialTransactionId",
                principalTable: "FinancialTransaction",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Recipts_FinancialTransaction_FinancialTransactionId",
                table: "Recipts");

            migrationBuilder.DropTable(
                name: "FinancialTransaction");

            migrationBuilder.DropIndex(
                name: "IX_Recipts_FinancialTransactionId",
                table: "Recipts");

            migrationBuilder.DropColumn(
                name: "FinancialTransactionId",
                table: "Recipts");

            migrationBuilder.AlterColumn<string>(
                name: "Category",
                table: "Recipts",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");
        }
    }
}
