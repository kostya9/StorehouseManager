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
    }
}
