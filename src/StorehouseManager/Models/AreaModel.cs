using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using StorehouseManager.Domain.Areas;

namespace StorehouseManager.Models
{
    public class AreaModel
    {
        public int Id { get; set; }
        public Rectangle Rectangle { get; set; }
        public string Name { get; set; }
        public AreaType Type { get; set; }
    }
}
