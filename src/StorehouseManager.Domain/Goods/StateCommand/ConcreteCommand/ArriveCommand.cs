using StorehouseManager.Domain.Goods.TransitionLogs;

namespace StorehouseManager.Domain.Goods.StateCommand.ConcreteCommand
{
    class ArriveCommand : StateChangeCommand
    {
        public ArriveCommand(GoodsItem item, TransitionLog log) : base(item, log)
        {
        }

        protected override void Operation()
        {
            _item.TransitionState.Arrive();
        }

        protected override void Log()
        {
            _log.Log(GoodsItemStatus.Arrived);
        }
    }
}
