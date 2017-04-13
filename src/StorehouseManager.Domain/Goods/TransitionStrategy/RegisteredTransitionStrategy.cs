using System;
using System.Collections.Generic;
using System.Text;
using StorehouseManager.Domain.Goods.GoodsTransitionLogs;

namespace StorehouseManager.Domain.Goods.TransitionStrategy
{
    class RegisteredTransitionStrategy : GoodsTransitionStrategy
    {
        public RegisteredTransitionStrategy(GoodsItem item, GoodsTransitionRepository repository) : base(item, repository)
        {
        }

        public override void Arrive()
        {
            Item.Status = GoodsItemStatus.Arrived;
        }

        public override void Accept()
        {
            throw new NotImplementedException();
        }

        public override void Store(int areaId)
        {
            throw new NotImplementedException();
        }

        public override void WaitForUnload()
        {
            throw new NotImplementedException();
        }

        public override void Unload()
        {
            throw new NotImplementedException();
        }
    }
}
