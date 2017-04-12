using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.EntityFrameworkCore;
using StorehouseManager.Domain.Authentication;

namespace StorehouseManager.Domain.Areas
{
    public class AreaRepository
    {
        private readonly EfDbContext _context;

        public IQueryable<Area> Areas { get; }

        public AreaRepository(EfDbContext context)
        {
            _context = context;
            Areas = _context.Areas.Include(area => area.Rectangle).AsQueryable();
        }

        public int Add(Rectangle rectangle, AreaType type, string name, int userId)
        {
            if (Area.ShouldBeUnique(type))
            {
                var sameTypeArea = Areas.FirstOrDefault(a => a.Type == type);
                if(sameTypeArea != null)
                    throw new ArgumentException("This area type should be unique");
            }
            var area = new Area {Rectangle = rectangle, Type = type, Name = name, UserId = userId};
            _context.Areas.Add(area);
            _context.SaveChanges();
            return area.Id;
        }

        public IEnumerable<Area> FindAll(int userId)
        {
            return Areas.Where(area => area.UserId == userId);
        }

        public Area FindById(int id, int userId) => FindAll(userId).First(s => s.Id == id);

        public void Remove(int id, int userId)
        {
            _context.Remove(FindById(id, userId));
            _context.SaveChanges();
        }

        public Area Update(Area area, int userId)
        {
            var repositoryArea = FindById(area.Id, userId);
            repositoryArea.Name = area.Name;
            repositoryArea.Type = area.Type;
            _context.Areas.Update(repositoryArea);
            _context.SaveChanges();
            return repositoryArea;
        }
    }
}
