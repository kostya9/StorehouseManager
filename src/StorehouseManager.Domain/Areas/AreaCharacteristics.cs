using System;
using System.Collections.Generic;
using System.Text;
using StorehouseManager.Domain.Characteristics;

namespace StorehouseManager.Domain.Areas
{
    public class AreaCharacteristics
    {
        private double _temperature;
        private double _humidity;
        private double _volume;
        public int Id { get; private set; }
        public int AreaId { get; private set; }
        public Area Area { get; private set; }

        public double Temperature
        {
            get { return _temperature; }
            set
            {
                CharacteristicsBoundary.VerifyTemperature(value);
                _temperature = value;
            }
        }

        public double Humidity
        {
            get { return _humidity; }
            set
            {
                CharacteristicsBoundary.VerifyHumidity(value);
                _humidity = value;
            }
        }

        // In m^3
        public double Volume
        {
            get { return _volume; }
            set
            {
                CharacteristicsBoundary.VerifyVolume(value);
                _volume = value;
            }
        }

        public static double DefaultTemperature => 25;
        public static double DefaultHumidity => 0.2;
        public static double DefaultVolume => 1;


        public AreaCharacteristics()
        {
            Temperature = DefaultTemperature;
            Humidity = DefaultHumidity;
            Volume = DefaultVolume;
        }

        public AreaCharacteristics(int areaId) : this()
        {
            AreaId = areaId;
        }
    }
}
