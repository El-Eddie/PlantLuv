using System.Collections.Generic;

namespace PlantLuv.PlantOptions
{
    public interface ITypeData
	{
		PlantType Get(int typeID);
		void Add(PlantType type);
		void Update(PlantType type);
		void Comit();
		List<PlantType> Search(PlantQueryParameters options);
		void Delete(PlantType type);
	}
}
