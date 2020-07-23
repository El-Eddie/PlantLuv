using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;

namespace PlantLuv.SqlDbServices
{
    public class PlantLuvIdentityDbContext : IdentityDbContext<PlantLuvIdentityUser>
    {
        public PlantLuvIdentityDbContext(DbContextOptions<PlantLuvIdentityDbContext> options) : base(options) { }
        //protected PlantLuvIdentityDbContext() : base()
        //{

        //}
    }
}
