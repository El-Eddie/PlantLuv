using Microsoft.EntityFrameworkCore.Migrations;

namespace PlantLuv.SqlDbServices.Migrations.PlantLuvDb
{
    public partial class LightChanges : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ToxicToHumans",
                table: "PlantType");

            migrationBuilder.AlterColumn<int>(
                name: "WateringFrequency",
                table: "PlantType",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<double>(
                name: "SoilPh",
                table: "PlantType",
                nullable: true,
                oldClrType: typeof(double),
                oldType: "float");

            migrationBuilder.AlterColumn<int>(
                name: "LightTime",
                table: "PlantType",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "FertilizerFrequency",
                table: "PlantType",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "WateringFrequency",
                table: "PlantType",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<double>(
                name: "SoilPh",
                table: "PlantType",
                type: "float",
                nullable: false,
                oldClrType: typeof(double),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "LightTime",
                table: "PlantType",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "FertilizerFrequency",
                table: "PlantType",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "ToxicToHumans",
                table: "PlantType",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
