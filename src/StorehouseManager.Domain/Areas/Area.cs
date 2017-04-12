using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace StorehouseManager.Domain.Areas
{
    public class Area  
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Name { get; set; }
        public AreaType Type { get; set; }

        public Rectangle Rectangle { get; set; }
        public int RectangleId { get; set; }

        public static bool ShouldBeUnique(AreaType type)
        {
            if (type == AreaType.AreaSection)
                return false;
            return true;
        }
    }
}
