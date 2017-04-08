using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace StorehouseManager.Domain.Areas
{
    [ComplexType]
    public class Area  
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public Rectangle Rectangle { get; set; }
        public AreaType Type { get; set; }
    }
}
