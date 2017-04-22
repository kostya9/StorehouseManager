using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using StorehouseManager.Domain.Goods;

namespace StorehouseManager.Domain.Areas
{
    public class AreaVolumeEstimate
    {
        private readonly GoodsRepository _goodsRepository;

        public AreaVolumeEstimate(GoodsRepository goodsRepository)
        {
            _goodsRepository = goodsRepository;
        }

        public double Calculate(Area area)
        {
            return _goodsRepository.GoodsItems.Where(gi => gi.AreaId == area.Id).Sum(gi => gi.Characteristics.Volume);
        }
    }
}
