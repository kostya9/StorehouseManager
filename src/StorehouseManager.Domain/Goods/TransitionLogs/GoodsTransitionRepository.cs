﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Remotion.Linq.Clauses;

namespace StorehouseManager.Domain.Goods.TransitionLogs
{
    public class GoodsTransitionRepository
    {
        private readonly EfDbContext _context;
        public IQueryable<GoodsTransition> Transitions { get; }

        public GoodsTransitionRepository(EfDbContext context)
        {
            _context = context;
            Transitions = _context.GoodsTransitions.OrderByDescending(dt => dt.TimeStamp).AsQueryable();
        }

        public GoodsTransition Add(GoodsItemStatus from, GoodsItemStatus to, int goodsItemId)
        {
            var transition = new GoodsTransition(@from, to, goodsItemId);
            _context.GoodsTransitions.Add(transition);
            _context.SaveChanges();
            return transition;
        }

        public GoodsTransition Add(GoodsItemStatus from, GoodsItemStatus to, int goodsItemId, string note)
        {
            var transition = new GoodsTransition(from, to, goodsItemId, note);
            _context.GoodsTransitions.Add(transition);
            _context.SaveChanges();
            return transition;
        }

        public IEnumerable<GoodsTransition> FindByGoodsItemId(int goodsItemId, int userId)
        {
            var itemsRepository = new GoodsRepository(_context, this);
            var item = itemsRepository.FindById(goodsItemId, userId);

            if(item == null)
                throw new ArgumentException("No goodsItem for that user");

            return Transitions.Where(transition => transition.GoodsItemId == goodsItemId);
        }
}
}
