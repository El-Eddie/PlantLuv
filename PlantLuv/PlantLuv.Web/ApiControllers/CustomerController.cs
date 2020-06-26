using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using PlantLuv.Web.Filters;
using PlantLuv.Web.Models;
using PlantLuv.Web.Models.Customers;
using System;
using System.Linq;


namespace PlantLuv.Web.ApiControllers
{
    [Route("api/customers")]
    public class CustomerController : Controller
    {
        private readonly ICustomerData _customerData;
        private readonly IUrlHelper _urlHelper;

        public CustomerController(
            ICustomerData customerData,
            IUrlHelper urlHelper)
        {
            _customerData = customerData;
            _urlHelper = urlHelper;
        }


        [HttpGet("", Name = "GetCustomers")]
        public IActionResult GetAll([FromQuery] CustomerListParameters listParams)
        {
            if (listParams.PageNumber < 1)
            {
                return UnprocessableEntity("Request page must be 1 or greater");
            }
            listParams.Take = Math.Max(1, Math.Min(listParams.Take, 200));
            var customer = _customerData.GetAll(0, listParams);
            var models = customer.Select(x => new CustomerDisplayViewModel(x));

            var paging = new PaginationModel
            {
                Next = CreateCustomersResourceUri(listParams, 1),
                Previous = CreateCustomersResourceUri(listParams, -1)
            };

            Response.Headers.Add("X-Paging", JsonConvert.SerializeObject(paging));
            return Ok(models);

        }

        private string CreateCustomersResourceUri(CustomerListParameters listParams, int modifier)
        {
            if (listParams.PageNumber + modifier < 1)
            {
                return "";
            }
            return _urlHelper.Link("GetCustomers", new CustomerListParameters(listParams)
            {
                PageNumber = listParams.PageNumber + modifier
            });
        }



        [Route("{id}")] //  ./api/customers/:id
        [HttpGet]
        public IActionResult Get(int id)
        {
            var xcustomer = _customerData.Get(id);
            if (xcustomer == null)
            {
                return NotFound();
            }
            var model = new CustomerDisplayViewModel(xcustomer);
            return Ok(model);
        }

        [HttpPost("")] //  ./api/customers
        public IActionResult Create([FromBody] CustomerCreateViewModel model)
        {
            if (model == null)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return new ValidationFailedResult(ModelState);
            }
            var customer = new Customer
            {
                Username = model.Username,
                Email = model.EmailAddress,
                PreferredContactMethod = model.PreferredContactMethod
            };

            _customerData.Add(customer);
            _customerData.Commit();
            return Ok(new CustomerDisplayViewModel(customer));
        }

        [HttpPut("{id}")] //  ./api/customers/:id
        public IActionResult Update(int id, [FromBody] CustomerUpdateViewModel model)
        {
            if (model == null)
            {
                return BadRequest();
            }

            var xcustomer = _customerData.Get(id);
            if (xcustomer == null)
            {
                return StatusCode(410, model);
            }

            xcustomer.Email = model.EmailAddress;
            xcustomer.PreferredContactMethod = model.PreferredContactMethod;

            _customerData.Update(xcustomer);
            _customerData.Commit();
            return Ok(xcustomer);
        }

        [HttpDelete("{id}")] //  ./api/customers/:id
        public IActionResult Delete(int id)
        {
            var xcustomer = _customerData.Get(id);
            if (xcustomer == null)
            {
                return NotFound();
            }

            _customerData.Delete(xcustomer);
            _customerData.Commit();
            return NoContent();
        }
    }
}
