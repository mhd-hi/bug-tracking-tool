using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Intervention.Migrations
{
    public partial class VersionInitiale : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "dbo");

            migrationBuilder.CreateTable(
                name: "Problemes",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    prenom = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    nomProbleme = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    noProbleme = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    courriel = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    telephone = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    notifications = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    noUnite = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    descriptionProbleme = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    dateProbleme = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Problemes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TypeProbleme",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    descriptionProbleme = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TypeProbleme", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Problemes",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "TypeProbleme",
                schema: "dbo");
        }
    }
}
