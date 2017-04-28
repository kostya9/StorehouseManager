using System;
using System.Collections.Generic;
using System.Text;
using StorehouseManager.Domain.Goods.TransitionLogs;
using StorehouseManager.Domain.Goods.TransitionState.StateFactory;

namespace StorehouseManager.Domain.Goods.TransitionState.ConcreteState
{
    class RemovedTransitionState : GoodsTransitionState
    {
        public RemovedTransitionState(GoodsItem item, IGoodsStateFactory stateFactory) : base(item, stateFactory)
        {
        }

        public override void Arrive()
        {
            throw new InvalidOperationException("The GoodsItem is removed");
        }

        public override void Accept()
        {
            throw new InvalidOperationException("The GoodsItem is removed");
        }

        public override void Store(int areaId)
        {
            throw new InvalidOperationException("The GoodsItem is removed");
        }

        public override void WaitForUnload()
        {
            throw new InvalidOperationException("The GoodsItem is removed");
        }

        public override void Unload()
        {
            throw new InvalidOperationException("The GoodsItem is removed");
        }

        public override void Reject(string reasoning)
        {
            throw new InvalidOperationException("The GoodsItem is removed");
        }

        public override void Remove()
        {
            throw new InvalidOperationException("Cannot remove already removed");
        }
    }
}
