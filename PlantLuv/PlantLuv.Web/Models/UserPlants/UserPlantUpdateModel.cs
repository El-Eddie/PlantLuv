using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PlantLuv.Web.Models.Plants
{
	/// This model is created by the WaterPlants or FeedPlants methods on the UserPlant controller and is used when watering or feeding one or multiple plants.
	public class UserPlantUpdateModel
	{
		/// Array of plant IDs to be watered or fertalized.	
		[Required]
		public int[] PlantIdArray { get; set; }

		/// Date/time that the plant(s) are being marked as either watered or fertalized.	
		[Required]
		[DataType(DataType.Date)]
		public DateTime TimeStamp { get; set; }

	}
}
