using System;
using System.Collections.Generic;
using System.Text;

namespace PlantLuv
{
    public interface ICustomerData
    {
        Customer Get(int customerId);
        void Add(Customer item);
        void Update(Customer item);
        void Commit();
        List<Customer> GetAll(int accountId, CustomerListParameters options);
        void Delete(Customer item);
    }
}
