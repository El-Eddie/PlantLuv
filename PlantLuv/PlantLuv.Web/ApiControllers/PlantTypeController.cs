using Microsoft.AspNetCore.Mvc;
using PlantLuv.Web.Models;
using PlantLuv.Web.Models.Plants;
using Microsoft.AspNetCore.Routing;
using PlantLuv.PlantOptions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using Newtonsoft.Json;
using System.Linq;
using NLog.LayoutRenderers.Wrappers;

namespace PlantLuv.Web.ApiControllers
{
    [Route("api/planttype")]
    public class PlantTypeController : ControllerBase
    {
		readonly IPlantData _plantData;
		readonly IUrlHelper _urlHelper;
		readonly IHttpContextAccessor _contextAccessor;
		public ILogger<PlantTypeController> logger;


		public PlantTypeController	(
			IPlantData plantData,
			IUrlHelper urlHelper,
			IHttpContextAccessor contextAccessor
		)
		{
			this._plantData = plantData;
			this._urlHelper = urlHelper;
			this._contextAccessor = contextAccessor;
			
		}
		//SEARCH
		[HttpGet("search")]
		[ProducesResponseType(404)]
		[ProducesResponseType(200, Type = typeof(PlantTypeDisplayViewModel))]
		public IActionResult Get([FromQuery] PlantTypeQueryParameters queryParams)
		{
			queryParams.Take = (queryParams.Take < 1 || queryParams.Take > 200) ? 50 : queryParams.Take;
			queryParams.PageIndex = (queryParams.PageIndex < 0) ? 0 : queryParams.PageIndex;

			List<PlantType> plantList = _plantData.Get(queryParams);

			if (plantList == null)
				return NotFound();

			IEnumerable<PlantTypeDisplayViewModel> models =
				plantList.Select(p => new PlantTypeDisplayViewModel(p));

			return Ok(models);
		}

		//CREATE NEW
		[HttpPost("")]
        public IActionResult Create([FromBody] PlantTypeCreateViewModel model)
        {
            if (!ModelState.IsValid)
                return UnprocessableEntity(new ValidationErrorModel(ModelState));

			PlantType plant = new PlantType

			{
				PlantTypeID = model.PlantTypeID,
				LatinName = model.LatinName,
				CommonName = model.CommonName,
				StockImageID = model.StockImageID,
				Description = model.Description,
				Difficulty = model.Difficulty,
				HumidityLowLevel = model.HumidityLowLevel,
				HumidityHighLevel = model.HumidityHighLevel,
				LightLevel = model.LightLevel,
				LightTime = model.LightTime,
				SoilPh = model.SoilPh,
				FertilizerFrequency = model.FertilizerFrequency,
				FertalizerType = model.FertalizerType,
				WateringFrequency = model.WateringFrequency,
				WaterType = model.WaterType,
				ToxicToCats = model.ToxicToCats,
				ToxicToDogs = model.ToxicToDogs,
				ToxicToSmallAnimals = model.ToxicToSmallAnimals,
				ScienceKingdom = model.ScienceKingdom,
				ScienceClade1 = model.ScienceClade1,
				ScienceClade2 = model.ScienceClade2,
				ScienceClade3 = model.ScienceClade3,
				ScienceOrder = model.ScienceOrder,
				ScienceFamily = model.ScienceFamily,
				ScienceSubfamily = model.ScienceSubfamily,
				ScienceGenus = model.ScienceGenus
			};

			_plantData.Add(plant);
			_plantData.Commit();
			return Created("", new PlantTypeDisplayViewModel(plant));

		}
		
		//DISPLAY 
		[HttpGet("{id}")]
		[ProducesResponseType(404)]
		[ProducesResponseType(200, Type = typeof(PlantTypeDisplayViewModel))]
		public IActionResult Get(int id)
		{
			PlantType plant = _plantData.GetPlantType(id);

			if (plant == null)
			{
				this.logger.LogWarning($"Plant number {id} was not found.");
				return NotFound();
			}
			return Ok(new PlantTypeDisplayViewModel(plant));
		}

		//UPDATE EXISTING
		[HttpPut("{id}")]
		public IActionResult Update(int id, [FromBody] PlantTypeUpdateViewModel model)
		{
			PlantType plant = _plantData.GetPlantType(id);
			if (plant == null)
				return NotFound();

			if (!ModelState.IsValid)
				return UnprocessableEntity(new ValidationErrorModel(ModelState));

			PlantType plantType = _plantData.GetPlantType(model.PlantTypeID);

			plant.LatinName = model.LatinName.Trim();
			plant.CommonName = model.CommonName.Trim();
			plant.StockImageID = model.StockImageID;
			plant.Description = model.Description;
			plant.Difficulty = model.Difficulty;
			plant.HumidityLowLevel = model.HumidityLowLevel;
			plant.HumidityHighLevel = model.HumidityHighLevel;
			plant.LightLevel = model.LightLevel;
			plant.LightTime = model.LightTime;
			plant.SoilPh = model.SoilPh;
			plant.FertilizerFrequency = model.FertilizerFrequency;
			plant.FertalizerType = model.FertalizerType;
			plant.WateringFrequency = model.WateringFrequency;
			plant.WaterType = model.WaterType;
			plant.ToxicToCats = model.ToxicToCats;
			plant.ToxicToDogs = model.ToxicToDogs;
			plant.ToxicToSmallAnimals = model.ToxicToSmallAnimals;
			plant.ScienceKingdom = model.ScienceKingdom.Trim();
			plant.ScienceClade1 = model.ScienceClade1.Trim();
			plant.ScienceClade2 = model.ScienceClade2.Trim();
			plant.ScienceClade3 = model.ScienceClade3.Trim();
			plant.ScienceOrder = model.ScienceOrder.Trim();
			plant.ScienceFamily = model.ScienceFamily.Trim();
			plant.ScienceSubfamily = model.ScienceSubfamily.Trim();
			plant.ScienceGenus = model.ScienceGenus.Trim();

			PlantTypeDisplayViewModel updated = new PlantTypeDisplayViewModel(plant);

			_plantData.Update(plant);
			_plantData.Commit();
			return Ok(updated);
		}
	}
}
