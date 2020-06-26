using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlantLuv.Web.Models.Customers
{
    public class ValidationErrorModel
    {
        public Boolean Success { get; set; } = false;
        public string Message { get; set; } = string.Empty; //model level errors
        public List<ValidationError> Error { get; set; } = new List<ValidationError>(); //property level errors

        public ValidationErrorModel(ModelStateDictionary modelState)
        {
            foreach (var key in modelState.Keys)
            {
                if (!string.IsNullOrEmpty(key))
                {
                    Message = modelState[key].Errors[0].ErrorMessage;
                }
                else
                {
                    foreach (var err in modelState[key].Errors)
                    {
                        Error.Add(new ValidationError
                        {
                            Field = key,
                            Message = err.ErrorMessage
                        });
                    }
                }
                Success = Error.Count == 0;

            }
        }
    }
}
