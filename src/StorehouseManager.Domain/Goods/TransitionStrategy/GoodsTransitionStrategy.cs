using System;
using StorehouseManager.Domain.Goods.GoodsTransitionLogs;

namespace StorehouseManager.Domain.Goods.TransitionStrategy
{
    public abstract class GoodsTransitionStrategy
    {
        private readonly GoodsTransitionRepository _repository;
        public GoodsItem Item { get; private set; }

        public GoodsTransitionStrategy(GoodsItem item, GoodsTransitionRepository repository)
        {
            _repository = repository;
            Item = item;
        }

        private void Log(GoodsItemStatus to)
        {
            _repository.Add(Item.Status, to, Item.Id);
        }

        private void LogChangeStoreLocation(int areaId)
        {
            _repository.Add(Item.Status, GoodsItemStatus.Storing, Item.Id);
        }

        public virtual void Arrive()
        {
           Log(GoodsItemStatus.Arrived);
        }

        public virtual void Accept()
        {
            Log(GoodsItemStatus.Accepted);
        }

        public virtual void Store(int areaId)
        {
            Log(GoodsItemStatus.Storing);
        }

        public virtual void WaitForUnload()
        {
            Log(GoodsItemStatus.WaitingForUnloading);    
        }

        public virtual void Unload()
        {
            Log(GoodsItemStatus.Unloaded);
        }
    }
}
