using System;
using System.Collections.Generic;
using System.Text;
using StorehouseManager.Domain.Characteristics.Weight;

namespace StorehouseManager.Domain.Characteristics
{
    public class AreaPropertyMark
    {
        private readonly WeightStrategy _weight;

        public AreaPropertyMark(MarkType mark, double value, WeightStrategy weight = null, string note = "")
        {
            _weight = weight;
            Mark = mark;
            Note = note;
            _value = value;
        }

        private readonly double _value;

        public MarkType Mark { get; }
        public string Note { get; }
        public double WeightedValue => _weight.GetWeighted(_value);
    }
}
