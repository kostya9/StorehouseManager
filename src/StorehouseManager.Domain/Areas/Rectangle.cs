using System;
using System.Collections.Generic;
using System.Text;

namespace StorehouseManager.Domain.Areas
{
    public class Rectangle
    {
        public int Id { get; private set; }
        public double X { get; private set; }
        public double Y { get; private set; }
        public double Height { get; private set; }
        public double Width { get; private set; }

        public int AreaId { get; private set; }
        public Area Area { get; private set; }
    }
}
