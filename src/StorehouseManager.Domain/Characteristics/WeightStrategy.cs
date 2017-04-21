namespace StorehouseManager.Domain.Characteristics
{

    // PATTERN: Strategy
    public abstract class WeightStrategy
    {
        public abstract double GetWeighted(double value);
    }
}
