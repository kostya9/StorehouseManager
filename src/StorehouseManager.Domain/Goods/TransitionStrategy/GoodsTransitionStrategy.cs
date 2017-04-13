using System;

namespace StorehouseManager.Domain.Goods.TransitionStrategy
{
    public abstract class GoodsTransitionStrategy
    {
        public GoodsItem Item { get; private set; }

        protected GoodsTransitionStrategy(GoodsItem item)
        {
            Item = item;
        }

        public abstract void Arrive();
        public abstract void Accept();
        public abstract void Store(int areaId);
        public abstract void WaitForUnload();
        public abstract void Unload();

        public static GoodsTransitionStrategy FromGoods(GoodsItem item)
        {
            switch (item.Status)
            {
                case GoodsItemStatus.Registered:
                    return new RegisteredTransitionStrategy(item);
                default:
                    throw new NotImplementedException();
            }
        }
    }
}
