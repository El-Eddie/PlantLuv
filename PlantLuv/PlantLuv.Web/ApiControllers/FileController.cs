using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PlantLuv.Files;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlantLuv.Web.ApiControllers
{
    [Route("api/file")]
    public class FileController : ControllerBase
    {
        private readonly IFileData _fileData;
        private readonly IImageResizer _imageResizer;
        private readonly UserManager<PlantLuvIdentityUser> _userManager;

        public FileController(IFileData fileData,
            IImageResizer imageResizer,
            UserManager<PlantLuvIdentityUser> userManager)
        {
            _fileData = fileData;
            _imageResizer = imageResizer;
            _userManager = userManager;
        }

        [HttpGet("{fileId}/metadata")]
        public async Task<IActionResult> GetMetadata(string fileId)
        {
            var userIdClaim = User.Claims.Single(c => c.Type == "id");
            var user = await _userManager.FindByIdAsync(userIdClaim.Value);

            if (Guid.TryParse(fileId, out Guid id))
            {
                return BadRequest("Invalid file id");
            }

            var file = _fileData.GetFile(id);
            if (file == null)
            {
                return BadRequest("File not found.");
            }
            return new ObjectResult(file.Metadata);
        }

        [HttpGet("{fileId}/thumbnail")]
        public IActionResult GetThumbnail(string fileId)
        {
            return GetFileBestFit(fileId, 125, 125);
        }


        [HttpGet("{fileId}/medium")]
        public IActionResult GetMedium(string fileId)
        {
            return GetFileBestFit(fileId, 450, 340);
        }
        
        
        [HttpGet("{fileId}/large")]
        public IActionResult GetLarge(string fileId)
        {
            return GetFileBestFit(fileId, 960, 720);
        }


        [HttpGet("{fileId}")]
        public IActionResult GetBestFit(string fileId, [FromQuery] int width, [FromQuery] int height)
        {
            return GetFileBestFit(fileId, width, height);
        }


        private IActionResult GetFileBestFit(string fileId, int width, int height)
        {
            if (!Guid.TryParse(fileId, out Guid id))
            {
                return BadRequest("Invalid file id");
            }

            var alt = _fileData.GetBestFileAlternate(id, width, height);
            if (alt != null)
                return File(alt.FileBlob, alt.Metadata.ContentType);

            var file = _fileData.GetFile(id);
            if (file == null)
            {
                return BadRequest("File not found.");
            }

            return GetFileFullContent(file, width, height);
        }


        private IActionResult GetFileFullContent(File file, int width, int height)
        {
            if (!file.Metadata.ContentType.Contains("image"))
            {
                return File(file.FileBlob, file.Metadata.ContentType);
            }
            return File(
                _imageResizer.Resize(file.FileBlob, width, height),
                file.Metadata.ContentType
            );
        }


        [Authorize(Policy = "ApiUser")]
        [HttpPost("upload")]
        public async Task<IActionResult> OnPostUploadAsync(List<IFormFile> model)
        {
            if (!ModelState.IsValid || model == null)
                return BadRequest();

            var userIdClaim = User.Claims.Single(c => c.Type == "id");
            var user = await _userManager.FindByIdAsync(userIdClaim.Value);

            // see other considerations and solutions in the docs:
            // https://docs.microsoft.com/en-us/aspnet/core/mvc/models/file-uploads?view=aspnetcore-3.1
            long size = model.Sum(f => f.Length);

            var files = new List<File>();
            foreach (var formFile in model)
            {
                if (formFile.Length > 0)
                {
                    byte[] content;
                    using (var memoryStream = new System.IO.MemoryStream())
                    {
                        await formFile.CopyToAsync(memoryStream);
                        content = memoryStream.ToArray();
                    }
                    var filename = formFile.FileName;
                    var fileId = Guid.NewGuid();
                    files.Add(new File
                    {
                        FileId = fileId,
                        FileBlob = content,
                        Metadata = new FileMetadata
                        {
                            FileId = fileId,
                            ContentType = formFile.ContentType,
                            Extension = System.IO.Path.GetExtension(filename),
                            Size = content.LongLength,
                            Audit = new AuditCreate
                            {
                                CreatedUserId =   user.Id.ToString(),
                                CreatedUserName = user.Name
                            }
                        }
                    });
                }
            }

            files.ForEach(f =>
            {
                _fileData.Add(f);
                _imageResizer.CreateFileImageAlternates(f);
            });

            return Ok(files.Select(x => x.Metadata));
        }
    
        [HttpDelete("{fileId}")]
        [Authorize(Policy = "ApiUser")]
        public IActionResult DeleteFileDataById(string fileId)
        {
            if (!Guid.TryParse(fileId, out Guid id))
                return BadRequest("Invalid file id");

            var userIdClaim = User.Claims.Single(c => c.Type == "id");
            var fileMetadata = _fileData.GetFileMetadata(id);

            if (fileMetadata == null)
                return BadRequest("File not found");

            if (userIdClaim.Value != fileMetadata.Audit.CreatedUserId)
                return Unauthorized("User does not own the file");
            
            _fileData.Delete(id);
            return NoContent();
        }
    }

}
