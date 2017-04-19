using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Sockets;
using System.Text;
using StorehouseManager.Domain.Areas;
using StorehouseManager.Domain.Goods.TransitionLogs;
using StorehouseManager.Domain.Goods.TransitionState;
using StorehouseManager.Domain.Goods.TransitionState.StateFactory;

namespace StorehouseManager.Domain.Goods
{
    public class GoodsRepository
    {
        private readonly EfDbContext _context;

        public GoodsRepository(EfDbContext context, AreaRepository areaRepository, GoodsTransitionRepository transitionRepository)
        {
            _context = context;
            _stateFactory = new GoodsRepositoryStateFactory(transitionRepository);

            GoodsItems = context.GoodsItems.OrderByDescending(gi => gi.LastTransition).AsQueryable()
                .Select(gi => InsertTransitionStrategy(gi));
        }

        private readonly GoodsStateFactory _stateFactory;

        private GoodsItem InsertTransitionStrategy(GoodsItem item)
        {
            item.TransitionState = _stateFactory.FromGoods(item);
            return item;
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

        public GoodsItem Update(GoodsItem item)
        {
            var dalItem = FindById(item.Id, item.UserId);
            dalItem.Name = item.Name;
            dalItem.AreaId = item.AreaId;
            dalItem.Status = item.Status;
            dalItem.Shipper = item.Shipper;
            dalItem.LastTransition = item.LastTransition;
            _context.GoodsItems.Update(item);
            _context.SaveChanges();
            return item;
        }

        public GoodsItem Add(GoodsItem item)
        {
            _context.Add(item);
            _context.SaveChanges();
            return item;
        }
    }
}
