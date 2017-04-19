using StorehouseManager.Domain.Goods.TransitionLogs;
using StorehouseManager.Domain.Goods.TransitionState.ConcreteState;

namespace StorehouseManager.Domain.Goods.TransitionState.StateFactory
{
    class GoodsRepositoryStateFactory : GoodsStateFactory
    {
        private readonly GoodsTransitionRepository _transitionRepository;

        public GoodsRepositoryStateFactory(GoodsTransitionRepository transitionRepository)
        {
            _transitionRepository = transitionRepository;
        }

        public override GoodsTransitionState FromGoods(GoodsItem item)
        {
            var log = new TransitionLog(_transitionRepository, item);
            return FromGoods(item, log);
        }
    }
}
