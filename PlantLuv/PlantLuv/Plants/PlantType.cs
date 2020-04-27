
namespace PlantLuv.Plants
{
	public class Type
	{
		public int PlantID { get; set; }
		public string LatinName { get; set; }
		public string CommonName { get; set; }
		public double HumidityLevel { get; set; }
		public LightLevel LightLevel { get; set; }
		public int LightTime { get; set; }
		public double SoilPh { get; set; }
		public SoilPh SoilType { get; set; }
		public FertilizerFrequency FertilizerFrequency { get; set; }  
		public WaterType WaterType { get; set; }
		public int WateringFrequency { get; set; }
		public int StockImageID { get; set; }	//Is this the best way to track this field? This will be linked to an image we upload 
	}
}