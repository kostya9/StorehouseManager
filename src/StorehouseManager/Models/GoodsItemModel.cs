using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StorehouseManager.Models
{
    public class GoodsItemModel
    {
        public int UserId { get; set; }
        public string Name { get; set; }
        public string Shipper { get; set; }
        public double TemperatureLow { get; set; }
        public double TemperatureHigh { get; set; }
        public double HumidityLow { get; set; }
        public double HumidityHigh { get; set; }
        public double Volume { get; set; }
    }
}
