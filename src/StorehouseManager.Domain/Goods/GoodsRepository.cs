using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Sockets;
using System.Text;
using Microsoft.EntityFrameworkCore;
using StorehouseManager.Domain.Areas;
using StorehouseManager.Domain.Authentication;
using StorehouseManager.Domain.Goods.TransitionLogs;
using StorehouseManager.Domain.Goods.TransitionState;
using StorehouseManager.Domain.Goods.TransitionState.StateFactory;

namespace StorehouseManager.Domain.Goods
{
    public class GoodsRepository
    {
        private readonly EfDbContext _context;
        private readonly User _user;

        public GoodsRepository(EfDbContext context, GoodsTransitionRepository transitionRepository, User user)
        {
            _context = context;
            _stateFactory = new GoodsRepositoryStateFactory(transitionRepository);

            GoodsItems = context.GoodsItems.Include(gi => gi.Characteristics)
                .OrderByDescending(gi => gi.LastTransition).AsQueryable()
                .Select(gi => InsertTransitionStrategy(gi));

            _user = user;
        }

        private readonly GoodsStateFactory _stateFactory;

        private GoodsItem InsertTransitionStrategy(GoodsItem item)
        {
            item.TransitionState = _stateFactory.FromGoods(item);
            return item;
        }

        public IQueryable<GoodsItem> GoodsItems { get; }

        public GoodsItem FindById(int id)
        {
            return FindAll().First(gi => gi.Id == id);
        }

        public IQueryable<GoodsItem> FindAll()
        {
            return GoodsItems.Where(gi => gi.UserId == _user.Id);
        }

        public GoodsItem Update(GoodsItem item)
        {
            var dalItem = FindById(item.Id);
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
