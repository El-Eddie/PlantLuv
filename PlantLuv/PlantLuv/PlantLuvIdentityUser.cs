using System;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace PlantLuv
{
    public class PlantLuvIdentityUser : IdentityUser
    {
        [MaxLength(120)]
        public string Name { get; set; }
    }
}
