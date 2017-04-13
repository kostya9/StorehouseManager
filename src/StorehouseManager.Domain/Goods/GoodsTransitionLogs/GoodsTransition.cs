using System;

namespace StorehouseManager.Domain.Goods.GoodsTransitionLogs
{
    public class GoodsTransition
    {
        public int Id { get; private set; }

        public int GoodsItemId { get; private set; }
        public GoodsItem GoodsItem { get; private set; }

        public GoodsItemStatus From { get; private set; }
        public GoodsItemStatus To { get; private set; }
        public DateTime TimeStamp { get; private set; }
        public string Note { get; private set; }

        public GoodsTransition(GoodsItemStatus @from, GoodsItemStatus to, int goodsItemId)
        {
            From = from;
            To = to;
            TimeStamp = DateTime.UtcNow;
            GoodsItemId = goodsItemId;
        }

        public GoodsTransition(GoodsItemStatus @from, GoodsItemStatus to, int goodsItemId, string note)
        {
            From = from;
            To = to;
            TimeStamp = DateTime.UtcNow;
            GoodsItemId = goodsItemId;
            Note = note;
        }

        private GoodsTransition()
        {
            
        }
    }
}
