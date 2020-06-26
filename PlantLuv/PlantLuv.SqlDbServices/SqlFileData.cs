using Microsoft.AspNetCore.Identity;
using PlantLuv.Files;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PlantLuv.SqlDbServices
{
    public class SqlFileData : IFileData
    {
        private readonly PlantLuvDbContext _context;
        private readonly UserManager<PlantLuvIdentityUser> _userManager;

        public SqlFileData(PlantLuvDbContext context,
            UserManager<PlantLuvIdentityUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }
        /// <summary>
        /// Gets a single file metadata and blob data by identity.
        /// </summary>
        /// <param name="fileId"></param>
        /// <returns></returns>
        public File GetFile(Guid fileId)
        {
            var file = _context.File
                .FirstOrDefault(x => x.FileId == fileId);
            if (file == null)
                return null;
            _context.Entry(file).Reference(m => m.Metadata).Load();
            return file;
        }

        /// <summary>
        /// Gets a single file's metadata only.
        /// </summary>
        /// <param name="fileId"></param>
        /// <returns></returns>
        public FileMetadata GetFileMetadata(Guid fileId)
        {
            return _context.FileMetadata.FirstOrDefault(x => x.FileId == fileId);
        }

        /// <summary>
        /// Gets all files uploaded by a user.
        /// </summary>
        /// <param name="userId">The uploading user identity.</param>
        /// <param name="skipPastId">In paging scenarios, pick the file id to skip past.</param>
        /// <param name="take">The maximum number of items to get.</param>
        /// <returns></returns>
        public List<FileMetadata> GetUserFiles(string userId, DateTime olderThan, int take = 50)
        {
            return _context.FileMetadata
                .Where(x => x.Audit.CreatedUserId == userId && x.Audit.CreatedDate < olderThan)
                .OrderByDescending(x => x.Audit.CreatedDate)
                .Take(take)
                .ToList();
        }

        /// <summary>
        /// uploads a new file and associated metadata.
        /// </summary>
        /// <param name="item"></param>
        /// 
        public void Add(File item)
        {
            _context.Add(item);
            _context.SaveChanges();
        }

        public async Task AddAsync(File item)
        {
            _context.Add(item);
            await _context.SaveChangesAsync();
        }

        /// <summary>
        /// Updates a file, such as with a new owner (from anonymous to the newly logged in or registered user)
        /// </summary>
        /// <param name="updated"></param>
        /// <param name="existing"></param>
        public void Update(FileMetadata item)
        { //changes are tracked
            _context.SaveChanges();
        }

        public void Delete(Guid fileId)
        {
            var file = GetFile(fileId);
            if (file != null)
            {
                _context.Remove(file);
            }
            _context.SaveChanges();
        }
        public void Delete(FileMetadata metadata)
        {
            var file = GetFile(metadata.FileId);
            if (file != null)
            {
                _context.Remove(file);
            }
            _context.Remove(metadata);
            _context.SaveChanges();
        }

        public FileImageAlternate GetFileAlternate(Guid alternateId)
        {
            var alt = _context.FileImageAlternate
                .FirstOrDefault(x => x.FileImageAlternateId == alternateId);
            _context.Entry(alt).Reference(m => m.Metadata).Load();
            return alt;
        }
        public IEnumerable<FileImageAlternateMetadata> GetFileAlternates(Guid fileId)
        {
            return _context.FileImageAlternateMetadata.Where(x => x.FileId == fileId)
                .ToList();
        }
        public FileImageAlternate GetBestFileAlternate(Guid fileId, int renderWidth, int renderHeight)
        {
            var alts = GetFileAlternates(fileId).ToList();
            if (alts.Count == 0)
                return null;

            alts.Sort((x, y) => y.Width.CompareTo(x.Width)); // largest first
            var best = alts[0];
            for (var i = 1; i < alts.Count; i++)
            {
                var next = alts[i];
                if (best == null)
                    best = next;
                if (next.Width >= renderWidth || next.Height >= renderHeight)
                    best = next;
            }
            return GetFileAlternate(best.FileImageAlternateId);
        }
        public void Add(FileImageAlternate item)
        {
            _context.Add(item);
            _context.SaveChanges();
        }
        public void Update(FileImageAlternateMetadata item)
        {
            _context.SaveChanges(); //changes tracked
        }
        public void Delete(FileImageAlternateMetadata item)
        {
            var alt = GetFileAlternate(item.FileImageAlternateId);
            if (alt != null)
            {
                _context.Remove(alt);
            }
            _context.Remove(item);
            _context.SaveChanges();
        }
    }
}
