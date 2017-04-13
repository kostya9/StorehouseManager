using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace StorehouseManager.Controllers.Api
{
    public static class ControllerExtensions
    {
        public static int GetCurrentUserId(this Controller controller) 
        {
            var userIdString = controller.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var userId = int.Parse(userIdString);
            return userId;
        }
    }
}
