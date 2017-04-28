using System;
using StorehouseManager.Domain.Goods.TransitionLogs;
using StorehouseManager.Domain.Goods.TransitionState.StateFactory;

namespace StorehouseManager.Domain.Goods.TransitionState.ConcreteState
{
    class AcceptedTransitionState : GoodsTransitionState
    {
        public AcceptedTransitionState(GoodsItem item, IGoodsStateFactory stateFactory) : base(item, stateFactory)
        {
        }

        public override void Arrive()
        {
            throw new InvalidOperationException("The GoodsItem is already arrived");
        }

        public override void Accept()
        {
            throw new InvalidOperationException("The GoodsItem is already accepted");
        }

        public override void Store(int areaId)
        {
            base.Store(areaId);
        }

        public override void WaitForUnload()
        {
            throw new InvalidOperationException("The GoodsItem is not stored");
        }

        public override void Unload()
        {
            throw new InvalidOperationException("The GoodsItem is not stored");
        }

        public override void Reject(string reasoning)
        {
            base.Reject(reasoning);
        }

        public override void Remove()
        {
            throw new InvalidOperationException("Cannot remove already arrived.");
        }
    }
}
