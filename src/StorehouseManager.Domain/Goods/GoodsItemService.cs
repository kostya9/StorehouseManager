using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using StorehouseManager.Domain.Areas;
using StorehouseManager.Domain.Characteristics;

namespace StorehouseManager.Domain.Goods
{
    // PATTERN: Facade
    public class GoodsItemService
    {
        private readonly GoodsRepository _repository;
        private readonly AreaRepository _areaRepository;

        public GoodsItemService(GoodsRepository repository, AreaRepository areaRepository)
        {
            _repository = repository;
            _areaRepository = areaRepository;
        }

        public GoodsItem Create(GoodsItem item)
        {
            return _repository.Add(item);
        }

        private GoodsItem GetItemById(int itemId, int userId)
        {
            return _repository.FindById(itemId, userId);
        }

        public void ChangeState(GoodsItemStatus target, int itemId, int userId, int areaId = 0, string reasoning = null)
        {
            var item = GetItemById(itemId, userId);
            switch (target)
            {
                case GoodsItemStatus.Arrived:
                    item.TransitionState.Arrive();
                    break;
                case GoodsItemStatus.Accepted:
                    item.TransitionState.Accept();
                    break;
                case GoodsItemStatus.Storing:
                    item.TransitionState.Store(areaId);
                    break;
                case GoodsItemStatus.WaitingForUnloading:
                    item.TransitionState.WaitForUnload();
                    break;
                case GoodsItemStatus.Unloaded:
                    item.TransitionState.Unload();
                    break;
                case GoodsItemStatus.Removed:
                    item.TransitionState.Remove();
                    break;
                case GoodsItemStatus.Rejected:
                    item.TransitionState.Reject(reasoning);
                    break;
                default:
                    throw new ArgumentException("Incorrect target state");

            }
            _repository.Update(item);
        }

        public AreaMarkingReport MarkAreas(int goodsItemId, int userId)
        {
            var item = _repository.FindById(goodsItemId, userId);

            var marker = new TransitionAreaMarker(item);

            var estimate = new AreaUsedVolumeEstimate(_repository);

            return new AreaMarkingReport(_areaRepository.FindAll(userId)
                .Where(area => area.Id != item.Id).ToList()
                .Select(area =>
                    marker.Mark(area, estimate.Calculate(area))));
        }
    }
}
