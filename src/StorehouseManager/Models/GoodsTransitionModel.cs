using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StorehouseManager.Models
{
    public class GoodsTransitionModel
    {
        public int Id { get; set; }
        public DateTime TransitionTime { get; set; }
        public string From { get; set; }
        public string To { get; set; }
        public string Note { get; set; }
    }
}
