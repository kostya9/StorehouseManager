using System;
using System.Collections.Generic;
using System.Text;

namespace StorehouseManager.Domain.Characteristics.Weight
{
    class AvailableVolumeWeightStrategy : WeightStrategy
    {
        public override double GetWeighted(double value)
        {
            return -value;
        }
    }
}
