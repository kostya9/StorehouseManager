using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace StorehouseManager.Domain.Characteristics
{
    public class AreaMarkingReport
    {
        public AreaMarkingReport(IEnumerable<AreaMark> marks)
        {
            Marks = marks;
        }

        public IEnumerable<AreaMark> Marks { get; }
        public double RecommendedAreaId => Marks.OrderBy(m => m.WeightedValue)
            .Where(m => m.Marks.All(mark => mark.Mark != MarkType.Danger))
            .DefaultIfEmpty(new AreaMark(-1, null)).First().AreaId;
    }
}
