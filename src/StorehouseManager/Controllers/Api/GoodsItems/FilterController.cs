using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StorehouseManager.Domain.Goods;
using StorehouseManager.Models;

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

        [Route("{id}")]
        public GoodsItemModel Item([FromRoute]int id)
        {
            int userId = this.GetCurrentUserId();

            var item = _filter.ById(id, userId);
            return new GoodsItemModel
            {
                Name = item.Name,
                Volume = item.Characteristics.Volume,
                TemperatureLow = item.Characteristics.TemperatureLow,
                HumidityHigh = item.Characteristics.HumidityHigh,
                HumidityLow = item.Characteristics.HumidityLow,
                Shipper = item.Shipper,
                TemperatureHigh = item.Characteristics.TemperatureHigh,
                Id = id,
                Status = item.Status == GoodsItemStatus.Storing ? "Storing in area number " + item.AreaId : Enum.GetName(typeof(GoodsItemStatus), item.Status)
            };
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
        public IEnumerable<GoodsItem> Storing([FromQuery]int areaId)
        {
            int userId = this.GetCurrentUserId();

            return _filter.Storing(areaId, userId);
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
