using System;
using System.Collections.Generic;
using System.Text;

namespace StorehouseManager.Domain.Areas
{
    public class Rectangle
    {
        public int Id { get; set; }
        public double X { get; set; }
        public double Y { get; set; }
        public double Height { get; set; }
        public double Width { get; set; }

        public int AreaId { get; set; }
        public Area Area { get; set; }
    }
}
