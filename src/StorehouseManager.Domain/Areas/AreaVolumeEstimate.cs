using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using StorehouseManager.Domain.Goods;

namespace StorehouseManager.Domain.Areas
{
    public class AreaUsedVolumeEstimate
    {
        private readonly GoodsRepository _goodsRepository;

        public AreaUsedVolumeEstimate(GoodsRepository goodsRepository)
        {
            _goodsRepository = goodsRepository;
        }

        public double Calculate(Area area)
        {
            return _goodsRepository.GoodsItems.Where(gi => gi.AreaId == area.Id).ToList().Sum(gi => gi.Characteristics.Volume);
        }
    }
}
