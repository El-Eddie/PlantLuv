namespace PlantLuv.Files
{
    /// <summary>
    /// A file resizer that does not create resized alternates.
    /// </summary>
    public class NoopImageResizer : IImageResizer
    {

        public void CreateFileImageAlternates(File item)
        {
            return;
        }

        public byte[] Resize(byte[] imgToResize, int width, int height)
        {
            return imgToResize;
        }
    }
}
