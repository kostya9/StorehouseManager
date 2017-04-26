using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StorehouseManager.CustomInfrastructure;
using StorehouseManager.Domain;
using StorehouseManager.Domain.Areas;
using StorehouseManager.Domain.Goods;
using StorehouseManager.Helpers;
using StorehouseManager.Models;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace StorehouseManager.Controllers.Api
{
    [ApiException]
    [Route("/api/[controller]")]
    [Authorize]
    public class AreasController : Controller
    {
        private readonly AreaRepository _areaRepository;
        private readonly AreaUsedVolumeEstimate _estimator;

        public AreasController(AreaRepository areaRepository, GoodsRepository goodsRepository)
        {
            _areaRepository = areaRepository;
            _estimator = new AreaUsedVolumeEstimate(goodsRepository);
        }

        [HttpGet]
        public IEnumerable<AreaModel> Areas()
        {
            return _areaRepository.FindAll().ToList()
                .Select(area => AreaModel.FromArea(area, _estimator.Calculate(area)));
        }

        [HttpPost]
        public AreaModel AddArea([FromBody]AreaModel area)
        {
            if (area.Rectangle == null)
                throw new ArgumentException();
            var id = _areaRepository.Add(area.Rectangle, area.Type, area.Name);
            var foundArea = _areaRepository.FindById(id);
            return AreaModel.FromArea(foundArea, _estimator.Calculate(foundArea));
        }

        [HttpDelete("{id}")]
        public void RemoveArea(int id)
        {
            _areaRepository.Remove(id);
        }

        [HttpPut("{id}")]
        public AreaModel UpdateArea(int id, [FromBody]AreaModel area)
        {
            var returnedArea = _areaRepository.Update(id, area.Name, area.Type,
                area.Humidity, area.Temperature, area.Volume);

            return AreaModel.FromArea(returnedArea, _estimator.Calculate(returnedArea));

        }
    }
}
