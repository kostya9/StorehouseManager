using System;
using StorehouseManager.Domain.Goods.TransitionLogs;
using StorehouseManager.Domain.Goods.TransitionState.StateFactory;

namespace StorehouseManager.Domain.Goods.TransitionState
{
    // PATTERN : State
    public abstract class GoodsTransitionState
    {
        private readonly TransitionLog _log;
        public GoodsItem Item { get; private set; }

        protected GoodsTransitionState(GoodsItem item, TransitionLog log)
        {
            _log = log;
            Item = item;
        }

        private void ChangeState(GoodsItemStatus state)
        {
            Item.Status = state;
            Item.LastTransition = DateTime.UtcNow;
            GoodsStateFactory factory = new GoodsLogStateFactory(_log);
            Item.TransitionState = factory.FromGoods(Item);
        }

        public virtual void Arrive()
        {
           _log.Log(GoodsItemStatus.Arrived);
           ChangeState(GoodsItemStatus.Arrived);
        }

        public virtual void Accept()
        {
            _log.Log(GoodsItemStatus.Accepted);
            ChangeState(GoodsItemStatus.Accepted);
        }

        public virtual void Store(int areaId)
        {
            _log.LogChangeStoreLocation(areaId);
            Item.AreaId = areaId;
            ChangeState(GoodsItemStatus.Storing);
        }

        public virtual void WaitForUnload()
        {
            _log.Log(GoodsItemStatus.WaitingForUnloading);
            ChangeState(GoodsItemStatus.WaitingForUnloading);
        }

        public virtual void Unload()
        {
            _log.Log(GoodsItemStatus.Unloaded);
            ChangeState(GoodsItemStatus.Unloaded);
        }

        public virtual void Reject(string reasoning)
        {
            _log.Log(GoodsItemStatus.Rejected, reasoning);
            ChangeState(GoodsItemStatus.Rejected);
        }

        public virtual void Remove()
        {
            _log.Log(GoodsItemStatus.Removed);
            ChangeState(GoodsItemStatus.Removed);
        }
    }
}
