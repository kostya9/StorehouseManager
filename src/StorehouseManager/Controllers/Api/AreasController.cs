using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StorehouseManager.Domain;
using StorehouseManager.Domain.Areas;
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

        public AreasController(EfDbContext context)
        {
            _areaRepository = new AreaRepository(context);
        }

        [HttpGet]
        public IEnumerable<Area> Areas()
        {
            var userId = this.GetCurrentUserId();
            return _areaRepository.FindAll(userId);
        }

        [HttpPost]
        public Area AddArea([FromBody]AreaModel area)
        {
            if (area.Rectangle == null)
                throw new ArgumentException();
            var userId = this.GetCurrentUserId();
            var id = _areaRepository.Add(area.Rectangle, area.Type, area.Name, userId);
            return _areaRepository.FindById(id, userId);
        }

        [HttpDelete("{id}")]
        public void RemoveArea(int id)
        {
            var userId = this.GetCurrentUserId();
            _areaRepository.Remove(id, userId);
        }

        [HttpPut("{id}")]
        public Area UpdateArea(int id, [FromBody]AreaModel area)
        {
            return _areaRepository.Update(id, area.Name, area.Type, this.GetCurrentUserId());
        }
    }
}
