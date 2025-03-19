using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ApiBusiness.DATA.Migrations
{
    public partial class updateaws : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Url",
                table: "Recipts");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Url",
                table: "Recipts",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
