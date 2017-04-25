using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using StorehouseManager.Domain.Areas;
using StorehouseManager.Domain.Characteristics;
using StorehouseManager.Domain.Goods.StateCommand;

namespace StorehouseManager.Domain.Goods
{
    // PATTERN: Facade
    public class GoodsItemService
    {
        private readonly GoodsRepository _repository;
        private readonly AreaRepository _areaRepository;
        private readonly StateChangeCommandFactory _factory;

        public GoodsItemService(GoodsRepository repository, AreaRepository areaRepository, StateChangeCommandFactory factory)
        {
            _repository = repository;
            _areaRepository = areaRepository;
            _factory = factory;
        }

        public GoodsItem Create(GoodsItem item)
        {
            return _repository.Add(item);
        }

        private GoodsItem GetItemById(int itemId)
        {
            return _repository.FindById(itemId);
        }

        public void ChangeState(GoodsItemStatus target, int itemId, int areaId = 0, string reasoning = null)
        {
            var item = GetItemById(itemId);
            var command = _factory.FromTransitionType(item, target, reasoning, areaId);
            command.Execute();
            _repository.Update(item);
        }

        public AreaMarkingReport MarkAreas(int goodsItemId, int userId)
        {
            var item = _repository.FindById(goodsItemId);

            var marker = new TransitionAreaMarker(item);

            var estimate = new AreaUsedVolumeEstimate(_repository);

            var areas = _areaRepository.FindAll()
                .Where(area => area.Type != AreaType.AreaEnter
                               && area.Type != AreaType.AreaExit)
                .Where(area => area.Id != (item.AreaId ?? 0)).ToList();

            return new AreaMarkingReport(
                areas.Select(area =>
                    marker.Mark(area, estimate.Calculate(area))));
        }
    }
}
