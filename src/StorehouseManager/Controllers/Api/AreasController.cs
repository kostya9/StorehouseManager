using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StorehouseManager.Domain;
using StorehouseManager.Domain.Areas;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace StorehouseManager.Controllers.Api
{
    [Authorize]
    public class AreasController : Controller
    {
        private readonly AreaRepository _areaRepository;

        public AreasController(EfDbContext context)
        {
            _areaRepository = new AreaRepository(context);
        }

        // GET: /<controller>/
        public IEnumerable<Area> Areas()
        {
            var userIdClaim = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier);
            var userId = userIdClaim.Value;
            return _areaRepository.FindAll(int.Parse(userId));
        }

        [HttpPost]
        public void AddArea(Area area)
        {
            var userId = HttpContext.User.FindFirst(claim => claim.ValueType == ClaimTypes.NameIdentifier).Value;
            _areaRepository.Add(area.Rectangle, area.Type, int.Parse(userId));
        }
    }
}
