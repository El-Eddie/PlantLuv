using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PlantLuv.Files
{
    public interface IFileData
    {
        /// <summary>
        /// Gets a single file metadata and blob data by identity.
        /// </summary>
        /// <param name="fileId"></param>
        /// <returns></returns>
        File GetFile(Guid fileId);

        /// <summary>
        /// Gets a single file's metadata only.
        /// </summary>
        /// <param name="fileId"></param>
        /// <returns></returns>
        FileMetadata GetFileMetadata(Guid fileId);

        /// <summary>
        /// Gets all files uploaded by a user.
        /// </summary>
        /// <param name="userId">The uploading user identity.</param>
        /// <param name="skipPastId">In paging scenarios, pick the file id to skip past.</param>
        /// <param name="take">The maximum number of items to get.</param>
        /// <returns></returns>
        List<FileMetadata> GetUserFiles(String userId, DateTime olderThan, int take = 50);

        /// <summary>
        /// uploads a new file and associated metadata.
        /// </summary>
        /// <param name="item"></param>
        /// 
        void Add(File item);

        Task AddAsync(File item);

        /// <summary>
        /// Updates a file, such as with a new owner (from anonymous to the newly logged in or registered user)
        /// </summary>
        /// <param name="updated"></param>
        /// <param name="existing"></param>
        void Update(FileMetadata item);

        void Delete(Guid fileId);
        void Delete(FileMetadata metadata);

        FileImageAlternate GetFileAlternate(Guid alternateId);
        IEnumerable<FileImageAlternateMetadata> GetFileAlternates(Guid fileId);
        FileImageAlternate GetBestFileAlternate(Guid fileId, int renderWidth, int renderHeight);
        void Add(FileImageAlternate item);
        void Update(FileImageAlternateMetadata item);
        void Delete(FileImageAlternateMetadata item);
    }
}
