using System.Collections.Generic;
using System.Linq;
using StorehouseManager.Domain.Areas;
using StorehouseManager.Domain.Characteristics.Weight;
using StorehouseManager.Domain.Goods;

namespace StorehouseManager.Domain.Characteristics
{
    public class TransitionAreaMarker
    {
        private readonly GoodsItem _item;

        public TransitionAreaMarker(GoodsItem item)
        {
            _item = item;
        }

        private double GetExceededVolume(Area area, double storedVoulume)
        {
            return storedVoulume + _item.Characteristics.Volume - area.Characteristics.Volume;
        }

        private double GetHumidityHighDelta(Area area)
        {
            return area.Characteristics.Humidity - _item.Characteristics.HumidityHigh;
        }

        private double GetHumidityLowDelta(Area area)
        {
            return _item.Characteristics.HumidityLow - area.Characteristics.Humidity;
        }

        private double GetTemperatureHighDelta(Area area)
        {
            return area.Characteristics.Temperature - _item.Characteristics.TemperatureHigh;
        }

        private double GetTemperatureLowDelta(Area area)
        {
            return _item.Characteristics.TemperatureLow - area.Characteristics.Temperature;
        }

        private IEnumerable<AreaMark> UnacceptableMarks(Area area, double storedVolume)
        {
            if (_item.Characteristics.Volume + storedVolume > area.Characteristics.Volume)
                yield return new AreaMark(MarkType.Danger, GetExceededVolume(area, storedVolume), 
                    new VolumeWeightStrategy(), $"The volume of the are will be exceeded by {GetExceededVolume(area, storedVolume)} m^3$");

            if (area.Characteristics.Humidity > _item.Characteristics.HumidityHigh)
                yield return new AreaMark(MarkType.Warning, GetHumidityHighDelta(area),
                    new HumidityWeightStrategy(),"The humidity of the area is too high");

            else if (area.Characteristics.Humidity < _item.Characteristics.HumidityLow)
                yield return new AreaMark(MarkType.Warning, GetHumidityLowDelta(area),
                    new HumidityWeightStrategy(), "The humidity of the area is too low"));

            if (area.Characteristics.Temperature > _item.Characteristics.TemperatureHigh)
                yield return new AreaMark(MarkType.Warning, GetTemperatureHighDelta(area),
                    new TemperatureWeightStrategy(), "The humidity of the area is too high");
            else if (area.Characteristics.Temperature < _item.Characteristics.TemperatureLow)
                yield return new AreaMark(MarkType.Warning, GetTemperatureLowDelta(area),
                    new TemperatureWeightStrategy(), "The humidity of the area is too low");
        }

        public IEnumerable<AreaMark> Mark(Area area, double storedVolume)
        {

            var marks = UnacceptableMarks(area, storedVolume).ToArray();

            if (!marks.Any())
                return new[]{AreaMark.Acceptable};

            return marks;

        }
    }
}
