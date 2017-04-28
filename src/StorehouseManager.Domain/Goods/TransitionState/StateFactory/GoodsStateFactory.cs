using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore.Metadata.Conventions.Internal;
using StorehouseManager.Domain.Goods.TransitionLogs;
using StorehouseManager.Domain.Goods.TransitionState.ConcreteState;

namespace StorehouseManager.Domain.Goods.TransitionState.StateFactory
{
    // PATTERN: Factory method
    // PATTERN: Singleton
    class GoodsStateFactory : IGoodsStateFactory
    {
        private GoodsStateFactory()
        {

        }

        private static GoodsStateFactory _instance;
        public static GoodsStateFactory Instance => _instance ?? (_instance = new GoodsStateFactory());

        public GoodsTransitionState FromGoods(GoodsItem item)
        {
            switch (item.Status)
            {
                case GoodsItemStatus.Registered:
                    return new RegisteredTransitionState(item, Instance);
                case GoodsItemStatus.Arrived:
                    return new ArrivedTransitionState(item, Instance);
                case GoodsItemStatus.Accepted:
                    return new AcceptedTransitionState(item, Instance);
                case GoodsItemStatus.Storing:
                    return new StoringTransitionState(item, Instance);
                case GoodsItemStatus.WaitingForUnloading:
                    return new WaitingForUnloadTransitionState(item, Instance);
                case GoodsItemStatus.Unloaded:
                    return new UnloadedTransitionState(item, Instance);
                case GoodsItemStatus.Rejected:
                     return new RejectedTransitionState(item, Instance);
                case  GoodsItemStatus.Removed:
                    return new RemovedTransitionState(item, Instance);
                default:
                    throw new ArgumentException("Incorrect status");
            }
        }
    }
}
