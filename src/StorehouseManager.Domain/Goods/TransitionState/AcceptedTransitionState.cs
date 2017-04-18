using System;
using System.Collections.Generic;
using System.Text;
using StorehouseManager.Domain.Goods.TransitionLogs;

namespace StorehouseManager.Domain.Goods.TransitionState
{
    class AcceptedTransitionState : GoodsTransitionState
    {
        public AcceptedTransitionState(GoodsItem item, GoodsTransitionRepository repository) : base(item, repository)
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
            throw new InvalidOperationException("The GoodsItem is not stored");
        }
    }
}
