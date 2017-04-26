using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using StorehouseManager.Models;

namespace StorehouseManager.CustomInfrastructure
{
    public class ApiExceptionAttribute : ExceptionFilterAttribute
    {
        public override void OnException(ExceptionContext context)
        {
            var exception = context.Exception;
            var code = context.Exception is ArgumentException || context.Exception is InvalidOperationException 
                ? 400 
                : 500;

            var error = new ErrorInformation
            {
                Code = code,
                Message = (!string.IsNullOrEmpty(exception.Message) && code == 400) ? exception.Message : "Unknown error."
            };

            context.HttpContext.Response.Clear();
            context.HttpContext.Response.StatusCode = error.Code;
            context.Result = new JsonResult(error);
        }
    }
}
