using StorehouseManager.Domain.Goods.TransitionLogs;

namespace StorehouseManager.Domain.Goods.StateCommand.ConcreteCommand
{
    class RejectCommand : StateChangeCommand
    {
        private readonly string _reasoning;

        public RejectCommand(GoodsItem item, TransitionLog log, string reasoning) : base(item, log)
        {
            _reasoning = reasoning;
        }

        protected override void Operation()
        {
            _item.TransitionState.Reject(_reasoning);
        }

        protected override void Log()
        {
            _log.Log(GoodsItemStatus.Rejected, _reasoning);
        }
    }
}