using Microsoft.EntityFrameworkCore.Migrations;

namespace Intervention.Migrations
{
    public partial class AjoutChampNom : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "nomProbleme",
                schema: "dbo",
                table: "Problemes");

            migrationBuilder.AddColumn<string>(
                name: "nom",
                schema: "dbo",
                table: "Problemes",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "nom",
                schema: "dbo",
                table: "Problemes");

            migrationBuilder.AddColumn<string>(
                name: "nomProbleme",
                schema: "dbo",
                table: "Problemes",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
