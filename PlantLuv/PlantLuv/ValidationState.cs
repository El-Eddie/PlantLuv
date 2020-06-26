using System;
using System.Collections.Generic;
using System.Linq;

namespace PlantLuv
{
    public class ValidationState<T>
    {
        public ValidationState(T model)
        {
            ResultModel = model;
            Errors = new List<ValidationError>();
        }
        public T ResultModel { get; set; }

        public List<ValidationError> Errors { get; set; }

        public ValidationState<T> Add(int statusCode, string message)
        {
            Errors.Add(new ValidationError { StatusCode = statusCode, Message = message });
            return this;
        }
        public ValidationState<T> Add(string message)
        {
            Errors.Add(new ValidationError { StatusCode = 400, Message = message });
            return this;
        }
        public ValidationState<T> AddRange(IEnumerable<string> messages)
        {
            foreach (var message in messages)
            {
                Errors.Add(new ValidationError { Message = message });
            }
            return this;
        }

        public ValidationState<T> Add(string propertyName, string message)
        {
            Errors.Add(new ValidationError { StatusCode = 400, PropertyName = propertyName, Message = message });
            return this;
        }
        public ValidationState<T> Add(string recordId, string propertyName, string message)
        {
            Errors.Add(new ValidationError { StatusCode = 400, RecordId = recordId, PropertyName = propertyName, Message = message });
            return this;
        }
        public ValidationState<T> Add(int recordId, string propertyName, string message)
        {
            Errors.Add(new ValidationError { StatusCode = 400, RecordId = recordId.ToString(), PropertyName = propertyName, Message = message });
            return this;
        }
        public ValidationState<T> Add(Guid recordId, string propertyName, string message)
        {
            Errors.Add(new ValidationError { StatusCode = 400, RecordId = recordId.ToString(), PropertyName = propertyName, Message = message });
            return this;
        }

        public IEnumerable<string> SerializeErrors()
        {
            if (Errors.Count == 0)
                return new List<string>();

            return Errors.Select(x => {
                //if (!string.IsNullOrWhiteSpace(x.RecordId))
                //    return string.Format("{0}: {1}: {2}", x.RecordId, x.PropertyName, x.Message);
                //if (!string.IsNullOrWhiteSpace(x.PropertyName))
                //    return string.Format("{0}: {1}", x.PropertyName, x.Message);
                return x.Message;
            })
            .Distinct();
        }
    }

    public class ValidationError
    {
        public string RecordId { get; set; }
        public string PropertyName { get; set; }
        public string Message { get; set; }
        public int StatusCode { get; set; }
    }
}
