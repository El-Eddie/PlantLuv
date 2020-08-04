
using System.ComponentModel.DataAnnotations;

namespace PlantLuv.Plants
{
	public class PlantType
	{
		[Key]
		public int TypeId { get; set; }
		public string LatinName { get; set; }
		public string CommonName { get; set; }
		public string Family { get; set; }
		public string StockImageID { get; set; }   //Is this the best way to track this field? This will be linked to an image we upload 
		public string Description { get; set; }
		public Level Dificulty { get; set; }
		
		public Level HumidityLevel { get; set; }
		public Level LightLevel { get; set; }
		public int LightTime { get; set; }
		public double SoilPh { get; set; }
		public SoilType SoilType { get; set; }

		public FertilizerFrequency FertilizerFrequency { get; set; }
		public FertalizerType FertalizerType { get; set; }
		public WateringFrequency WateringFrequency { get; set; }
		public WaterType WaterType { get; set; }

		public bool ToxicToCats { get; set; }
		public bool ToxicToDogs { get; set; }
		public bool ToxicToSmallAnimals { get; set; }
		public bool ToxicToHumans { get; set; }
	}
}