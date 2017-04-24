using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Razor.Parser.SyntaxTree;
using StorehouseManager.Domain.Goods;
using StorehouseManager.Domain.Goods.TransitionLogs;
using StorehouseManager.Models;

namespace StorehouseManager.Controllers.Api.GoodsItems
{
    [Route("/api/goodsitems/{id}/[controller]")]
    [Authorize]
    public class TransitionsController : Controller
    {
        private readonly GoodsTransitionRepository _repository;

        public TransitionsController(GoodsTransitionRepository repository)
        {
            _repository = repository;
        }

        public IEnumerable<GoodsTransitionModel> TransitionsById(int id)
        {
            var userId = this.GetCurrentUserId();

            return _repository.FindByGoodsItemId(id, userId).Select(t => new GoodsTransitionModel
            {
                Id = t.Id,
                From = Enum.GetName(typeof(GoodsItemStatus), t.From),
                To = Enum.GetName(typeof(GoodsItemStatus), t.To),
                Note = t.Note,
                TransitionTime = t.TimeStamp
            });
        }
    }
}
