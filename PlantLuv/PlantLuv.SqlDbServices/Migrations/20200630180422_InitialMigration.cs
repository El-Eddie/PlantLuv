using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PlantLuv.SqlDbServices.Migrations
{
    public partial class InitialMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "File",
                columns: table => new
                {
                    FileId = table.Column<Guid>(nullable: false),
                    FileBlob = table.Column<byte[]>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_File", x => x.FileId);
                });

            migrationBuilder.CreateTable(
                name: "FileImageAlternate",
                columns: table => new
                {
                    FileImageAlternateId = table.Column<Guid>(nullable: false),
                    FileId = table.Column<Guid>(nullable: false),
                    FileBlob = table.Column<byte[]>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FileImageAlternate", x => x.FileImageAlternateId);
                });

            migrationBuilder.CreateTable(
                name: "PlantType",
                columns: table => new
                {
                    TypeId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    LatinName = table.Column<string>(nullable: true),
                    CommonName = table.Column<string>(nullable: true),
                    Family = table.Column<string>(nullable: true),
                    StockImageID = table.Column<int>(nullable: false),
                    Description = table.Column<string>(nullable: true),
                    Dificulty = table.Column<int>(nullable: false),
                    HumidityLevel = table.Column<int>(nullable: false),
                    LightLevel = table.Column<int>(nullable: false),
                    LightTime = table.Column<int>(nullable: false),
                    SoilPh = table.Column<double>(nullable: false),
                    SoilType = table.Column<int>(nullable: false),
                    FertilizerFrequency = table.Column<int>(nullable: false),
                    FertalizerType = table.Column<int>(nullable: false),
                    WateringFrequency = table.Column<int>(nullable: false),
                    WaterType = table.Column<int>(nullable: false),
                    ToxicToCats = table.Column<bool>(nullable: false),
                    ToxicToDogs = table.Column<bool>(nullable: false),
                    ToxicToSmallAnimals = table.Column<bool>(nullable: false),
                    ToxicToHumans = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlantType", x => x.TypeId);
                });

            migrationBuilder.CreateTable(
                name: "FileMetadata",
                columns: table => new
                {
                    FileId = table.Column<Guid>(nullable: false),
                    Size = table.Column<long>(nullable: false),
                    Extension = table.Column<string>(maxLength: 25, nullable: true),
                    ContentType = table.Column<string>(maxLength: 225, nullable: true),
                    Audit_CreatedDate = table.Column<DateTime>(nullable: true),
                    Audit_CreatedUserId = table.Column<string>(maxLength: 40, nullable: true),
                    Audit_CreatedUserName = table.Column<string>(maxLength: 120, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FileMetadata", x => x.FileId);
                    table.ForeignKey(
                        name: "FK_FileMetadata_File_FileId",
                        column: x => x.FileId,
                        principalTable: "File",
                        principalColumn: "FileId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FileImageAlternateMetadata",
                columns: table => new
                {
                    FileImageAlternateId = table.Column<Guid>(nullable: false),
                    FileId = table.Column<Guid>(nullable: false),
                    Width = table.Column<int>(nullable: false),
                    Height = table.Column<int>(nullable: false),
                    Size = table.Column<long>(nullable: false),
                    Extension = table.Column<string>(maxLength: 25, nullable: true),
                    ContentType = table.Column<string>(maxLength: 225, nullable: true),
                    Audit_CreatedDate = table.Column<DateTime>(nullable: true),
                    Audit_CreatedUserId = table.Column<string>(maxLength: 40, nullable: true),
                    Audit_CreatedUserName = table.Column<string>(maxLength: 120, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FileImageAlternateMetadata", x => x.FileImageAlternateId);
                    table.ForeignKey(
                        name: "FK_FileImageAlternateMetadata_FileImageAlternate_FileImageAlternateId",
                        column: x => x.FileImageAlternateId,
                        principalTable: "FileImageAlternate",
                        principalColumn: "FileImageAlternateId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserPlant",
                columns: table => new
                {
                   PlantID = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OwnerID = table.Column<string>(nullable: true),
                    NickName = table.Column<string>(nullable: true),
                    WherePurchased = table.Column<string>(nullable: true),
                    PlantTypeTypeId = table.Column<int>(nullable: true),
                    LastWatered = table.Column<DateTime>(nullable: false),
                    WaterAgain = table.Column<DateTime>(nullable: false),
                    LastFertalized = table.Column<DateTime>(nullable: false),
                    FertalizeAgain = table.Column<DateTime>(nullable: false),
                    Birtdhday = table.Column<DateTime>(nullable: false),
                    IsDeleted = table.Column<bool>(nullable: false),
                    ReceiveNotifications = table.Column<bool>(nullable: false),
                    IsFavorite = table.Column<bool>(nullable: false),
                    PrimaryImageID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserPlant", x => x.PlantID);
                    table.ForeignKey(
                        name: "FK_UserPlant_PlantType_PlantTypeTypeId",
                        column: x => x.PlantTypeTypeId,
                        principalTable: "PlantType",
                        principalColumn: "TypeId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserPlant_PlantTypeTypeId",
                table: "UserPlant",
                column: "PlantTypeTypeId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FileImageAlternateMetadata");

            migrationBuilder.DropTable(
                name: "FileMetadata");

            migrationBuilder.DropTable(
                name: "UserPlant");

            migrationBuilder.DropTable(
                name: "FileImageAlternate");

            migrationBuilder.DropTable(
                name: "File");

            migrationBuilder.DropTable(
                name: "PlantType");
        }
    }
}
