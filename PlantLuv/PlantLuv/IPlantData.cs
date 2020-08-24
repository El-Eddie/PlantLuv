using PlantLuv.PlantOptions;
using System;
using System.Collections.Generic;
using System.Text;

namespace PlantLuv
{
    public interface IPlantData
    {
        UserPlant Get(int plantId);
        PlantType GetPlantType(int plantId);
        void Add(UserPlant plant);
        void Add(PlantType plant);
        void Update(UserPlant plant);
        void Update(PlantType plant);
        void Commit();
        List<UserPlant> Get(PlantQueryParameters options);
        List<PlantType> Get(PlantTypeQueryParameters options);
        List<UserPlant> Get(IEnumerable<int> plantIdList);
        void Delete(UserPlant plant);
    }
}
