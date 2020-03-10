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
		public SoilType SoilType { get; set; }
		public string FertilizerType { get; set; }  //Can this be an enum?
		public WaterType WaterType { get; set; }
		public int WateringFrequency { get; set; }
		public int StockImageId { get; set; }	//Is this the best way to track this field?

	}
}
