using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;

namespace PlantLuv.SqlDbServices
{
	class SqlPlantData : IPlantData
	{
		private PlantLuvDbContext _dbContext;

		public SqlPlantData(PlantLuvDbContext dbContext)
		{
			this._dbContext = dbContext;
		}


		public UserPlant Get(int plantId)
		{
			return _dbContext.UserPlant.FirstOrDefault(x =>
				x.PlantId == plantId);
		}


		public void Add(UserPlant plant)
		{
			_dbContext.UserPlant.Add(plant);
		}


		public void Update(UserPlant plant)
		{

		}
		
		
		public void Commit()
		{
			_dbContext.SaveChanges();
		}


		public List<UserPlant> Search(int userId, QueryItemListParameters options)
		{
			IQueryable<UserPlant> query = _dbContext.UserPlant;

			if (!String.IsNullOrWhiteSpace(options.OwnerID))
				query = query.Where(x => x.OwnerID == options.OwnerID);

			if (options.IsDeleted)
				query = query.Where(x => x.IsDeleted == true);

			if (options.ReceiveNotifications)
				query = query.Where(x => x.ReceiveNotifications == true);

			if (options.IsFavorite)
				query = query.Where(x => x.IsFavorite == true);

			if (options.NotFavorite)
				query = query.Where(x => x.IsFavorite == false);

			if (!String.IsNullOrWhiteSpace(options.Term))
			{
				query = query.Where(x =>
					x.NickName.Contains(options.Term) ||
					x.WherePurchased.Contains(options.Term) // ||
				//	x.PlantType.ToString().Contains(options.Term) ||
				// We also want to be able to search on Type.CommonName and Type.LattinName, but how?
				);
			}


			//if (!string.IsNullOrWhiteSpace(options.OrderBy))
			//{
			//	string[] sortArray = ValidateSortStrings(options.OrderBy);
			//	if (sortArray != null)
			//	{
			//		foreach (string field in sortArray)
			//		{
			//			query = query.OrderBy(field);
			//		}
			//	}
			//}
			return query.Skip(options.PageIndex * options.Take).
				Take(options.Take).ToList();
		}

		public void Delete(UserPlant plant)
		{
			plant.IsDeleted = true;
		}

		private string[] ValidateSortStrings(string sortFields)
		{
			List<string> fieldNames = GetPropertyList();
			string[] parsedFields = sortFields
				.Split(',', StringSplitOptions.RemoveEmptyEntries);

			foreach (string field in parsedFields)
			{
				if (fieldNames.IndexOf($"{field.ToUpper()}") == -1 ||
					fieldNames.IndexOf($"{field} ASC") == -1 ||
					fieldNames.IndexOf($"{field} DESC") == -1)
				{
					return null;
				}
			}
			return parsedFields;
		}

		private List<string> GetPropertyList()
		{
			PropertyInfo[] properties = typeof(UserPlant).GetProperties();
			List<string> propertyNames = new List<string>();
			foreach (PropertyInfo property in properties)
			{
				propertyNames.Add(property.Name);
			}
			return propertyNames;
		}
	}
}
