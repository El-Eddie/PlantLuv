using System;
using System.Collections.Generic;
using System.Text;

namespace PlantLuv
{
    public class CustomerListParameters
    {
        public int PageNumber { get; set; }
        public int Take { get; set; }
        public string OrderBy { get; set; }
        public string Username { get; set; }
        public string Term { get; set; }

        public CustomerListParameters()
        {

        }
        public CustomerListParameters(CustomerListParameters source)
        {
            if (source == null)
                return;

            PageNumber = source.PageNumber;
            Take = source.Take;
            Username = source.Username;
            OrderBy = source.OrderBy;
            Term = source.Term;
        }
    }
}
