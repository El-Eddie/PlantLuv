using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using PlantLuv.Plants;

namespace PlantLuv.Web.Models.Plants
{
	public class PlantUpdateViewModel
	{
		[MaxLength(255)]
		public string NickName { get; set; }
		[MaxLength(255)]
		public string WherePurchased { get; set; }
		[Required]
		public int TypeID { get; set; }
		public bool ReceiveNotifications { get; set; }
		public bool IsFavorite { get; set; }
		public string PrimaryImageID { get; set; }
	}
}
