using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PlantLuv.Web.Models.Plants
{
    public class PlantTypeUpdateModel
    {
        [Required]
        public int[] PlantIdArray { get; set; }
    }
}
