using System;

namespace PlantLuv
{
	public class PlantType
	{
		public int PlantID { get; set; }
		public string LatinName { get; set; }
		public string CommonName { get; set; }
		public double HumidityLevel { get; set; }
		public PlantType_LightLevel LightLevel { get; set; }
		public int LightTime { get; set; }
		public double SoilPh { get; set; }
		public PlantType_SoilPh SoilType { get; set; }
		public string FertilizerType { get; set; }  //Can this be an enum?
		public PlantType_Water WaterType { get; set; }
		public int WateringFrequency { get; set; }
		public int StockImageId { get; set; }	//Is this the best way to track this field?

	}
}
