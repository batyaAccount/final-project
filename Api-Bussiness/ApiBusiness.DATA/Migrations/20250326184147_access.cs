using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ApiBusiness.DATA.Migrations
{
    public partial class access : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_files_Folder_FolderId",
                table: "files");

            migrationBuilder.DropForeignKey(
                name: "FK_files_Users_OwnerId",
                table: "files");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_files_FileId",
                table: "Users");

            migrationBuilder.DropTable(
                name: "Folder");

            migrationBuilder.DropIndex(
                name: "IX_Users_FileId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_files_FolderId",
                table: "files");

            migrationBuilder.DropColumn(
                name: "FolderId",
                table: "files");

            migrationBuilder.RenameColumn(
                name: "FileId",
                table: "Users",
                newName: "AccountantId");

            migrationBuilder.RenameColumn(
                name: "OwnerId",
                table: "files",
                newName: "ClientId");

            migrationBuilder.RenameIndex(
                name: "IX_files_OwnerId",
                table: "files",
                newName: "IX_files_ClientId");

            migrationBuilder.AddForeignKey(
                name: "FK_files_Users_ClientId",
                table: "files",
                column: "ClientId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_files_Users_ClientId",
                table: "files");

            migrationBuilder.RenameColumn(
                name: "AccountantId",
                table: "Users",
                newName: "FileId");

            migrationBuilder.RenameColumn(
                name: "ClientId",
                table: "files",
                newName: "OwnerId");

            migrationBuilder.RenameIndex(
                name: "IX_files_ClientId",
                table: "files",
                newName: "IX_files_OwnerId");

            migrationBuilder.AddColumn<int>(
                name: "FolderId",
                table: "files",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Folder",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OwnerId = table.Column<int>(type: "int", nullable: false),
                    ParentFolderId = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Folder", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Folder_Folder_ParentFolderId",
                        column: x => x.ParentFolderId,
                        principalTable: "Folder",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Folder_Users_OwnerId",
                        column: x => x.OwnerId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Users_FileId",
                table: "Users",
                column: "FileId");

            migrationBuilder.CreateIndex(
                name: "IX_files_FolderId",
                table: "files",
                column: "FolderId");

            migrationBuilder.CreateIndex(
                name: "IX_Folder_OwnerId",
                table: "Folder",
                column: "OwnerId");

            migrationBuilder.CreateIndex(
                name: "IX_Folder_ParentFolderId",
                table: "Folder",
                column: "ParentFolderId");

            migrationBuilder.AddForeignKey(
                name: "FK_files_Folder_FolderId",
                table: "files",
                column: "FolderId",
                principalTable: "Folder",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_files_Users_OwnerId",
                table: "files",
                column: "OwnerId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Users_files_FileId",
                table: "Users",
                column: "FileId",
                principalTable: "files",
                principalColumn: "Id");
        }
    }
}
