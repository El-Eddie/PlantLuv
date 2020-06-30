using System;
using System.Collections.Generic;
using System.Text;

namespace PlantLuv
{
    public interface IPlantData
    {
        UserPlant Get(int plantId);
        void Add(UserPlant plant);
        void Update(UserPlant plant);
        void Commit();
        List<UserPlant> Search(int userId, QueryItemListParameters options);
        void Delete(UserPlant plant);
    }
}
