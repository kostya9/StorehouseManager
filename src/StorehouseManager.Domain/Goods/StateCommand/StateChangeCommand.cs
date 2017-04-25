using System;
using StorehouseManager.Domain.Goods.TransitionLogs;
using StorehouseManager.Domain.Goods.TransitionState.StateFactory;

namespace StorehouseManager.Domain.Goods.StateCommand
{
    // PATTERN: Command
    public abstract class StateChangeCommand
    {
        protected readonly GoodsItem _item;
        protected readonly TransitionLog _log;

        protected StateChangeCommand(GoodsItem item, TransitionLog log)
        {
            _item = item;
            _log = log;
        }

        protected abstract void Operation();
        protected abstract void Log();

        public void Execute()
        {
            Log();
            Operation();
        }
    }
}
