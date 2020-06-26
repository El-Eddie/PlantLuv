using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using PlantLuv.Web.Models.Customers;

namespace PlantLuv.Web.Filters
{
    public class ValidationFailedResult : ObjectResult
    {
        public ValidationFailedResult(ModelStateDictionary modelState)
            : base(new ValidationErrorModel(modelState))
        {

        }
    }
}
