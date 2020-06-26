using System;
using System.ComponentModel.DataAnnotations;

namespace PlantLuv
{
    public interface IAuditCreate
    {
        DateTime CreatedDate { get; set; }
        [MaxLength(40)]
        string CreatedUserId { get; set; }
        [MaxLength(120)]
        string CreatedUserName { get; set; }
    }
    public interface IAuditCreateUpdate : IAuditCreate
    {
        public DateTime UpdatedDate { get; set; }
        [MaxLength(40)]
        public string UpdatedUserId { get; set; }
        [MaxLength(120)]
        public string UpdatedUserName { get; set; }
    }

    public class AuditCreate : IAuditCreate
    {
        public DateTime CreatedDate { get; set; }
        [MaxLength(40)]
        public string CreatedUserId { get; set; }
        [MaxLength(120)]
        public string CreatedUserName { get; set; }

        public AuditCreate()
        {
            CreatedDate = DateTime.UtcNow;
        }
        public AuditCreate(IAuditCreate source)
        {
            if (source == null)
                return;

            CreatedDate = source.CreatedDate;
            CreatedUserId = source.CreatedUserId;
            CreatedUserName = source.CreatedUserName;
        }
    }
    public class AuditCreateUpdate : IAuditCreateUpdate
    {
        public DateTime UpdatedDate { get; set; }
        [MaxLength(40)]
        public string UpdatedUserId { get; set; }
        [MaxLength(120)]
        public string UpdatedUserName { get; set; }
        public DateTime CreatedDate { get; set; }
        [MaxLength(40)]
        public string CreatedUserId { get; set; }
        [MaxLength(120)]
        public string CreatedUserName { get; set; }

        public AuditCreateUpdate()
        {
            CreatedDate = DateTime.UtcNow;
        }

        public AuditCreateUpdate(IAuditCreate source)
        {
            if (source == null)
                return;

            CreatedDate = source.CreatedDate;
            CreatedUserId = source.CreatedUserId;
            CreatedUserName = source.CreatedUserName;
        }

        public AuditCreateUpdate(IAuditCreateUpdate source)
        {
            if (source == null)
                return;

            CreatedDate = source.CreatedDate;
            CreatedUserId = source.CreatedUserId;
            CreatedUserName = source.CreatedUserName;
            UpdatedDate = source.UpdatedDate;
            UpdatedUserId = source.UpdatedUserId;
            UpdatedUserName = source.UpdatedUserName;
        }
    }
}
