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
        private readonly User _user;

        public IQueryable<Area> Areas { get; }

        public AreaRepository(EfDbContext context, User user)
        {
            _context = context;
            _user = user;
            Areas = _context.Areas
                .Include(area => area.Rectangle).Include(area => area.Characteristics)
                .AsQueryable();
        }

        public int Add(Rectangle rectangle, AreaType type, string name)
        {
            if (Area.ShouldBeUnique(type))
            {
                var sameTypeArea = FindAll().FirstOrDefault(a => a.Type == type);
                if(sameTypeArea != null)
                    throw new ArgumentException("This area type should be unique");
            }
            var area = new Area(_user.Id, name, type, rectangle) {Characteristics = new AreaCharacteristics()};
            _context.Areas.Add(area);
            _context.SaveChanges();
            return area.Id;
        }

        public IEnumerable<Area> FindAll()
        {
            return Areas.Where(area => area.UserId == _user.Id);
        }

        public Area FindById(int id) => FindAll().First(s => s.Id == id);

        public void Remove(int id)
        {
            _context.Remove(FindById(id));
            _context.SaveChanges();
        }

        public Area Update(int id, string name, AreaType type, double humidity, double temperature, double volume)
        {
            var repositoryArea = FindById(id);
            repositoryArea.Name = name;
            repositoryArea.Type = type;

            repositoryArea.Characteristics.Humidity = humidity;
            repositoryArea.Characteristics.Temperature = temperature;
            repositoryArea.Characteristics.Volume = volume;
            _context.Areas.Update(repositoryArea);
            _context.SaveChanges();
            return repositoryArea;
        }
    }
}
