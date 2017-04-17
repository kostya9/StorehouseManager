using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StorehouseManager.Domain.Goods;

namespace StorehouseManager.Controllers.Api
{
    [Route("/api/[controller]")]
    [Authorize]
    public class GoodsItemsController : Controller
    {
        private readonly GoodsItemFilter _filter;

        public GoodsItemsController(GoodsItemFilter filter)
        {
            _filter = filter;
        }


        public IEnumerable<GoodsItem> Items()
        {
            int userId = this.GetCurrentUserId();

            return _filter.All(userId);
        }

        [Route("[action]")]
        public IEnumerable<GoodsItem> Registered()
        {
            int userId = this.GetCurrentUserId();

            return _filter.Registered(userId);
        }

        [Route("[action]")]
        public IEnumerable<GoodsItem> Arrived()
        {
            int userId = this.GetCurrentUserId();

            return _filter.Arrived(userId);
        }

        [Route("[action]")]
        public IEnumerable<GoodsItem> Rejected()
        {
            int userId = this.GetCurrentUserId();

            return _filter.Rejected(userId);
        }
    }
}
