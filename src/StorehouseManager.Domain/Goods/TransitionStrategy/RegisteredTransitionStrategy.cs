using System;
using System.Collections.Generic;
using System.Text;

namespace StorehouseManager.Domain.Goods.TransitionStrategy
{
    class RegisteredTransitionStrategy : GoodsTransitionStrategy
    {
        public RegisteredTransitionStrategy(GoodsItem item) : base(item)
        {
        }

        public override void Arrive()
        {
            throw new NotImplementedException();
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
