using System;
using System.Collections.Generic;
using System.Text;

namespace PlantLuv
{
    public class Customer
    {
        public int CustomerId { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public InteractionMethod PreferredContactMethod { get; set; }
        public DateTime LastContactDate { get; set; }
        public CustomerStatus Status { get; set; }
    }
}
