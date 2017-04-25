using StorehouseManager.Domain.Goods.TransitionLogs;

namespace StorehouseManager.Domain.Goods.StateCommand.ConcreteCommand
{
    class UnloadCommand : StateChangeCommand
    {
        public UnloadCommand(GoodsItem item, TransitionLog log) : base(item, log)
        {
        }

        protected override void Operation()
        {
            _item.TransitionState.Unload();
        }

        protected override void Log()
        {
            _log.Log(GoodsItemStatus.Unloaded);
        }
    }
}