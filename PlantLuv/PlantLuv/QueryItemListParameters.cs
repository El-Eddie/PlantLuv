using System;
using System.Collections.Generic;
using System.Text;

namespace PlantLuv
{
    public class QueryItemListParameters
    {
        public int PageIndex { get; set; }
        public int Take { get; set; }
        public string OrderBy { get; set; }

        public string OwnerID { get; set; }
        public bool IsDeleted { get; set; }
        public bool ReceiveNotifications { get; set; }
        public bool IsFavorite { get; set; }
        public bool NotFavorite { get; set; }

        public string Term { get; set; }
        
        public QueryItemListParameters()
        {

        }
        public QueryItemListParameters(QueryItemListParameters source)
        {
            if (source == null)
                return;

            this.PageIndex = source.PageIndex;
            this.Take = source.Take;
            this.OrderBy = source.OrderBy;

            this.OwnerID = source.OwnerID;
            this.IsDeleted = source.IsDeleted;
            this.ReceiveNotifications = source.ReceiveNotifications;
            this.IsFavorite = source.IsFavorite;
            
            this.Term = source.Term;

        }
    }
}
