using System;
using StorehouseManager.Domain.Goods.TransitionLogs;
using StorehouseManager.Domain.Goods.TransitionState.StateFactory;

namespace StorehouseManager.Domain.Goods.TransitionState.ConcreteState
{
    class ArrivedTransitionState : GoodsTransitionState
    {
        public ArrivedTransitionState(GoodsItem item, IGoodsStateFactory stateFactory) : base(item, stateFactory)
        {
        }

        public override void Accept()
        {
            base.Accept();
        }

        public override void Arrive()
        {
            throw new InvalidOperationException("GoodsItem is already arrived");
        }

        public override void Store(int areaId)
        {
            throw new InvalidOperationException("GoodsItem is not accepted");
        }

        public override void WaitForUnload()
        {
            throw new InvalidOperationException("GoodsItem is not accepted");
        }

        public override void Unload()
        {
            throw new InvalidOperationException("GoodsItem is not accepted");
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
