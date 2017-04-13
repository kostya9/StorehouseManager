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
            var userId = GetCurrentUserId();
            return _areaRepository.FindAll(userId);
        }

        [HttpPost]
        public Area AddArea([FromBody]Area area)
        {
            if (area.Rectangle == null)
                throw new ArgumentException();
            var userId = GetCurrentUserId();
            var id = _areaRepository.Add(area.Rectangle, area.Type, area.Name, userId);
            return _areaRepository.FindById(id, userId);
        }

        [HttpDelete("{id}")]
        public void RemoveArea(int id)
        {
            var userId = GetCurrentUserId();
            _areaRepository.Remove(id, userId);
        }

        [HttpPut("{id}")]
        public Area UpdateArea(int id, [FromBody]Area area)
        {
            return _areaRepository.Update(id, area.Name, area.Type, GetCurrentUserId());
        }

        public int GetCurrentUserId()
        {
            var userIdString = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var userId = int.Parse(userIdString);
            return userId;
        }
    }
}
