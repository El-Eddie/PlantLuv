using System;

namespace PlantLuv
{
	public class PlantType
	{
		public int PlantId { get; set; }
		public string LatinName { get; set; }
		public string CommonName { get; set; }
		public double HumidityLevel { get; set; }
		public LightLevel LightLevel { get; set; }
		public int LightTime { get; set; }
		public double SoilPh { get; set; }

	}
}
