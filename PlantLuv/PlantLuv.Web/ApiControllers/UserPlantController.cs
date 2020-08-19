using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Routing;
using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PlantLuv;
using PlantLuv.PlantOptions;
using PlantLuv.Web.Models;
using PlantLuv.Web.Models.Plants;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Http;

namespace PlantLuv.Web.ApiControllers
{
	[Route("api/plants")]
	public class UserPlantController : ControllerBase
	{
		readonly IPlantData _plantData;
		readonly IUrlHelper _urlHelper;
		readonly IHttpContextAccessor _contextAccessor;
		public ILogger<UserPlantController> logger;

		public UserPlantController(
			IPlantData plantData,
			IUrlHelper urlHelper,
			IHttpContextAccessor contextAccessor,
			ILogger<UserPlantController> logger
		)
		{
			this._plantData = plantData;
			this._urlHelper = urlHelper;
			this._contextAccessor = contextAccessor;
			this.logger = logger;
		}


		[HttpGet("search")]
		[ProducesResponseType(404)]
		[ProducesResponseType(200, Type = typeof(UserPlantDisplayViewModel))]
		public IActionResult Get([FromQuery] PlantQueryParameters queryParams)
		{
			queryParams.Take = (queryParams.Take < 1 || queryParams.Take > 200) ? 50 : queryParams.Take;
			queryParams.PageIndex = (queryParams.PageIndex < 0) ? 0 : queryParams.PageIndex;

			List<UserPlant> plantList = _plantData.Get(queryParams);

			if (plantList == null)
				return NotFound();

			IEnumerable<UserPlantDisplayViewModel> models =
				plantList.Select(p => new UserPlantDisplayViewModel(p));

			PaginationModel nextPreviousQuary = new PaginationModel
			{
				Next = GetNextPreviousURL(queryParams, 1),
				Previous = GetNextPreviousURL(queryParams, -1)
			};

			Response.Headers.Add(
				"x-Pagination", JsonConvert.SerializeObject(nextPreviousQuary)
			);

			return Ok(models);
		}
		

		[HttpGet("{id}")]
		[ProducesResponseType(404)]
		[ProducesResponseType(200, Type = typeof(UserPlantDisplayViewModel))]
		public IActionResult Get(int id)
		{
			UserPlant plant = _plantData.Get(id);

			if ( plant == null)
			{
				this.logger.LogWarning($"Plant number {id} was not found.");
				return NotFound();
			}
			return Ok( new UserPlantDisplayViewModel(plant) );
		}


		[HttpPost("")]
		[ProducesResponseType(201, Type = typeof(UserPlantDisplayViewModel))]
		[ProducesResponseType(422, Type = typeof(ValidationErrorModel))]
		public IActionResult Create([FromBody] UserPlantCreateViewModel model)
		{

			if (!ModelState.IsValid)
				return UnprocessableEntity(new ValidationErrorModel(ModelState));

			PlantType type = _plantData.GetPlantType(model.PlantTypeID);

			UserPlant plant = new UserPlant
			{
				OwnerID = model.OwnerID,
				NickName = model.NickName,
				WherePurchased = model.WherePurchased,
				PlantType = type,
				LastWatered = model.LastWatered,
				WaterAgain = GetNextWater(model.LastWatered, type),
				LastFertalized = model.LastFertalized,
				FertalizeAgain = GetNextFeed(model.LastFertalized, type),
				Birtdhday = model.Birthday,
				IsDeleted = false,
				ReceiveNotifications = model.ReceiveNotifications,
				IsFavorite = false,
				PrimaryImageID = type.StockImageID	// Change to select image thumbnail when file upload is implemented.
			};

			_plantData.Add(plant);
			_plantData.Commit();
			return Created("", new UserPlantDisplayViewModel(plant));
		}

		
		[HttpPost("{id}")]
		[ProducesResponseType(404)]
		[ProducesResponseType(200, Type = typeof(UserPlantDisplayViewModel))]
		[ProducesResponseType(422, Type = typeof(ValidationErrorModel))]
		public IActionResult Update(int id, [FromBody]UserPlantUpdateViewModel model)
		{
			UserPlant plant = _plantData.Get(id);
			if (plant == null)
				return NotFound();

			if (!ModelState.IsValid)
				return UnprocessableEntity(new ValidationErrorModel(ModelState));

			PlantType plantType = _plantData.GetPlantType(model.TypeID);

			plant.NickName = model.NickName;
			plant.WherePurchased = model.WherePurchased;
			plant.PlantType = plantType;
			plant.ReceiveNotifications = model.ReceiveNotifications;
			plant.IsFavorite = model.IsFavorite;
			plant.PrimaryImageID = model.PrimaryImageID;

			UserPlantDisplayViewModel updated = new UserPlantDisplayViewModel(plant);

			_plantData.Update(plant);
			_plantData.Commit();
			return Ok(updated);
		}


		[HttpPatch("feed")]
		[ProducesResponseType(404)]
		[ProducesResponseType(200, Type = typeof(UserPlantUpdateViewModel))]
		[ProducesResponseType(422, Type = typeof(ValidationErrorModel))]
		public IActionResult FeedPlants([FromBody]UserPlantUpdateModel model)
		{
			if (!ModelState.IsValid)
			return UnprocessableEntity(new ValidationErrorModel(ModelState));

			List<UserPlant> plantList = _plantData.Get(model.PlantIdArray).ToList();

			if (plantList == null)
				return NotFound();

			foreach(UserPlant plant in plantList)
			{
				plant.LastFertalized = model.TimeStamp;
				plant.FertalizeAgain = GetNextFeed(
					model.TimeStamp, plant.PlantType);
				_plantData.Update(plant);
			}

			IEnumerable<UserPlantDisplayViewModel> models =
				plantList.Select(p => new UserPlantDisplayViewModel(p));
			_plantData.Commit();
			return Ok(models);
		}


		[HttpPatch("water")]
		[ProducesResponseType(404)]
		[ProducesResponseType(200, Type = typeof(UserPlantUpdateViewModel))]
		[ProducesResponseType(422, Type = typeof(ValidationErrorModel))]
		public IActionResult WaterPlants([FromBody]UserPlantUpdateModel model)
		{
			if (!ModelState.IsValid)
				return UnprocessableEntity(new ValidationErrorModel(ModelState));

			List<UserPlant> plantList = _plantData.Get(model.PlantIdArray).ToList();

			if (plantList == null)
				return NotFound();

			foreach (UserPlant plant in plantList)
			{
				// TODO: add error handling.
				//desired behavior is that if one fails, the commit does not run
				plant.LastWatered = model.TimeStamp;
				plant.WaterAgain = GetNextWater(
					model.TimeStamp, plant.PlantType);
				_plantData.Update(plant);
			}

			IEnumerable<UserPlantDisplayViewModel> models =
				plantList.Select(p => new UserPlantDisplayViewModel(p));
			_plantData.Commit();
			return Ok(models);
		}


		[HttpDelete("{id}")]
		[ProducesResponseType(204)]
		[ProducesResponseType(404)]
		public IActionResult Delete(int id)
		{
			UserPlant plant = _plantData.Get(id);

			if (plant == null)
			{
				this.logger.LogWarning($"Plant number {id} was not found.");
				return NotFound();
			}
			_plantData.Delete(plant);
			_plantData.Commit();
			return NoContent();
		}


		private DateTime GetNextWater(DateTime date, PlantType plantType)
		{
			return plantType.WateringFrequency switch
			{
				WateringFrequency.Daily => date.AddDays(1),
				WateringFrequency.BiWeekly => date.AddDays(3),
				WateringFrequency.TriWeekly => date.AddDays(2),
				WateringFrequency.Weekly => date.AddDays(7),
				WateringFrequency.Fortnight => date.AddDays(14),
				WateringFrequency.Monthly => date.AddDays(30),
				WateringFrequency.SemiMonthly => date.AddDays(30),
				_ => date.AddDays(2),
			};
		}


		private DateTime GetNextFeed(DateTime date, PlantType plantType)
		{
			return plantType.FertilizerFrequency switch
			{
				FertilizerFrequency.Weekly => date.AddDays(7),
				FertilizerFrequency.Fortnight => date.AddDays(14),
				FertilizerFrequency.Monthly => date.AddDays(30),
				FertilizerFrequency.SemiMonthly => date.AddDays(61),
				_ => date.AddDays(30),
			};
		}


		private string GetNextPreviousURL(PlantQueryParameters queryParams, int direction)
		{
			PlantQueryParameters newParams = new PlantQueryParameters(queryParams);

			// direction is expected to be 1 or -1
			newParams.PageIndex += direction;

			// Line temporarily in place to return a valid link.
			return _urlHelper.Content("api/plant/search");
			//return _urlHelper.Link("search", newParams);


		}
	}
}
