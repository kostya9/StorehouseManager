using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore.Metadata.Conventions.Internal;
using StorehouseManager.Domain.Goods.TransitionLogs;
using StorehouseManager.Domain.Goods.TransitionState.ConcreteState;

namespace StorehouseManager.Domain.Goods.TransitionState.StateFactory
{
    // PATTERN: factory method
    class GoodsStateFactory
    {
        public GoodsTransitionState FromGoods(GoodsItem item)
        {
            switch (item.Status)
            {
                case GoodsItemStatus.Registered:
                    return new RegisteredTransitionState(item);
                case GoodsItemStatus.Arrived:
                    return new ArrivedTransitionState(item);
                case GoodsItemStatus.Accepted:
                    return new AcceptedTransitionState(item);
                case GoodsItemStatus.Storing:
                    return new StoringTransitionState(item);
                case GoodsItemStatus.WaitingForUnloading:
                    return new WaitingForUnloadTransitionState(item);
                case GoodsItemStatus.Unloaded:
                    return new UnloadedTransitionState(item);
                case GoodsItemStatus.Rejected:
                     return new RejectedTransitionState(item);
                case  GoodsItemStatus.Removed:
                    return new RemovedTransitionState(item);
                default:
                    throw new ArgumentException("Incorrect status");
            }
        }
    }
}
