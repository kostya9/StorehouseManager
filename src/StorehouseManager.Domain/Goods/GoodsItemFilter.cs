using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace StorehouseManager.Domain.Goods
{
    public class GoodsItemFilter
    {
        private readonly GoodsRepository _repository;

        public GoodsItemFilter(GoodsRepository repository)
        {
            _repository = repository;
        }

        private IEnumerable<GoodsItem> ByStatus(GoodsItemStatus status)
        {
            return _repository.FindAll().Where(gi => gi.Status == status);
        }

        public GoodsItem ById(int id)
        {
            return _repository.FindById(id);
        }

        public IEnumerable<GoodsItem> All()
        {
            return _repository.FindAll();
        }

        public IEnumerable<GoodsItem> Registered()
        {
            return ByStatus(GoodsItemStatus.Registered);
        }

        public IEnumerable<GoodsItem> Arrived()
        {
            return ByStatus(GoodsItemStatus.Arrived);
        }

        public IEnumerable<GoodsItem> Rejected()
        {
            return ByStatus(GoodsItemStatus.Rejected);
        }

        public IEnumerable<GoodsItem> Accepted()
        {
            return ByStatus(GoodsItemStatus.Accepted);
        }

        public IEnumerable<GoodsItem> Storing(int areaId)
        {
            return ByStatus(GoodsItemStatus.Storing).Where(gi => gi.AreaId == areaId);
        }

        public IEnumerable<GoodsItem> WaitingForUnload()
        {
            return ByStatus(GoodsItemStatus.WaitingForUnloading);
        }

        public IEnumerable<GoodsItem> Unloaded()
        {
            return ByStatus(GoodsItemStatus.Unloaded);
        }
    }
}
