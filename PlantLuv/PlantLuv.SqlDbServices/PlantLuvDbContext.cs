using Microsoft.EntityFrameworkCore;
using PlantLuv.Files;
using PlantLuv.Plants;

namespace PlantLuv.SqlDbServices
{
    public class PlantLuvDbContext : DbContext
    {
        public PlantLuvDbContext(DbContextOptions<PlantLuvDbContext> options) : base(options) { }

        public DbSet<FileMetadata> FileMetadata { get; set; }
        public DbSet<File> File { get; set; }
        public DbSet<FileImageAlternateMetadata> FileImageAlternateMetadata { get; set; }
        public DbSet<FileImageAlternate> FileImageAlternate { get; set; }

        public DbSet<UserPlant> UserPlant { get; set; }
        public DbSet<PlantType> PlantType { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<FileMetadata>().OwnsOne(x => x.Audit);
            builder.Entity<FileImageAlternateMetadata>().OwnsOne(x => x.Audit);
        }
    }
}