using System;
using System.Collections.Generic;
using System.Text;
using StorehouseManager.Domain.Areas;
using StorehouseManager.Domain.Goods.TransitionLogs;

namespace StorehouseManager.Domain.Goods.TransitionStrategy
{
    class GoodsTransitionStrategyFactory
    {
        private readonly AreaRepository _repository;
        private readonly GoodsTransitionRepository _transitionRepository;

        public GoodsTransitionStrategyFactory(AreaRepository repository, GoodsTransitionRepository transitionRepository)
        {
            _repository = repository;
            _transitionRepository = transitionRepository;
        }

        public GoodsTransitionStrategy FromGoods(GoodsItem item)
        {
            switch (item.Status)
            {
                case GoodsItemStatus.Registered:
                    return new RegisteredTransitionStrategy(item, _transitionRepository);
                default:
                    throw new NotImplementedException();
            }
        }
    }
}
