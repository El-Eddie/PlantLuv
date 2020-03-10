using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace PlantLuv
{
    public class Users
    {
        public int UserID { get; set; }
        [MinLength(4), MaxLength(50)]
        [Required()]
        public string Username { get; set; }
        [MinLength(6),MaxLength(50)]
        [DataType(DataType.Password)]
        [Required()]
        public string Password { get; set; }
        public string Avatar { get; set; }
        public int DateCreated { get; set; }
    }
}

