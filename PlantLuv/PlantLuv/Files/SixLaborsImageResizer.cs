using Microsoft.Extensions.Logging;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats;
using System;
using SixLabors.ImageSharp.Processing;
using System.IO;

namespace PlantLuv.Files
{
    public class SixLaborsImageResizer : IImageResizer
    {
        private Size smallSize = new Size(150, 150);
        private Size mediumSize = new Size(450, 340);
        private Size largeSize = new Size(960, 720);
        private readonly IFileData _fileData;
        private readonly ILogger<SixLaborsImageResizer> _logger;

        public SixLaborsImageResizer(IFileData fileData,
            ILogger<SixLaborsImageResizer> logger)
        {
            _fileData = fileData;
            _logger = logger;
        }
        public void CreateFileImageAlternates(File item)
        {
            if (!item.Metadata.ContentType.Contains("image"))
                return;

            var format = Image.DetectFormat(item.FileBlob);
            if (format == null)
                return; // not a known image type

            try
            {
                using (var rawImage = Image.Load(Configuration.Default, item.FileBlob))
                {
                    if (rawImage == null) //bad images may return this way
                        return;
                    if (rawImage.Width > smallSize.Width
                        || rawImage.Height > smallSize.Height)
                    {
                        CreateFileImageAlternate(item, format, rawImage, smallSize);
                    }
                    if (rawImage.Width > mediumSize.Width
                        || rawImage.Height > mediumSize.Height)
                    {
                        CreateFileImageAlternate(item, format, rawImage, mediumSize);
                    }
                    if (rawImage.Width > largeSize.Width
                        || rawImage.Height > largeSize.Height)
                    {
                        CreateFileImageAlternate(item, format, rawImage, largeSize);
                    }
                    //otherwise compress it and then make the compressed image insertable into page.
                    CreateFileImageAlternate(item, format, rawImage,
                        new Size { Width = rawImage.Width, Height = rawImage.Height });
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Failed to resize file of content type: {item.Metadata.ContentType}");
                return; //could not load image, must not be an image.
            }
        }

        private void CreateFileImageAlternate(File item, IImageFormat format, Image rawImage, Size size)
        {
            using (var resizedImage = rawImage.Clone(img =>
                img.Resize(new ResizeOptions { Size = size, Mode = ResizeMode.Max })
            ))
            {
                byte[] resizedBlob;
                using (var ms = new MemoryStream())
                {
                    resizedImage.Save(ms, format);
                    resizedBlob = ms.ToArray();
                }
                var alt = new FileImageAlternate
                {
                    Metadata = new FileImageAlternateMetadata(item.Metadata)
                    {
                        Width = resizedImage.Width,
                        Height = resizedImage.Height
                    },
                    FileId = item.FileId,
                    FileBlob = resizedBlob
                };
                alt.Metadata.Size = alt.FileBlob.Length;
                _fileData.Add(alt);
            }
        }

        public byte[] Resize(byte[] imgToResize, int width, int height)
        {
            var format = Image.DetectFormat(imgToResize);
            if (format == null)
                return imgToResize; // not a known image type

            using (var img = Image.Load(Configuration.Default, imgToResize))
            {
                img.Mutate(x => x.Resize(
                    new ResizeOptions
                    {
                        Size = new Size(width, height),
                        Mode = ResizeMode.Max
                    }
                ));
                using (var ms = new MemoryStream())
                {
                    img.Save(ms, format);
                    return ms.ToArray();
                }
            }
        }
    }
}
