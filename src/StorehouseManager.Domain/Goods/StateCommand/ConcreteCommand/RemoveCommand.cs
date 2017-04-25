using StorehouseManager.Domain.Goods.TransitionLogs;

namespace StorehouseManager.Domain.Goods.StateCommand.ConcreteCommand
{
    class RemoveCommand : StateChangeCommand
    {
        public RemoveCommand(GoodsItem item, TransitionLog log) : base(item, log)
        {
        }

        protected override void Operation()
        {
            _item.TransitionState.Remove();
        }

        protected override void Log()
        {
            _log.Log(GoodsItemStatus.Removed);
        }
    }
}