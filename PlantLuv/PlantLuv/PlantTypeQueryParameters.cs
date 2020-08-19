using System;
using System.Collections.Generic;
using System.Text;

namespace PlantLuv
{
    public class PlantTypeQueryParameters
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
        /// String term to compare as a partial value to all searchable fields.
        /// </summary>
        public string Term { get; set; }

        public PlantTypeQueryParameters()
        {

        }

        public PlantTypeQueryParameters (PlantTypeQueryParameters source)
        {
            if (source == null)
                return;

            this.PageIndex = source.PageIndex;
            this.Take = source.Take;
            this.OrderBy = source.OrderBy;

            this.Term = source.Term;

        }
    }
}
