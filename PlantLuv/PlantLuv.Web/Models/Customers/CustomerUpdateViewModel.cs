using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PlantLuv.Web.Models.Customers
{
    public class CustomerUpdateViewModel
    {
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Phone]
        public string PhoneNumber { get; set; }
        [Required]
        [EmailAddress]
        public string EmailAddress { get; set; }
        public InteractionMethod PreferredContactMethod { get; set; }
    }
}
