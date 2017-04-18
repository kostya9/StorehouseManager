using System;
using System.Collections.Generic;
using System.Text;
using StorehouseManager.Domain.Goods.TransitionLogs;

namespace StorehouseManager.Domain.Goods.TransitionState
{
    class UnloadedTransitionState : GoodsTransitionState
    {
        public UnloadedTransitionState(GoodsItem item, GoodsTransitionRepository repository) : base(item, repository)
        {
        }

        public override void Accept()
        {
            throw new InvalidOperationException("GoodsItem is already accepted");
        }

        public override void Arrive()
        {
            throw new InvalidOperationException("GoodsItem is already arrived");
        }

        public override void Store(int areaId)
        {
            throw new InvalidOperationException("GoodsItem is already stored");
        }

        public override void WaitForUnload()
        {
            throw new InvalidOperationException("GoodsItem is already waited for unload");
        }

        public override void Unload()
        {
            throw new InvalidOperationException("GoodsItem is already unloaded");
        }

        public override void Reject(string reasoning)
        {
            throw new InvalidOperationException("Cannot reject already accepted");
        }
    }
}
