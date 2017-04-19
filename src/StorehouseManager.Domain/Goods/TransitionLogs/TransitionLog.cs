using System;
using System.Collections.Generic;
using System.Text;

namespace StorehouseManager.Domain.Goods.TransitionLogs
{
    public class TransitionLog
    {
        private readonly GoodsTransitionRepository _repository;
        private readonly GoodsItem _item;

        public TransitionLog(GoodsTransitionRepository repository, GoodsItem item)
        {
            _repository = repository;
            _item = item;
        }

        public void Log(GoodsItemStatus to)
        {
            _repository.Add(_item.Status, to, _item.Id);
            _item.LastTransition = DateTime.Now;
        }

        public void Log(GoodsItemStatus to, string note)
        {
            _repository.Add(_item.Status, to, _item.Id, note);
            _item.LastTransition = DateTime.Now;
        }

        public void LogChangeStoreLocation(int areaId)
        {
            _repository.Add(_item.Status, GoodsItemStatus.Storing, _item.Id, $"{_item.AreaId} -> {areaId}");
        }
    }
}
