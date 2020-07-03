using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PlantLuv;
using PlantLuv.Plants;
using PlantLuv.Web.Models;
using PlantLuv.Web.Models.Plants;

namespace PlantLuv.Web.ApiControllers
{
	[Route("api/plant")]
	public class UserPlantController : ControllerBase
	{

		private IPlantData _plantData;
		private ITypeData _typeData;
		//private IUrlHelper _urlHelper;
		public ILogger<UserPlantController> logger;

		public UserPlantController(
			IPlantData plantData,
			ITypeData typeData,
			//IUrlHelper urlHelper,
			ILogger<UserPlantController> logger
		)
		{
			this._plantData = plantData;
			this._typeData = typeData;
			//this._urlHelper = urlHelper;
			this.logger = logger;
		}


		[HttpPost("")]
		[ProducesResponseType(201, Type = typeof(PlantCreateViewModel))]
		[ProducesResponseType(422, Type = typeof(PlantCreateViewModel))]
		public IActionResult Create([FromBody] PlantCreateViewModel model)
		{

			if (!ModelState.IsValid)
				return UnprocessableEntity(new ValidationErrorModel(ModelState));

			PlantType type = _typeData.Get(model.TypeID);

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
			// TODO: get newly created plant and reurn that so we can confirm it has an ID
			return Created("", new PlantDisplayViewModel(plant));
		}


		private DateTime GetNextWater(DateTime date, PlantType type)
		{
			switch (type.WateringFrequency)
			{
				case WateringFrequency.Daily :
					return date.AddDays(1);
				case WateringFrequency.BiWeekly :
					return date.AddDays(3);
				case WateringFrequency.TriWeekly :
					return date.AddDays(2);
				case WateringFrequency.Weekly:
					return date.AddDays(7);
				case WateringFrequency.Fortnight:
					return date.AddDays(14);
				case WateringFrequency.Monthly:
					return date.AddDays(30);
				case WateringFrequency.SemiMonthly:
					return date.AddDays(30);
				default :
					return date.AddDays(2);
			}
		}


		private DateTime GetNextFeed(DateTime date, PlantType type)
		{
			switch (type.FertilizerFrequency)
			{
				case FertilizerFrequency.Weekly:
					return date.AddDays(7);
				case FertilizerFrequency.Fortnight:
					return date.AddDays(14);
				case FertilizerFrequency.Monthly:
					return date.AddDays(30);
				case FertilizerFrequency.SemiMonthly:
					return date.AddDays(61);
				default:
					return date.AddDays(30);
			}
		}
	}
}
