using System;
using System.Collections.Generic;
using System.Linq;
using PlantLuv.Plants;


namespace PlantLuv.SqlDbServices
{
	public class SqlTypeData : ITypeData
	{
		private PlantLuvDbContext _dbContext;

		public SqlTypeData(PlantLuvDbContext dbContext)
		{
			this._dbContext = dbContext;
		}

		public void Add(PlantType type)
		{
			_dbContext.PlantType.Add(type);
		}

		public void Comit()
		{
			_dbContext.SaveChanges();
		}

		public void Delete(PlantType type)
		{
			_dbContext.Remove(type);
		}

		public PlantType Get(int typeId)
		{
			return _dbContext.PlantType.FirstOrDefault(x => x.TypeId == typeId);
		}

		public List<PlantType> Search(PlantQueryParameters options)
		{
			throw new NotImplementedException();
		}

		public void Update(PlantType type)
		{
		}
	}
}
