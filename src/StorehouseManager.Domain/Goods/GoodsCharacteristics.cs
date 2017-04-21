using System;
using System.Collections.Generic;
using System.Text;
using StorehouseManager.Domain.Characteristics;

namespace StorehouseManager.Domain.Goods
{
    public class GoodsCharacteristics
    {
        private double _humidityLow;
        private double _humidityHigh;
        private double _temperatureLow;
        private double _temperatureHigh;
        private double _volume;
        public int Id { get; private set; }
        public int AreaId { get; private set; }

        public double TemperatureLow
        {
            get { return _temperatureLow; }
            set
            {
                CharacteristicsBoundary.VerifyTemperature(value);
                _temperatureLow = value;
            }
        }

        public double TemperatureHigh
        {
            get { return _temperatureHigh; }
            set
            {
                CharacteristicsBoundary.VerifyTemperature(value);
                _temperatureHigh = value;
            }
        }

        public double HumidityLow
        {
            get { return _humidityLow; }
            set
            {
                CharacteristicsBoundary.VerifyHumidity(value);
                _humidityLow = value;
            }
        }

        public double HumidityHigh
        {
            get { return _humidityHigh; }
            set
            {
                CharacteristicsBoundary.VerifyHumidity(value);
                _humidityHigh = value;
            }
        }

        public double Volume
        {
            get { return _volume; }
            set
            {
                CharacteristicsBoundary.VerifyVolume(value);
                _volume = value;
            }
        }

        public GoodsItem Area { get; private set; }
    }
}
