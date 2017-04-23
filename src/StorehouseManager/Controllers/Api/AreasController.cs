using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StorehouseManager.Domain;
using StorehouseManager.Domain.Areas;
using StorehouseManager.Domain.Goods;
using StorehouseManager.Helpers;
using StorehouseManager.Models;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace StorehouseManager.Controllers.Api
{
    [Route("/api/[controller]")]
    [Authorize]
    public class AreasController : Controller
    {
        private readonly AreaRepository _areaRepository;
        private AreaUsedVolumeEstimate _estimator;

        public AreasController(EfDbContext context, GoodsRepository repository)
        {
            _areaRepository = new AreaRepository(context);
            _estimator = new AreaUsedVolumeEstimate(repository);
        }

        [HttpGet]
        public IEnumerable<AreaModel> Areas()
        {
            var userId = this.GetCurrentUserId();
            return _areaRepository.FindAll(userId).ToList()
                .Select(area => AreaModel.FromArea(area, _estimator.Calculate(area)));
        }

        [HttpPost]
        public AreaModel AddArea([FromBody]AreaModel area)
        {
            if (area.Rectangle == null)
                throw new ArgumentException();
            var userId = this.GetCurrentUserId();
            var id = _areaRepository.Add(area.Rectangle, area.Type, area.Name, userId);
            var foundArea = _areaRepository.FindById(id, userId);
            return AreaModel.FromArea(foundArea, _estimator.Calculate(foundArea));
        }

        [HttpDelete("{id}")]
        public void RemoveArea(int id)
        {
            var userId = this.GetCurrentUserId();
            _areaRepository.Remove(id, userId);
        }

        [HttpPut("{id}")]
        public AreaModel UpdateArea(int id, [FromBody]AreaModel area)
        {
            var returnedArea = _areaRepository.Update(id, area.Name, area.Type,
                area.Humidity, area.Temperature, area.Volume,
                this.GetCurrentUserId());

            return AreaModel.FromArea(returnedArea, _estimator.Calculate(returnedArea));

        }
    }
}
