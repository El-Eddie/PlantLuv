using System;
using System.Linq;
using PlantLuv.Web.Filters;
using PlantLuv.Web.Models;
using PlantLuv.Web.Models.Customers;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;


namespace PlantLuv.Web.ApiControllers
{
    [Route("api/customers")]
    [Authorize(Policy = "ApiUser")]
    public class CustomerController : Controller
    {
        private readonly ICustomerData _customerData;
        private readonly ILogger<CustomerController> _logger;
        private readonly IUrlHelper _urlHelper;

        public CustomerController(
            ICustomerData customerData,
            ILogger<CustomerController> logger,
            IUrlHelper urlHelper)
        {
            _customerData = customerData;
            _logger = logger;
            _urlHelper = urlHelper;
        }


        [HttpGet("", Name = "GetCustomers")]
        [ResponseCache(Duration = 30, Location = ResponseCacheLocation.Any)]
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
        [ResponseCache(Duration = 30, Location = ResponseCacheLocation.Client)]
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
                _logger.LogWarning("Error!");
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
                _logger.LogWarning("Customer {0} not found", id);
                return NotFound();
            }

            _logger.LogInformation("Deleting customer: {0}", id);
            _customerData.Delete(xcustomer);
            _customerData.Commit();
            return NoContent();
        }
    }
}
