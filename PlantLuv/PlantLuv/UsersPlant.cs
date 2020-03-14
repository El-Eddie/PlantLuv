using System;
using System.Collections.Generic;
using System.Text;

namespace PlantLuv
{
    public class UsersPlant
    {
        public int PlantID { get; set; }
        public PlantType PlantType { get; set; }
        public string Nickame { get; set; }
        public DateTime LastWatered { get; set; }
        public DateTime LastFertalized { get; set; }
        public float Height { get; set; }
        public DateTime Birtdhdaty { get; set; }
        public bool IsDeleted { get; set; }
        public bool ReceiveNotifications { get; set; }

    }
}
