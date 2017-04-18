using System;
using StorehouseManager.Domain.Goods.TransitionLogs;

namespace StorehouseManager.Domain.Goods.TransitionState
{
    class RegisteredTransitionState : GoodsTransitionState
    {
        public RegisteredTransitionState(GoodsItem item, GoodsTransitionRepository repository) : base(item, repository)
        {
        }

        public override void Arrive()
        {
            base.Arrive();
        }

        public override void Accept()
        {
            throw new InvalidOperationException("GoodsItem is not arrived");
        }

        public override void Store(int areaId)
        {
            throw new InvalidOperationException("GoodsItem is not arrived");
        }

        public override void WaitForUnload()
        {
            throw new InvalidOperationException("GoodsItem is not arrived");
        }

        public override void Unload()
        {
            throw new InvalidOperationException("GoodsItem is not arrived");
        }

        public override void Reject(string reasoning)
        {
            throw new InvalidOperationException("GoodsItem is not arrived");
        }
    }
}
