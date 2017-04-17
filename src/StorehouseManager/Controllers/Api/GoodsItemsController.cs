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
        private readonly GoodsRepository _repository;

        public GoodsItemsController(GoodsRepository repository)
        {
            _repository = repository;
        }


        public IEnumerable<object> Items()
        {
            int userId = this.GetCurrentUserId();
            return _repository.FindAll(userId);
        } 
    }
}
