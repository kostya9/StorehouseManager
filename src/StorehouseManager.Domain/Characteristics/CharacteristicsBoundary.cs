using System;

namespace StorehouseManager.Domain.Characteristics
{
    static class CharacteristicsBoundary
    {
        public static void VerifyTemperature(double temperature)
        {
            if (temperature < LowestTemperature || temperature > HighestTemprature)
                throw new ArgumentException($"The temperature is out of bounds {{ {LowestTemperature}, {HighestTemprature} }}");
        }

        public static void VerifyHumidity(double humidity)
        {
            if (humidity > HighestHumidity || humidity < LowestHumidity)
                throw new ArgumentException($"Humidity can be only in range {{ {LowestHumidity}, {HighestHumidity} }}");
        }

        public static void VerifyVolume(double volume)
        {
            if (volume <= 0)
                throw new ArgumentException("Volume cannot be less than or equal to zero");
        }

        public static double HighestTemprature => 30;
        public static double LowestTemperature => -30;
        public static double HighestHumidity => 1;
        public static double LowestHumidity => 0;
    }
}
