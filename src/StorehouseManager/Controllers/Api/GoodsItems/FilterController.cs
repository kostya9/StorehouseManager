using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StorehouseManager.Domain.Goods;

namespace StorehouseManager.Controllers.Api.GoodsItems
{
    [Route("/api/goodsitems/[controller]")]
    [Authorize]
    public class FilterController : Controller
    {
        private readonly GoodsItemFilter _filter;

        public FilterController(GoodsItemFilter filter)
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
        public IEnumerable<GoodsItem> Accepted()
        {
            int userId = this.GetCurrentUserId();

            return _filter.Accepted(userId);
        }

        [Route("[action]")]
        public IEnumerable<GoodsItem> Storing()
        {
            int userId = this.GetCurrentUserId();

            return _filter.Storing(userId);
        }

        [Route("[action]")]
        public IEnumerable<GoodsItem> WaitingForUnload()
        {
            int userId = this.GetCurrentUserId();

            return _filter.WaitingForUnload(userId);
        }

        [Route("[action]")]
        public IEnumerable<GoodsItem> Unloaded()
        {
            int userId = this.GetCurrentUserId();

            return _filter.Unloaded(userId);
        }


        [Route("[action]")]
        public IEnumerable<GoodsItem> Rejected()
        {
            int userId = this.GetCurrentUserId();

            return _filter.Rejected(userId);
        }
    }
}
