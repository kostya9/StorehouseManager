using System;
using StorehouseManager.Domain.Goods.TransitionLogs;
using StorehouseManager.Domain.Goods.TransitionState.StateFactory;

namespace StorehouseManager.Domain.Goods.TransitionState
{
    // PATTERN: State
    public abstract class GoodsTransitionState
    {
        public GoodsItem Item { get; private set; }
        private IGoodsStateFactory _factory;

        protected GoodsTransitionState(GoodsItem item, IGoodsStateFactory stateFactory)
        {
            Item = item;
            _factory = stateFactory;
        }

        private void ChangeState(GoodsItemStatus state)
        {
            Item.Status = state;
            Item.LastTransition = DateTime.UtcNow;
            Item.TransitionState = _factory.FromGoods(Item);
        }


        public virtual void Arrive()
        {
           ChangeState(GoodsItemStatus.Arrived);
        }

        public virtual void Accept()
        {
            ChangeState(GoodsItemStatus.Accepted);
        }

        public virtual void Store(int areaId)
        {
            Item.AreaId = areaId;
            ChangeState(GoodsItemStatus.Storing);
        }

        public virtual void WaitForUnload()
        {
            Item.AreaId = null;
            ChangeState(GoodsItemStatus.WaitingForUnloading);
        }

        public virtual void Unload()
        {
            ChangeState(GoodsItemStatus.Unloaded);
        }

        public virtual void Reject(string reasoning)
        {
            ChangeState(GoodsItemStatus.Rejected);
        }

        public virtual void Remove()
        {
            ChangeState(GoodsItemStatus.Removed);
        }
    }
}
