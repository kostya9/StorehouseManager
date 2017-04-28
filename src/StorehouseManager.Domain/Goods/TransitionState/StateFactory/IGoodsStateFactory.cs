namespace StorehouseManager.Domain.Goods.TransitionState.StateFactory
{
    public interface IGoodsStateFactory
    {
        GoodsTransitionState FromGoods(GoodsItem item);
    }
}