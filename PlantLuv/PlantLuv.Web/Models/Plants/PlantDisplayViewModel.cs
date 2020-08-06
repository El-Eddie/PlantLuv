using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PlantLuv.Plants;

namespace PlantLuv.Web.Models.Plants
{
    public class PlantDisplayViewModel
    {
        public int PlantId { get; set; }
        public string OwnerID { get; set; }
        public int TypeID { get; set; }

        public string CommonName { get; set; }
        public string LattinName { get; set; }
        public string NickName { get; set; }
        public string WherePurchased { get; set; }

        public DateTime LastWatered { get; set; }
        public DateTime WaterAgain { get; set; }
        public DateTime LastFertalized { get; set; }
        public DateTime FertalizeAgain { get; set; }
        public DateTime Birtdhday { get; set; }

        public bool ReceiveNotifications { get; set; }
        public bool IsFavorite { get; set; }
        public string PrimaryImageID { get; set; }

        public string LightLevel { get; set; }
        public List<string> Toxisity { get; set; }

        public PlantDisplayViewModel(UserPlant plant)
        {
            this.PlantId = plant.PlantId;
            this.OwnerID = plant.OwnerID;
            this.TypeID = plant.PlantType.TypeId;

            this.CommonName = plant.PlantType.CommonName;
            this.LattinName = plant.PlantType.LatinName;
            this.NickName = plant.NickName;
            this.WherePurchased = plant.WherePurchased;

            this.LastWatered = plant.LastWatered;
            this.WaterAgain = plant.WaterAgain;
            this.LastFertalized = plant.LastFertalized;
            this.FertalizeAgain = plant.FertalizeAgain;
            this.Birtdhday = plant.Birtdhday;

            this.ReceiveNotifications = plant.ReceiveNotifications;
            this.IsFavorite = plant.IsFavorite;
            this.PrimaryImageID = plant.PrimaryImageID;

            this.LightLevel = plant.PlantType.LightLevel.ToString();
            this.Toxisity = GetToxisityAray(plant.PlantType);
        }

        private List<string> GetToxisityAray(PlantType type)
        {
            List<string> toxisity = new List<string>();

            if (type.ToxicToCats)
                toxisity.Add("Cats");

            if (type.ToxicToDogs)
                toxisity.Add("Dogs");

            if (type.ToxicToHumans)
                toxisity.Add("Humans"); // We can remove this. It's not necessary

            if (type.ToxicToSmallAnimals)
                toxisity.Add("Small-Animals");

            if (toxisity.Count == 0)
                toxisity.Add("Pet-Safe");

            return toxisity;
        }
    }
}