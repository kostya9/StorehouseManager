using StorehouseManager.Domain.Goods.TransitionLogs;

namespace StorehouseManager.Domain.Goods.StateCommand.ConcreteCommand
{
    class AcceptCommand : StateChangeCommand
    {
        public AcceptCommand(GoodsItem item, TransitionLog log) : base(item, log)
        {
        }

        protected override void Operation()
        {
            _item.TransitionState.Accept();   
        }

        protected override void Log()
        {
            _log.Log(GoodsItemStatus.Accepted);
        }
    }
}