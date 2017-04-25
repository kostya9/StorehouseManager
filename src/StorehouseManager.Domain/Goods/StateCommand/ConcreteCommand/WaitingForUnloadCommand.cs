using StorehouseManager.Domain.Goods.TransitionLogs;

namespace StorehouseManager.Domain.Goods.StateCommand.ConcreteCommand
{
    class WaitingForUnloadCommand : StateChangeCommand
    {
        public WaitingForUnloadCommand(GoodsItem item, TransitionLog log) : base(item, log)
        {
        }

        protected override void Operation()
        {
            _item.TransitionState.WaitForUnload();
        }

        protected override void Log()
        {
            _log.Log(GoodsItemStatus.WaitingForUnloading);
        }
    }
}