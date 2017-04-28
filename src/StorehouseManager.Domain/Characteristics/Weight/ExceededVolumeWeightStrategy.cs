using System;
using System.Collections.Generic;
using System.Text;

namespace StorehouseManager.Domain.Characteristics.Weight
{
    class ExceededVolumeWeightStrategy : WeightStrategy
    {
        public override double GetWeighted(double value)
        {
            return Double.MaxValue;
        }
    }
}
