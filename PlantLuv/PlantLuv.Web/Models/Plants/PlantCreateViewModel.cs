using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace PlantLuv.Web.Models.Plants
{
	public class PlantCreateViewModel
	{
		[Required]
		public string OwnerID { get; set; }
//		[Required, MaxLength(255)]
//		public string PlantType { get; set; }
//	exists because it's on the NewUserPlant angular model, but likely won't be needed
		[Required]
		public int TypeID { get; set; }
		[MaxLength(255)]
		public string WherePurchased { get; set; }
		[MaxLength(255)]
		public string NickName { get; set; }
		public DateTime Birthday { get; set; }
		public DateTime LastWatered { get; set; }
		public DateTime LastFertalized{ get; set; }
		public bool ReceiveNotifications { get; set; }
		public int PrimaryImageID { get; set; }
	}
}
