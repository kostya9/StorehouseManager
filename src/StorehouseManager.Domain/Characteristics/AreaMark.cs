using System;
using System.Collections.Generic;
using System.Text;
using StorehouseManager.Domain.Characteristics.Weight;

namespace StorehouseManager.Domain.Characteristics
{
    public class AreaMark
    {
        private readonly WeightStrategy _weight;

        public AreaMark(MarkType mark, double value, WeightStrategy weight = null, string note = "")
        {
            _weight = weight;
            Mark = mark;
            Note = note;
            _value = value;
        }

        public static AreaMark Acceptable => new AreaMark(MarkType.Acceptable, 0, new AcceptedWeightStrategy());

        private readonly double _value;

        public MarkType Mark { get; }
        public string Note { get; }
        public double WeightedValue => _weight.GetWeighted(_value);

        private class AcceptedWeightStrategy : WeightStrategy
        {
            public override double GetWeighted(double value)
            {
                return Double.MinValue;
            }
        }
    }
}
