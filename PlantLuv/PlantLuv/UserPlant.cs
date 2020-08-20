using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using PlantLuv.PlantOptions;

namespace PlantLuv
{
    public class UserPlant
    {
        [Key]
        public int PlantId { get; set; }
        public string OwnerID { get; set; }
        public string NickName { get; set; }
        public string WherePurchased { get; set; }

        public PlantType PlantType { get; set; }
        public DateTime LastWatered { get; set; }
        public DateTime WaterAgain { get; set; }
        public DateTime LastFertalized { get; set; }
        public DateTime FertalizeAgain { get; set; }
        public DateTime Birtdhday { get; set; }
        
        public bool IsDeleted { get; set; }
        public bool ReceiveNotifications { get; set; }
        public bool IsFavorite { get; set; }
        public string PrimaryImageID { get; set; }
    }
}
