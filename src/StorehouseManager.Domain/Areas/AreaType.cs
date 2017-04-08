using System;
using System.Collections.Generic;
using System.Text;

namespace StorehouseManager.Domain.Areas
{
    public enum AreaType
    {
        AreaSection, AreaEnter, AreaExit
    }

    public static class AreaTypeHelper
    {
        public static AreaType FromString(string areaType)
        {
            switch (areaType)
            {
                case "AREA_SECTION":
                    return AreaType.AreaSection;
                case "AREA_ENTER":
                    return AreaType.AreaEnter;
                case "AREA_EXIT":
                    return AreaType.AreaExit;
                default:
                    throw new ArgumentException($"There is no such AreaType ({areaType})");
            }
        }
    }
}
