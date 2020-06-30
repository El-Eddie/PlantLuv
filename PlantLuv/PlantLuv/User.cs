using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace PlantLuv
{
    public class User
    {
        public int UserID { get; set; }
        [MinLength(4), MaxLength(50)]
        [Required()]
        public string Username { get; set; }
        [MinLength(6),MaxLength(50)]
        [DataType(DataType.Password)]
        [Required()]
        public string Password { get; set; }
        public string Avatar { get; set; }  //Are we storing the string of the image address? Would it make more sense to be an int representing the ImageID?
        public int DateCreated { get; set; }
        [Required()]
        [MinLength(4), MaxLength(50)]
        public string EmailAddress { get; set; }
        public List<UserPlant> PlantList { get; set; } //Should this be a list of int instad to store the UserPlant.ID?
    }
}

