using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Server.Kestrel.Internal.Networking;
using StorehouseManager.Domain.Goods;
using StorehouseManager.Models;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace StorehouseManager.Controllers.Api.GoodsItems
{
    [Route("/api/goodsitems/[controller]")]
    [Authorize]
    public class OperationsController : Controller
    {
        private readonly GoodsItemService _service;

        public OperationsController(GoodsItemService service)
        {
            _service = service;
        }

        [HttpPost]
        [Route("[action]")]
        public GoodsItem Create([FromBody]GoodsItemModel item)
        {
            var goods = new GoodsItem(item.Name, item.Shipper, this.GetCurrentUserId());
            return _service.Create(goods);
        }

        [HttpPost]
        [Route("{id}/[action]")]
        public void Arrive([FromRoute]int id)
        {
            _service.ChangeState(GoodsItemStatus.Arrived, id, this.GetCurrentUserId());
        }

        [HttpPost]
        [Route("{id}/[action]")]
        public void Accept([FromRoute]int id)
        {
            _service.ChangeState(GoodsItemStatus.Accepted, id, this.GetCurrentUserId());
        }

        [HttpPost]
        [Route("{id}/[action]")]
        public void Store([FromRoute]int id, [FromQuery]int areaId)
        {
            _service.ChangeState(GoodsItemStatus.Storing, id, this.GetCurrentUserId(), areaId);
        }

        [HttpPost]
        [Route("{id}/[action]")]
        public void WaitForUnload([FromRoute]int id)
        {
            _service.ChangeState(GoodsItemStatus.WaitingForUnloading, id, this.GetCurrentUserId());
        }

        [HttpPost]
        [Route("{id}/[action]")]
        public void Unload([FromRoute]int id)
        {
            _service.ChangeState(GoodsItemStatus.Unloaded, id, this.GetCurrentUserId());
        }

        [HttpPost]
        [Route("{id}/[action]")]
        public void Reject([FromRoute]int id, [FromQuery]string reasoning)
        {
            _service.ChangeState(GoodsItemStatus.Rejected, id, this.GetCurrentUserId(), reasoning:reasoning);
        }

        [HttpPost]
        [Route("{id}/[action]")]
        public void Remove([FromRoute]int id)
        {
            _service.ChangeState(GoodsItemStatus.Removed, id, this.GetCurrentUserId());
        }
    }
}
