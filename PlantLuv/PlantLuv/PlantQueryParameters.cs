using System;
using System.Collections.Generic;
using System.Text;

namespace PlantLuv
{
    public class PlantQueryParameters
    {
        /// <summary>
        /// The 1-based page number.
        /// </summary>
        public int PageIndex { get; set; }

        /// <summary>
        /// The page size, or number of records to take in a page.
        /// </summary>
        public int Take { get; set; }

        /// <summary>
        /// Any valid order specification over plant properties.
        /// </summary>
        public string OrderBy { get; set; }

        /// <summary>
        /// If Specified, search only returns plants with this ownerID.
        /// </summary>
        public string OwnerID { get; set; }
        
        /// <summary>
        /// When false, search will only return plants not marked as archived.
        /// </summary>
        public bool IsDeleted { get; set; }
        
        /// <summary>
        /// String term to compare as a partial value to all searchable fields.
        /// </summary>
        public string Term { get; set; }
        
        public PlantQueryParameters()
        {

        }

        public PlantQueryParameters(PlantQueryParameters source)
        {
            if (source == null)
                return;

            this.PageIndex = source.PageIndex;
            this.Take = source.Take;
            this.OrderBy = source.OrderBy;

            this.OwnerID = source.OwnerID;
            this.IsDeleted = source.IsDeleted;

            this.Term = source.Term;

        }
    }
}
