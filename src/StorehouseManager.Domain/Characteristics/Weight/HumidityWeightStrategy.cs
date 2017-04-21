using System;
using System.Collections.Generic;
using System.Text;

namespace StorehouseManager.Domain.Characteristics.Weight
{
    class HumidityWeightStrategy : WeightStrategy
    {
        public override double GetWeighted(double value)
        {
            return value * 100;
        }
    }
}
