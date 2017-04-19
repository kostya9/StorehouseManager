using System;
using System.Collections.Generic;
using System.Text;

namespace StorehouseManager.Domain.Goods
{
    // PATTERN: Facade
    public class GoodsItemService
    {
        private readonly GoodsRepository _repository;

        public GoodsItemService(GoodsRepository repository)
        {
            _repository = repository;
        }

        public GoodsItem Create(GoodsItem item)
        {
            return _repository.Add(item);
        }

        private GoodsItem GetItemById(int itemId, int userId)
        {
            return _repository.FindById(itemId, userId);
        }

        public void Arrive(int itemId, int userId)
        {
            var item = GetItemById(itemId, userId);
            item.TransitionState.Arrive();
            _repository.Update(item);
        }

        public void Accept(int itemId, int userId)
        {
            var item = GetItemById(itemId, userId);
            item.TransitionState.Accept();
            _repository.Update(item);
        }

        public void Store(int itemId, int areaId, int userId)
        {
            var item = GetItemById(itemId, userId);
            item.TransitionState.Store(areaId);
            _repository.Update(item);
        }

        public void WaitForUnload(int itemId, int userId)
        {
            var item = GetItemById(itemId, userId);
            item.TransitionState.WaitForUnload();
            _repository.Update(item);
        }

        public void Unload(int itemId, int userId)
        {
            var item = GetItemById(itemId, userId);
            item.TransitionState.Unload();
            _repository.Update(item);
        }

        public void Reject(int itemId, string reasoning, int userId)
        {
            var item = GetItemById(itemId, userId);
            item.TransitionState.Reject(reasoning);
            _repository.Update(item);
        }

        public void Remove(int itemId, int userId)
        {
            var item = GetItemById(itemId, userId);
            item.TransitionState.Remove();
            _repository.Update(item);
        }
    }
}
