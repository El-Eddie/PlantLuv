
using System;
using System.ComponentModel.DataAnnotations;
using System.IO;
using System.Runtime.InteropServices.ComTypes;

namespace PlantLuv.Plants
{
	public class PlantType
	{
		[Key]
		public int TypeId { get; set; }
		public string LatinName { get; set; }
		public string CommonName { get; set; }
		public int StockImageID { get; set; }
		public string Description { get; set; }
		public Level Difficulty { get; set; }

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

		//Scientific Information

		public string ScienceKingdom { get; set; }
		public string ScienceClade1 { get; set; }
		public string ScienceClade2 { get; set; }
		public string ScienceClade3 { get; set; }
		public string ScienceOrder { get; set; }
		public string ScienceFamily { get; set;}
		public string ScienceSubfamily { get; set;}
		public string ScienceGenus { get; set; }
	}
}