using System;
using System.Collections.Generic;
using System.Text;

namespace StorehouseManager.Domain.Goods
{
    public enum GoodsItemStatus
    {
        Registered, Arrived, Accepted, Storing, WaitingForUnloading, Unloaded,
        Rejected = -1, Removed = -2
    }
}
