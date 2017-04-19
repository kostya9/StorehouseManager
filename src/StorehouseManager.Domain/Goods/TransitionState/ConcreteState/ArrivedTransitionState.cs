using System;
using StorehouseManager.Domain.Goods.TransitionLogs;

namespace StorehouseManager.Domain.Goods.TransitionState.ConcreteState
{
    class ArrivedTransitionState : GoodsTransitionState
    {
        public ArrivedTransitionState(GoodsItem item, TransitionLog log) : base(item, log)
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
