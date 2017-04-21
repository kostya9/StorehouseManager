using System;
using System.Collections.Generic;
using System.Text;

namespace StorehouseManager.Domain.Areas
{
    public class AreaCharacteristics
    {
        private double _temperature;
        private double _humidity;
        public int Id { get; private set; }
        public int AreaId { get; private set; }
        public Area Area { get; private set; }

        public double Temperature
        {
            get { return _temperature; }
            set
            {
                if(value < LowestTemperature || value > HighestTemprature)
                    throw new ArgumentException("The temperature is out of bounds {-20, 20}");
                _temperature = value;
            }
        }

        public double Humidity
        {
            get { return _humidity; }
            set
            {
                if(value > 1 || value < 0)
                    throw new ArgumentException("Humidity can be only at range {0, 1}");
                _humidity = value;
            }
        }

        public static double DefaultTemperature => 25;
        public static double DefaultHumidity => 0.2;

        public static double HighestTemprature => 30;
        public static double LowestTemperature => -20;

        public AreaCharacteristics()
        {
            Temperature = DefaultTemperature;
            Humidity = DefaultHumidity;
        }

        public AreaCharacteristics(int areaId) : this()
        {
            AreaId = areaId;
        }
    }
}
