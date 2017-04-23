using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace StorehouseManager.Domain.Characteristics
{
    public class AreaMark
    {
        public AreaMark(int areaId, IEnumerable<AreaPropertyMark> marks)
        {
            AreaId = areaId;
            Marks = marks;
        }

        public int AreaId { get; }
        public IEnumerable<AreaPropertyMark> Marks { get; }
        public double WeightedValue
        { 
            get
            {
                if (Marks.Any(am => am.Mark == MarkType.Danger))
                    return Double.MaxValue;

                return Marks.Sum(m => m.WeightedValue);
            }
        }
}
}
