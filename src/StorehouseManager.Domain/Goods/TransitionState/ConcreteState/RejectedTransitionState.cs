using System;
using System.Collections.Generic;
using System.Text;
using StorehouseManager.Domain.Goods.TransitionLogs;
using StorehouseManager.Domain.Goods.TransitionState.StateFactory;

namespace StorehouseManager.Domain.Goods.TransitionState.ConcreteState
{
    class RejectedTransitionState : GoodsTransitionState
    {
        public RejectedTransitionState(GoodsItem item, IGoodsStateFactory stateFactory) : base(item, stateFactory)
        {
        }

        public override void Accept()
        {
            throw new InvalidOperationException("GoodsItem is rejected");
        }

        public override void Arrive()
        {
            throw new InvalidOperationException("GoodsItem is rejected");
        }

        public override void Store(int areaId)
        {
            throw new InvalidOperationException("GoodsItem is rejected");
        }

        public override void WaitForUnload()
        {
            throw new InvalidOperationException("GoodsItem is rejected");
        }

        public override void Unload()
        {
            throw new InvalidOperationException("GoodsItem is rejected");
        }

        public override void Reject(string reasoning)
        {
            throw new InvalidOperationException("Cannot reject already rejected");
        }

        public override void Remove()
        {
            throw new InvalidOperationException("Cannot remove already arrived.");
        }
    }
}
