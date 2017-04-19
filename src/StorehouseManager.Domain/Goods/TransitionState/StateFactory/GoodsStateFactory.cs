using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore.Metadata.Conventions.Internal;
using StorehouseManager.Domain.Goods.TransitionLogs;
using StorehouseManager.Domain.Goods.TransitionState.ConcreteState;

namespace StorehouseManager.Domain.Goods.TransitionState.StateFactory
{
    abstract class GoodsStateFactory
    {
        protected GoodsTransitionState FromGoods(GoodsItem item, TransitionLog log)
        {
            switch (item.Status)
            {
                case GoodsItemStatus.Registered:
                    return new RegisteredTransitionState(item, log);
                case GoodsItemStatus.Arrived:
                    return new ArrivedTransitionState(item, log);
                case GoodsItemStatus.Accepted:
                    return new AcceptedTransitionState(item, log);
                case GoodsItemStatus.Storing:
                    return new StoringTransitionState(item, log);
                case GoodsItemStatus.WaitingForUnloading:
                    return new WaitingForUnloadTransitionState(item, log);
                case GoodsItemStatus.Unloaded:
                    return new UnloadedTransitionState(item, log);
                case GoodsItemStatus.Rejected:
                     return new RejectedTransitionState(item, log);
                case  GoodsItemStatus.Removed:
                    return new RemovedTransitionState(item, log);
                default:
                    throw new ArgumentException("Incorrect status");
            }
        }

        public abstract GoodsTransitionState FromGoods(GoodsItem item);
    }
}
