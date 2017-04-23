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

        private IEnumerable<GoodsItem> ByStatus(int userId, GoodsItemStatus status)
        {
            return _repository.FindAll(userId).Where(gi => gi.Status == status);
        }

        public GoodsItem ById(int id, int userId)
        {
            return _repository.FindById(id, userId);
        }

        public IEnumerable<GoodsItem> All(int userId)
        {
            return _repository.FindAll(userId);
        }

        public IEnumerable<GoodsItem> Registered(int userId)
        {
            return ByStatus(userId, GoodsItemStatus.Registered);
        }

        public IEnumerable<GoodsItem> Arrived(int userId)
        {
            return ByStatus(userId, GoodsItemStatus.Arrived);
        }

        public IEnumerable<GoodsItem> Rejected(int userId)
        {
            return ByStatus(userId, GoodsItemStatus.Rejected);
        }

        public IEnumerable<GoodsItem> Accepted(int userId)
        {
            return ByStatus(userId, GoodsItemStatus.Accepted);
        }

        public IEnumerable<GoodsItem> Storing(int areaId, int userId)
        {
            return ByStatus(userId, GoodsItemStatus.Storing).Where(gi => gi.AreaId == areaId);
        }

        public IEnumerable<GoodsItem> WaitingForUnload(int userId)
        {
            return ByStatus(userId, GoodsItemStatus.WaitingForUnloading);
        }

        public IEnumerable<GoodsItem> Unloaded(int userId)
        {
            return ByStatus(userId, GoodsItemStatus.Unloaded);
        }
    }
}
