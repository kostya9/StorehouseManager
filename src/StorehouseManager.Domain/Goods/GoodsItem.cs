﻿using System;
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
        public string Shipper { get; private set; }

        public int UserId { get; private set; }

        public GoodsItemStatus Status { get; set; }

        public int? AreaId { get; set; }
        public Area Area { get; private set; }

        public DateTime LastTransition { get; set; }

        public GoodsTransitionState Transition { get; set; }
        public ICollection<GoodsTransition> Transitions { get; set; }

        public GoodsItem(string name, int userId)
        {
            if (string.IsNullOrWhiteSpace(name))
                throw new ArgumentNullException(nameof(name));
            Name = name;
            UserId = userId;
            Status = GoodsItemStatus.Registered;
        }

        private GoodsItem()
        {
            
        }
    }
}
