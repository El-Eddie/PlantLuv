using System;
using System.Collections.Generic;
using System.Linq;


namespace PlantLuv.SqlDbServices
{
    public class SqlCustomerData : ICustomerData
    {
        private readonly PlantLuvDbContext context;

        public SqlCustomerData(PlantLuvDbContext context)
        {
            this.context = context;
        }

        public void Add(Customer item)
        {
            throw new NotImplementedException();
        }

        public void Commit()
        {
            throw new NotImplementedException();
        }

        public void Delete(Customer item)
        {
            throw new NotImplementedException();
        }

        public Customer Get(int customerId)
        {
            throw new NotImplementedException();
        }

        public List<Customer> GetAll(int accountId, CustomerListParameters options)
        {
            throw new NotImplementedException();
        }

        public void Update(Customer item)
        {
            throw new NotImplementedException();
        }

        // interface functions omitted
    }
}
