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
		[Required]
		public int TypeID { get; set; }
		[MaxLength(255)]
		public string WherePurchased { get; set; }
		[MaxLength(255)]
		public string NickName { get; set; }
		[DataType(DataType.Date)]
		public DateTime Birthday { get; set; }
		[DataType(DataType.Date)]
		public DateTime LastWatered { get; set; }
		[DataType(DataType.Date)]
		public DateTime LastFertalized{ get; set; }
		public bool ReceiveNotifications { get; set; }
		public string PrimaryImageID { get; set; }
	}
}
