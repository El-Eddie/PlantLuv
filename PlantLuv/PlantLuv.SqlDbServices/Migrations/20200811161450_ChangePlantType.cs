using Microsoft.EntityFrameworkCore.Migrations;

namespace PlantLuv.SqlDbServices.Migrations.PlantLuvDb
{
    public partial class ChangePlantType : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Dificulty",
                table: "PlantType");

            migrationBuilder.DropColumn(
                name: "Family",
                table: "PlantType");

            migrationBuilder.DropColumn(
                name: "HumidityLevel",
                table: "PlantType");

            migrationBuilder.AlterColumn<string>(
                name: "PrimaryImageID",
                table: "UserPlant",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<string>(
                name: "StockImageID",
                table: "PlantType",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "Difficulty",
                table: "PlantType",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "HumidityHighLevel",
                table: "PlantType",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "HumidityLowLevel",
                table: "PlantType",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "ScienceClade1",
                table: "PlantType",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ScienceClade2",
                table: "PlantType",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ScienceClade3",
                table: "PlantType",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ScienceFamily",
                table: "PlantType",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ScienceGenus",
                table: "PlantType",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ScienceKingdom",
                table: "PlantType",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ScienceOrder",
                table: "PlantType",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ScienceSubfamily",
                table: "PlantType",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Difficulty",
                table: "PlantType");

            migrationBuilder.DropColumn(
                name: "HumidityHighLevel",
                table: "PlantType");

            migrationBuilder.DropColumn(
                name: "HumidityLowLevel",
                table: "PlantType");

            migrationBuilder.DropColumn(
                name: "ScienceClade1",
                table: "PlantType");

            migrationBuilder.DropColumn(
                name: "ScienceClade2",
                table: "PlantType");

            migrationBuilder.DropColumn(
                name: "ScienceClade3",
                table: "PlantType");

            migrationBuilder.DropColumn(
                name: "ScienceFamily",
                table: "PlantType");

            migrationBuilder.DropColumn(
                name: "ScienceGenus",
                table: "PlantType");

            migrationBuilder.DropColumn(
                name: "ScienceKingdom",
                table: "PlantType");

            migrationBuilder.DropColumn(
                name: "ScienceOrder",
                table: "PlantType");

            migrationBuilder.DropColumn(
                name: "ScienceSubfamily",
                table: "PlantType");

            migrationBuilder.AlterColumn<int>(
                name: "PrimaryImageID",
                table: "UserPlant",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "StockImageID",
                table: "PlantType",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Dificulty",
                table: "PlantType",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Family",
                table: "PlantType",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "HumidityLevel",
                table: "PlantType",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
