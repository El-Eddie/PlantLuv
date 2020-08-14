using Microsoft.EntityFrameworkCore.Migrations;

namespace PlantLuv.SqlDbServices.Migrations.PlantLuvDb
{
    public partial class ColumnsUpdated : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserPlant_PlantType_PlantTypeTypeId",
                table: "UserPlant");

            migrationBuilder.DropIndex(
                name: "IX_UserPlant_PlantTypeTypeId",
                table: "UserPlant");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PlantType",
                table: "PlantType");
            
            migrationBuilder.RenameColumn(
                name: "TypeId",
                table: "PlantType",
                newName: "PlantTypeID");

            migrationBuilder.RenameColumn(
                name: "PlantId",
                table: "UserPlant",
                newName: "PlantID");

            migrationBuilder.RenameColumn(
              name: "PlantTypeTypeId",
              table: "UserPlant",
              newName: "PlantTypeID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PlantType",
                table: "PlantType",
                column: "PlantTypeID");

            migrationBuilder.CreateIndex(
                name: "IX_UserPlant_PlantTypeID",
                table: "UserPlant",
                column: "PlantTypeID");

            migrationBuilder.AddForeignKey(
                name: "FK_UserPlant_PlantType_PlantTypeID",
                table: "UserPlant",
                column: "PlantTypeID",
                principalTable: "PlantType",
                principalColumn: "PlantTypeID",
                onDelete: ReferentialAction.Restrict);

            //migrationBuilder.Sql("Update UserPlant set PlantTypeID = 1");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
           
        }
    }
}
