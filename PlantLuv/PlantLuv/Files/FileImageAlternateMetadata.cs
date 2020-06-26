using System;
using System.ComponentModel.DataAnnotations;

namespace PlantLuv.Files
{
    public class FileImageAlternateMetadata
    {
        [Key]
        public Guid FileImageAlternateId { get; set; }
        public Guid FileId { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }
        public long Size { get; set; }
        [MaxLength(25)]
        public string Extension { get; set; }
        [MaxLength(225)]
        public string ContentType { get; set; }
        public AuditCreate Audit { get; set; }

        public FileImageAlternateMetadata()
        {
            Audit = new AuditCreate();
        }
        public FileImageAlternateMetadata(FileMetadata source)
        {
            if (source == null)
            {
                Audit = new AuditCreate();
                return;
            }

            FileId = source.FileId;
            Size = source.Size;
            Extension = source.Extension;
            ContentType = source.ContentType;
            Audit = new AuditCreate(source.Audit);
        }
        public FileImageAlternateMetadata(FileImageAlternateMetadata source)
        {
            if (source == null)
            {
                Audit = new AuditCreate();
                return;
            }

            FileImageAlternateId = source.FileImageAlternateId;
            FileId = source.FileId;
            Width = source.Width;
            Height = source.Height;
            Size = source.Size;
            Extension = source.Extension;
            ContentType = source.ContentType;
            Audit = new AuditCreate(source.Audit);
        }
    }
}
