using StorehouseManager.Domain.Areas;
using StorehouseManager.Domain.Goods.TransitionLogs;

namespace StorehouseManager.Domain.Goods.TransitionState
{
    class GoodsTransitionStateFactory
    {
        private readonly GoodsTransitionRepository _transitionRepository;

        public GoodsTransitionStateFactory(GoodsTransitionRepository transitionRepository)
        {
            _transitionRepository = transitionRepository;
        }

        public GoodsTransitionState FromGoods(GoodsItem item)
        {
            switch (item.Status)
            {
                case GoodsItemStatus.Registered:
                    return new RegisteredTransitionState(item, _transitionRepository);
                default:
                    return new RegisteredTransitionState(item, _transitionRepository);
            }
        }
    }
}
