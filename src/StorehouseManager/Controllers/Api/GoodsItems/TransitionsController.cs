using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Razor.Parser.SyntaxTree;
using StorehouseManager.CustomInfrastructure;
using StorehouseManager.Domain.Goods;
using StorehouseManager.Domain.Goods.TransitionLogs;
using StorehouseManager.Models;

namespace StorehouseManager.Controllers.Api.GoodsItems
{
    [ApiException]
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

            return _repository.FindByGoodsItemId(id).Select(t => new GoodsTransitionModel
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
