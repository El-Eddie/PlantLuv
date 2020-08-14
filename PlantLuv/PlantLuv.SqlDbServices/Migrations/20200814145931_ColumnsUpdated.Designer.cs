﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using PlantLuv.SqlDbServices;

namespace PlantLuv.SqlDbServices.Migrations.PlantLuvDb
{
    [DbContext(typeof(PlantLuvDbContext))]
    [Migration("20200814145931_ColumnsUpdated")]
    partial class ColumnsUpdated
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("PlantLuv.Files.File", b =>
                {
                    b.Property<Guid>("FileId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<byte[]>("FileBlob")
                        .HasColumnType("varbinary(max)");

                    b.HasKey("FileId");

                    b.ToTable("File");
                });

            modelBuilder.Entity("PlantLuv.Files.FileImageAlternate", b =>
                {
                    b.Property<Guid>("FileImageAlternateId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<byte[]>("FileBlob")
                        .HasColumnType("varbinary(max)");

                    b.Property<Guid>("FileId")
                        .HasColumnType("uniqueidentifier");

                    b.HasKey("FileImageAlternateId");

                    b.ToTable("FileImageAlternate");
                });

            modelBuilder.Entity("PlantLuv.Files.FileImageAlternateMetadata", b =>
                {
                    b.Property<Guid>("FileImageAlternateId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("ContentType")
                        .HasColumnType("nvarchar(225)")
                        .HasMaxLength(225);

                    b.Property<string>("Extension")
                        .HasColumnType("nvarchar(25)")
                        .HasMaxLength(25);

                    b.Property<Guid>("FileId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("Height")
                        .HasColumnType("int");

                    b.Property<long>("Size")
                        .HasColumnType("bigint");

                    b.Property<int>("Width")
                        .HasColumnType("int");

                    b.HasKey("FileImageAlternateId");

                    b.ToTable("FileImageAlternateMetadata");
                });

            modelBuilder.Entity("PlantLuv.Files.FileMetadata", b =>
                {
                    b.Property<Guid>("FileId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("ContentType")
                        .HasColumnType("nvarchar(225)")
                        .HasMaxLength(225);

                    b.Property<string>("Extension")
                        .HasColumnType("nvarchar(25)")
                        .HasMaxLength(25);

                    b.Property<long>("Size")
                        .HasColumnType("bigint");

                    b.HasKey("FileId");

                    b.ToTable("FileMetadata");
                });

            modelBuilder.Entity("PlantLuv.PlantOptions.PlantType", b =>
                {
                    b.Property<int>("PlantTypeID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("CommonName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Difficulty")
                        .HasColumnType("int");

                    b.Property<int>("FertalizerType")
                        .HasColumnType("int");

                    b.Property<int>("FertilizerFrequency")
                        .HasColumnType("int");

                    b.Property<int>("HumidityHighLevel")
                        .HasColumnType("int");

                    b.Property<int>("HumidityLowLevel")
                        .HasColumnType("int");

                    b.Property<string>("LatinName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("LightLevel")
                        .HasColumnType("int");

                    b.Property<int>("LightTime")
                        .HasColumnType("int");

                    b.Property<string>("ScienceClade1")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ScienceClade2")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ScienceClade3")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ScienceFamily")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ScienceGenus")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ScienceKingdom")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ScienceOrder")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ScienceSubfamily")
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("SoilPh")
                        .HasColumnType("float");

                    b.Property<int>("SoilType")
                        .HasColumnType("int");

                    b.Property<string>("StockImageID")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("ToxicToCats")
                        .HasColumnType("bit");

                    b.Property<bool>("ToxicToDogs")
                        .HasColumnType("bit");

                    b.Property<bool>("ToxicToHumans")
                        .HasColumnType("bit");

                    b.Property<bool>("ToxicToSmallAnimals")
                        .HasColumnType("bit");

                    b.Property<int>("WaterType")
                        .HasColumnType("int");

                    b.Property<int>("WateringFrequency")
                        .HasColumnType("int");

                    b.HasKey("PlantTypeID");

                    b.ToTable("PlantType");
                });

            modelBuilder.Entity("PlantLuv.UserPlant", b =>
                {
                    b.Property<int>("PlantID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("Birtdhday")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("FertalizeAgain")
                        .HasColumnType("datetime2");

                    b.Property<bool>("IsDeleted")
                        .HasColumnType("bit");

                    b.Property<bool>("IsFavorite")
                        .HasColumnType("bit");

                    b.Property<DateTime>("LastFertalized")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("LastWatered")
                        .HasColumnType("datetime2");

                    b.Property<string>("NickName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("OwnerID")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("PlantTypeID")
                        .HasColumnType("int");

                    b.Property<string>("PrimaryImageID")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("ReceiveNotifications")
                        .HasColumnType("bit");

                    b.Property<DateTime>("WaterAgain")
                        .HasColumnType("datetime2");

                    b.Property<string>("WherePurchased")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("PlantID");

                    b.HasIndex("PlantTypeID");

                    b.ToTable("UserPlant");
                });

            modelBuilder.Entity("PlantLuv.Files.FileImageAlternateMetadata", b =>
                {
                    b.HasOne("PlantLuv.Files.FileImageAlternate", null)
                        .WithOne("Metadata")
                        .HasForeignKey("PlantLuv.Files.FileImageAlternateMetadata", "FileImageAlternateId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.OwnsOne("PlantLuv.AuditCreate", "Audit", b1 =>
                        {
                            b1.Property<Guid>("FileImageAlternateMetadataFileImageAlternateId")
                                .HasColumnType("uniqueidentifier");

                            b1.Property<DateTime>("CreatedDate")
                                .HasColumnType("datetime2");

                            b1.Property<string>("CreatedUserId")
                                .HasColumnType("nvarchar(40)")
                                .HasMaxLength(40);

                            b1.Property<string>("CreatedUserName")
                                .HasColumnType("nvarchar(120)")
                                .HasMaxLength(120);

                            b1.HasKey("FileImageAlternateMetadataFileImageAlternateId");

                            b1.ToTable("FileImageAlternateMetadata");

                            b1.WithOwner()
                                .HasForeignKey("FileImageAlternateMetadataFileImageAlternateId");
                        });
                });

            modelBuilder.Entity("PlantLuv.Files.FileMetadata", b =>
                {
                    b.HasOne("PlantLuv.Files.File", null)
                        .WithOne("Metadata")
                        .HasForeignKey("PlantLuv.Files.FileMetadata", "FileId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.OwnsOne("PlantLuv.AuditCreate", "Audit", b1 =>
                        {
                            b1.Property<Guid>("FileMetadataFileId")
                                .HasColumnType("uniqueidentifier");

                            b1.Property<DateTime>("CreatedDate")
                                .HasColumnType("datetime2");

                            b1.Property<string>("CreatedUserId")
                                .HasColumnType("nvarchar(40)")
                                .HasMaxLength(40);

                            b1.Property<string>("CreatedUserName")
                                .HasColumnType("nvarchar(120)")
                                .HasMaxLength(120);

                            b1.HasKey("FileMetadataFileId");

                            b1.ToTable("FileMetadata");

                            b1.WithOwner()
                                .HasForeignKey("FileMetadataFileId");
                        });
                });

            modelBuilder.Entity("PlantLuv.UserPlant", b =>
                {
                    b.HasOne("PlantLuv.PlantOptions.PlantType", "PlantType")
                        .WithMany()
                        .HasForeignKey("PlantTypeID");
                });
#pragma warning restore 612, 618
        }
    }
}