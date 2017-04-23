using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using StorehouseManager.Domain.Areas;

namespace StorehouseManager.Models
{
    public class AreaModel
    {
        public int Id { get; set; }
        public Rectangle Rectangle { get; set; }
        public string Name { get; set; }
        public AreaType Type { get; set; }

        public double Humidity { get; set; }
        public double Temperature { get; set; }
        public double Volume { get; set; }

        public double UsedVolume { get; set; }

        public static AreaModel FromArea(Area area, double usedVolume)
        {
            return new AreaModel
            {
                Id = area.Id,
                Name = area.Name,
                Rectangle = area.Rectangle,
                Type = area.Type,
                Humidity = area.Characteristics.Humidity,
                Temperature = area.Characteristics.Temperature,
                Volume = area.Characteristics.Volume,
                UsedVolume = usedVolume
            };
        }
    }
}
