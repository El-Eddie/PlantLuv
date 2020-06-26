using System;
using System.ComponentModel.DataAnnotations;

namespace PlantLuv.Files
{
    /// <summary>
    /// Basic attributes about a file and who originally uploaded it.
    /// </summary>
    public class FileMetadata
    {
        /// <summary>
        /// Unique system identity of this file.
        /// </summary>
        [Key]
        public Guid FileId { get; set; }

        /// <summary>
        /// The size in bytes.
        /// </summary>
        public long Size { get; set; }

        /// <summary>
        /// The file extension.
        /// </summary>
        [MaxLength(25)]
        public string Extension { get; set; }

        /// <summary>
        /// The content type used for streaming the file to a client.
        /// </summary>
        [MaxLength(225)]
        public string ContentType { get; set; }

        /// <summary>
        /// The identity of the user that uploaded the file.
        /// </summary>
        public AuditCreate Audit { get; set; }

        public FileMetadata()
        {
            Audit = new AuditCreate();
        }

        public FileMetadata(FileMetadata source)
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
    }
}
