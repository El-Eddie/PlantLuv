using System.ComponentModel.DataAnnotations;

namespace PlantLuv.Web.Models.Auth
{
    public class CredentialsViewModel
    {
        [Required]
        public string EmailAddress { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
