using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic;
using System.Reflection;
using System.Text;
using Microsoft.EntityFrameworkCore;

namespace PlantLuv.SqlDbServices
{
	public class SqlPlantData : IPlantData
	{
		readonly PlantLuvDbContext _dbContext; 

		public SqlPlantData(PlantLuvDbContext dbContext)
		{
			this._dbContext = dbContext;
		}


		public UserPlant Get(int plantId)
		{
			var plant = _dbContext.UserPlant
				.Include(plant => plant.PlantType)
				.ToList()
				.FirstOrDefault(p => p.PlantID == plantId);
			return plant;
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


		public List<UserPlant> Get(PlantQueryParameters options)
		{
			IQueryable<UserPlant> query = _dbContext.UserPlant
				.Include(plant => plant.PlantType)
				.Where(x => x.IsDeleted == options.IsDeleted);
				
			if (!String.IsNullOrWhiteSpace(options.OwnerID))
				query = query.Where(x => x.OwnerID == options.OwnerID );

			if (!String.IsNullOrWhiteSpace(options.Term))
			{
				query = query.Where(plant =>
					plant.NickName.Contains(options.Term) ||
					plant.WherePurchased.Contains(options.Term) ||
					plant.PlantType.LatinName.Contains(options.Term) ||
					plant.PlantType.CommonName.Contains(options.Term)
				);
			}
				
			if (!string.IsNullOrWhiteSpace(options.OrderBy))
			{
				string[] sortArray = ValidateSortStrings(options.OrderBy);
				if (sortArray != null)
				{
					foreach (string field in sortArray)
					{
						query = query.OrderBy(field);
					}
				}
			}

			var list = query.Skip(options.PageIndex * options.Take).Take(options.Take).ToList();
			
			return list;
		}


		public List<UserPlant> Get(IEnumerable<int> plantIdList)
		{
			return _dbContext.UserPlant
				.Include(plant => plant.PlantType)
				.Where(p => plantIdList.Contains(p.PlantID))
				.ToList();
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
