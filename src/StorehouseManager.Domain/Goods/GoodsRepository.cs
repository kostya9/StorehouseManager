using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Sockets;
using System.Text;
using StorehouseManager.Domain.Goods.TransitionStrategy;

namespace StorehouseManager.Domain.Goods
{
    class GoodsRepository
    {
        private readonly EfDbContext _context;

        public GoodsRepository(EfDbContext context)
        {
            _context = context;
            GoodsItems = context.GoodsItems.AsQueryable();
        }



        public IQueryable<GoodsItem> GoodsItems { get; }

        public GoodsItem FindById(int id, int userId)
        {
            return FindAll(userId).First(gi => gi.Id == id);
        }

        public IQueryable<GoodsItem> FindAll(int userId)
        {
            return GoodsItems.Where(gi => gi.UserId == userId);
        }

        public GoodsItem Update(int id, int userId, string name)
        {
            var item = FindById(id, userId);
            item.Name = name;
            _context.GoodsItems.Update(item);
            _context.SaveChanges();
            return item;
        }
    }
}
