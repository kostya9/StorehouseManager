using StorehouseManager.Domain.Goods.TransitionLogs;
using StorehouseManager.Domain.Goods.TransitionState.ConcreteState;

namespace StorehouseManager.Domain.Goods.TransitionState.StateFactory
{
    class GoodsLogStateFactory : GoodsStateFactory
    {
        private readonly TransitionLog _log;

        public GoodsLogStateFactory(TransitionLog log)
        {
            _log = log;
        }

        public override GoodsTransitionState FromGoods(GoodsItem item) => FromGoods(item, _log);
    }
}
