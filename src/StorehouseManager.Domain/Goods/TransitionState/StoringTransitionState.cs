using System;
using System.Collections.Generic;
using System.Text;
using StorehouseManager.Domain.Goods.TransitionLogs;

namespace StorehouseManager.Domain.Goods.TransitionState
{
    class StoringTransitionState : GoodsTransitionState
    {
        public StoringTransitionState(GoodsItem item, GoodsTransitionRepository repository) : base(item, repository)
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
            base.Store(areaId);
        }

        public override void WaitForUnload()
        {
            base.WaitForUnload();
        }

        public override void Unload()
        {
            throw new InvalidOperationException("GoodsItem is not waiting for unload yet");
        }

        public override void Reject(string reasoning)
        {
            throw new InvalidOperationException("Cannot reject already accepted");
        }
    }
}
