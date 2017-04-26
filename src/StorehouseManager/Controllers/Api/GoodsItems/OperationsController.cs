using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Server.Kestrel.Internal.Networking;
using StorehouseManager.CustomInfrastructure;
using StorehouseManager.Domain.Authentication;
using StorehouseManager.Domain.Goods;
using StorehouseManager.Models;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace StorehouseManager.Controllers.Api.GoodsItems
{
    [ApiException]
    [Route("/api/goodsitems/[controller]")]
    [Authorize]
    public class OperationsController : Controller
    {
        private readonly GoodsItemService _service;
        private readonly User _user;

        public OperationsController(GoodsItemService service, User user)
        {
            _service = service;
            _user = user;
        }

        [HttpPost]
        [Route("[action]")]
        public GoodsItem Create([FromBody]GoodsItemModel item)
        {
            var goods = new GoodsItem(item.Name, item.Shipper, _user.Id,
            new GoodsCharacteristics
                {
                    TemperatureLow = item.TemperatureLow,
                    TemperatureHigh = item.TemperatureHigh,
                    HumidityLow = item.HumidityLow,
                    HumidityHigh = item.HumidityHigh,
                    Volume = item.Volume
                });
            return _service.Create(goods);
        }

        [HttpPost]
        [Route("{id}/[action]")]
        public void Arrive([FromRoute]int id)
        {
            _service.ChangeState(GoodsItemStatus.Arrived, id);
        }

        [HttpPost]
        [Route("{id}/[action]")]
        public void Accept([FromRoute]int id)
        {
            _service.ChangeState(GoodsItemStatus.Accepted, id);
        }

        [HttpPost]
        [Route("{id}/[action]")]
        public void Store([FromRoute]int id, [FromQuery]int areaId)
        {
            _service.ChangeState(GoodsItemStatus.Storing, id, areaId);
        }

        [HttpPost]
        [Route("{id}/[action]")]
        public void WaitForUnload([FromRoute]int id)
        {
            _service.ChangeState(GoodsItemStatus.WaitingForUnloading, id);
        }

        [HttpPost]
        [Route("{id}/[action]")]
        public void Unload([FromRoute]int id)
        {
            _service.ChangeState(GoodsItemStatus.Unloaded, id);
        }

        [HttpPost]
        [Route("{id}/[action]")]
        public void Reject([FromRoute]int id, [FromQuery]string reasoning)
        {
            _service.ChangeState(GoodsItemStatus.Rejected, id, reasoning:reasoning);
        }

        [HttpPost]
        [Route("{id}/[action]")]
        public void Remove([FromRoute]int id)
        {
            _service.ChangeState(GoodsItemStatus.Removed, id);
        }
    }
}
