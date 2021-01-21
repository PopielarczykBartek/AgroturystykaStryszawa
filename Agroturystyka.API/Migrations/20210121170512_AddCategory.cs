using Microsoft.EntityFrameworkCore.Migrations;

namespace Agroturystyka.API.Migrations
{
    public partial class AddCategory : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CategoriesId",
                table: "Photos",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Categorys",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categorys", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Photos_CategoriesId",
                table: "Photos",
                column: "CategoriesId");

            migrationBuilder.AddForeignKey(
                name: "FK_Photos_Categorys_CategoriesId",
                table: "Photos",
                column: "CategoriesId",
                principalTable: "Categorys",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Photos_Categorys_CategoriesId",
                table: "Photos");

            migrationBuilder.DropTable(
                name: "Categorys");

            migrationBuilder.DropIndex(
                name: "IX_Photos_CategoriesId",
                table: "Photos");

            migrationBuilder.DropColumn(
                name: "CategoriesId",
                table: "Photos");
        }
    }
}
