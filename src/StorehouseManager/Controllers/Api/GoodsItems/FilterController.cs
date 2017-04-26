using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StorehouseManager.CustomInfrastructure;
using StorehouseManager.Domain.Goods;
using StorehouseManager.Models;

namespace StorehouseManager.Controllers.Api.GoodsItems
{
    [ApiException]
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
            return _filter.All();
        }

        [Route("{id}")]
        public GoodsItemModel Item([FromRoute]int id)
        {
            var item = _filter.ById(id);
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
            return _filter.Registered();
        }

        [Route("[action]")]
        public IEnumerable<GoodsItem> Arrived()
        {
            return _filter.Arrived();
        }

        [Route("[action]")]
        public IEnumerable<GoodsItem> Accepted()
        {
            return _filter.Accepted();
        }

        [Route("[action]")]
        public IEnumerable<GoodsItem> Storing([FromQuery]int areaId)
        {
            return _filter.Storing(areaId);
        }

        [Route("[action]")]
        public IEnumerable<GoodsItem> WaitingForUnload()
        {
            return _filter.WaitingForUnload();
        }

        [Route("[action]")]
        public IEnumerable<GoodsItem> Unloaded()
        {
            return _filter.Unloaded();
        }


        [Route("[action]")]
        public IEnumerable<GoodsItem> Rejected()
        {
            return _filter.Rejected();
        }
    }
}
