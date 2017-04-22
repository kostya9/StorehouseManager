using System;
using System.Collections.Generic;
using System.Text;

namespace StorehouseManager.Domain.Characteristics.Weight
{
    class TemperatureWeightStrategy : WeightStrategy
    {
        public override double GetWeighted(double value)
        {
            return value * 100 / (CharacteristicsBoundary.HighestTemprature - CharacteristicsBoundary.LowestTemperature);
        }
    }
}
