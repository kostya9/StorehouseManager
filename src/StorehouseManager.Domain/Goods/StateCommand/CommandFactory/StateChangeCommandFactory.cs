using System;
using StorehouseManager.Domain.Goods.StateCommand.ConcreteCommand;
using StorehouseManager.Domain.Goods.TransitionLogs;

namespace StorehouseManager.Domain.Goods.StateCommand.CommandFactory
{
    // PATTERN(duplicate): factory method
    public class StateChangeCommandFactory
    {
        private readonly GoodsTransitionRepository _repository;

        public StateChangeCommandFactory(GoodsTransitionRepository repository)
        {
            _repository = repository;
        }

        public StateChangeCommand FromTransitionType(GoodsItem item, GoodsItemStatus status, string reasoning = "", int areaId = 0)
        {
            var log = new TransitionLog(_repository, item);
            switch (status)
            {
                case GoodsItemStatus.Arrived:
                    return new ArriveCommand(item, log);
                case GoodsItemStatus.Accepted:
                    return new AcceptCommand(item, log);
                case GoodsItemStatus.Storing:
                    return new StoreCommand(item, log, areaId);
                case GoodsItemStatus.WaitingForUnloading:
                    return new WaitingForUnloadCommand(item, log);
                case GoodsItemStatus.Unloaded:
                    return new UnloadCommand(item, log);
                case GoodsItemStatus.Removed:
                    return new RemoveCommand(item, log);
                case GoodsItemStatus.Rejected:
                    return new RejectCommand(item, log, reasoning);
                default:
                    throw new ArgumentException("Incorrect target state");

            }
        }
    }
}
