using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace StorehouseManager.Helpers
{
    public static class HttpContextExtensions
    {
        /*public static int GetCurrentUserId(this HttpContext context)
        {
            var userIdString = context.User.FindFirst(claim => claim.ValueType == ClaimTypes.NameIdentifier).Value;
            var userId = int.Parse(userIdString);
            return userId;
        }*/
    }
}
