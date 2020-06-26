using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace PlantLuv.Web.Models.Customers
{
    public class CustomerDisplayViewModel
    {
        public int CustomerId { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string PreferredContactMethod { get; set; }
        public string Status { get; set; }
        public string LastContactDate { get; set; }

        public CustomerDisplayViewModel() { }
        public CustomerDisplayViewModel(Customer source)
        {
            if (source == null)
                return;
            CustomerId = source.CustomerId;
            Username = source.Username;
            Email = source.Email;
            Status = Enum.GetName(typeof(CustomerStatus), source.Status);
            PreferredContactMethod = Enum.GetName(typeof(InteractionMethod), source.PreferredContactMethod);
            LastContactDate = source.LastContactDate.Year > 1 ? source.LastContactDate.ToString("s", CultureInfo.InstalledUICulture) : "";
        }
    }
}
