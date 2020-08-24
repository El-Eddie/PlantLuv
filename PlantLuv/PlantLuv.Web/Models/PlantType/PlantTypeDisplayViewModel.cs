using PlantLuv.PlantOptions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlantLuv.Web.Models.Plants
{
    public class PlantTypeDisplayViewModel
    {
		public int PlantTypeID { get; set; }
		public string LatinName { get; set; }
		public string CommonName { get; set; }
		public string StockImageID { get; set; }
		public string Description { get; set; }
		public DifficultyLevel Difficulty { get; set; }
		public int HumidityLowLevel { get; set; }
		public int HumidityHighLevel { get; set; }
		public LightLevel LightLevel { get; set; }
		public LightTime? LightTime { get; set; }
		public double? SoilPh { get; set; }
		public SoilType SoilType { get; set; }
		public FertilizerFrequency? FertilizerFrequency { get; set; }
		public FertalizerType FertalizerType { get; set; }
		public WateringFrequency? WateringFrequency { get; set; }
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
		public string ScienceFamily { get; set; }
		public string ScienceSubfamily { get; set; }
		public string ScienceGenus { get; set; }

		public PlantTypeDisplayViewModel(PlantType plant)
        {
			this.PlantTypeID = plant.PlantTypeID;
			this.LatinName = plant.LatinName;
			this.CommonName = plant.CommonName;
			this.StockImageID = plant.StockImageID;
			this.Description = plant.Description;
			this.Difficulty = plant.Difficulty;
			this.HumidityLowLevel = plant.HumidityLowLevel;
			this.HumidityHighLevel = plant.HumidityHighLevel;
			this.LightLevel = plant.LightLevel;
			this.LightTime = plant.LightTime;
			this.SoilPh = plant.SoilPh;
			this.FertilizerFrequency = plant.FertilizerFrequency;
			this.FertalizerType = plant.FertalizerType;
			this.WateringFrequency = plant.WateringFrequency;
			this.WaterType = plant.WaterType;
			this.ToxicToCats = plant.ToxicToCats;
			this.ToxicToDogs = plant.ToxicToDogs;
			this.ToxicToSmallAnimals = plant.ToxicToSmallAnimals;
			this.ScienceKingdom = plant.ScienceKingdom;
			this.ScienceClade1 = plant.ScienceClade1;
			this.ScienceClade2 = plant.ScienceClade2;
			this.ScienceClade3 = plant.ScienceClade3;
			this.ScienceOrder = plant.ScienceOrder;
			this.ScienceFamily = plant.ScienceFamily;
			this.ScienceSubfamily = plant.ScienceSubfamily;
			this.ScienceGenus = plant.ScienceGenus;
        }
	}
}
