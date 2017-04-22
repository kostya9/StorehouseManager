using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using StorehouseManager.Domain.Areas;
using StorehouseManager.Domain.Goods.TransitionLogs;
using StorehouseManager.Domain.Goods.TransitionState;

namespace StorehouseManager.Domain.Goods
{
    public class GoodsItem
    {
        public int Id { get; private set; }
        public string Name { get; set; }
        public string Shipper { get; set; }

        public int UserId { get; private set; }

        public GoodsItemStatus Status { get; set; }

        public int? AreaId { get; set; }
        public Area Area { get; private set; }

        public GoodsCharacteristics Characteristics { get; set; }

        public DateTime LastTransition { get; set; }

        public GoodsTransitionState TransitionState { get; set; }
        public ICollection<GoodsTransition> Transitions { get; set; }

        public GoodsItem(string name, string shipper, int userId, GoodsCharacteristics characteristics)
        {
            if (string.IsNullOrWhiteSpace(name))
                throw new ArgumentNullException(nameof(name));
            if(string.IsNullOrWhiteSpace(shipper))
                throw new ArgumentNullException(nameof(shipper));
            Name = name;
            UserId = userId;
            Shipper = shipper;
            Status = GoodsItemStatus.Registered;
            LastTransition = DateTime.UtcNow;
            Characteristics = characteristics;
        }

        protected GoodsItem()
        {
        }
    }
}
