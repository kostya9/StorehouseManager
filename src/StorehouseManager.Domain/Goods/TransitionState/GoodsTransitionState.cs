using System;
using StorehouseManager.Domain.Goods.TransitionLogs;

namespace StorehouseManager.Domain.Goods.TransitionState
{
    // PATTERN : State
    public abstract class GoodsTransitionState
    {
        private readonly GoodsTransitionRepository _repository;
        public GoodsItem Item { get; private set; }

        protected GoodsTransitionState(GoodsItem item, GoodsTransitionRepository repository)
        {
            _repository = repository;
            Item = item;
        }

        private void Log(GoodsItemStatus to)
        {
            _repository.Add(Item.Status, to, Item.Id);
            Item.LastTransition = DateTime.Now;
        }

        private void Log(GoodsItemStatus to, string note)
        {
            _repository.Add(Item.Status, to, Item.Id, note);
            Item.LastTransition = DateTime.Now;
        }

        private void LogChangeStoreLocation(int areaId)
        {
            _repository.Add(Item.Status, GoodsItemStatus.Storing, Item.Id, $"{Item.AreaId} -> {areaId}");
        }

        private void ChangeState(GoodsItemStatus state)
        {
            Item.Status = state;
            GoodsTransitionStateFactory factory = new GoodsTransitionStateFactory(_repository);
            Item.TransitionState = factory.FromGoods(Item);
        }

        public virtual void Arrive()
        {
           Log(GoodsItemStatus.Arrived);
           ChangeState(GoodsItemStatus.Arrived);
        }

        public virtual void Accept()
        {
            Log(GoodsItemStatus.Accepted);
            ChangeState(GoodsItemStatus.Accepted);
        }

        public virtual void Store(int areaId)
        {
            LogChangeStoreLocation(areaId);
            Item.AreaId = areaId;
            ChangeState(GoodsItemStatus.Storing);
        }

        public virtual void WaitForUnload()
        {
            Log(GoodsItemStatus.WaitingForUnloading);
            ChangeState(GoodsItemStatus.WaitingForUnloading);
        }

        public virtual void Unload()
        {
            Log(GoodsItemStatus.Unloaded);
            ChangeState(GoodsItemStatus.Unloaded);
        }

        public virtual void Reject(string reasoning)
        {
            Log(GoodsItemStatus.Rejected, reasoning);
            ChangeState(GoodsItemStatus.Rejected);
        }
    }
}
