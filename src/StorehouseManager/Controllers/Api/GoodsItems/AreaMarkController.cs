using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using StorehouseManager.Domain.Characteristics;
using StorehouseManager.Domain.Goods;

namespace StorehouseManager.Controllers.Api.GoodsItems
{
    [Authorize]
    [Route("/api/goodsitems/{id}/[controller]")]
    public class AreaMarkController : Controller
    {
        private readonly GoodsItemService _service;

        public AreaMarkController(GoodsItemService service)
        {
            _service = service;
        }

        [HttpGet]
        public IEnumerable<AreaMarkingReport> Mark(int id)
        {
            return _service.MarkAreas(id, this.GetCurrentUserId());
        }
    }
}
