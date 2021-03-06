﻿using PlantLuv.PlantOptions;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PlantLuv.Web.Models.Plants
{
    public class PlantTypeCreateViewModel
    {
		public int PlantTypeID { get; set; }
		[Required]
		public string LatinName { get; set; }
		[Required]
		public string CommonName { get; set; }
		[Required]
		public string StockImageID { get; set; }
		public string Description { get; set; }
		public DifficultyLevel Difficulty { get; set; }
		[Range(0, 100)]
		public int HumidityLowLevel { get; set; }
		[Range(0,100)]
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
		public string ScienceKingdom { get; set; }
		public string ScienceClade1 { get; set; }
		public string ScienceClade2 { get; set; }
		public string ScienceClade3 { get; set; }
		public string ScienceOrder { get; set; }
		public string ScienceFamily { get; set; }
		public string ScienceSubfamily { get; set; }
		public string ScienceGenus { get; set; }
	}
}
