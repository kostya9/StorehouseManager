using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using StorehouseManager.Domain.Goods;

namespace StorehouseManager.Domain.Areas
{
    public class Area  
    {
        public int Id { get; private set; }
        public int UserId { get; private set; }
        public string Name { get; set; }
        public AreaType Type { get; set; }

        public Rectangle Rectangle { get; private set; }
        public ICollection<GoodsItem> Items { get; private set; }

        public Area(int userId, string name, AreaType type, Rectangle rectangle)
        {
            UserId = userId;
            Name = name;
            Type = type;
            Rectangle = rectangle;
        }

        private Area()
        {
            
        }

        public static bool ShouldBeUnique(AreaType type)
        {
            if (type == AreaType.AreaSection)
                return false;
            return true;
        }
    }
}
