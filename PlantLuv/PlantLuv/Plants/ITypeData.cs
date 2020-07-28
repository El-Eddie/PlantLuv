using System;
using System.Collections.Generic;
using System.Text;

namespace PlantLuv.Plants
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
