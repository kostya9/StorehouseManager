using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;

namespace StorehouseManager.Controllers.Api.GoodsItems
{
    [Authorize]
    [Route("/api/goodsitems/{id}/[controller]")]
    public class AreaMarkController : Controller
    {
        public AreaMarkController()
        {
            
        }
    }
}
