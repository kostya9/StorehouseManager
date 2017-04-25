using StorehouseManager.Domain.Goods.TransitionLogs;

namespace StorehouseManager.Domain.Goods.StateCommand.ConcreteCommand
{
    class StoreCommand : StateChangeCommand
    {
        private readonly int _areaId;

        public StoreCommand(GoodsItem item, TransitionLog log, int areaId) : base(item, log)
        {
            _areaId = areaId;
        }

        protected override void Operation()
        {
            _item.TransitionState.Store(_areaId);
        }

        protected override void Log()
        {
            _log.LogChangeStoreLocation(_areaId);
        }
    }
}