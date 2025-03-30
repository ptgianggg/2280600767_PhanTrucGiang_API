using Microsoft.EntityFrameworkCore;
using _2280600767_PhanTrucGiang_API.Models;

namespace _2280600767_PhanTrucGiang_API.Data
{
    public class GiangDbContext : DbContext
    {
        public GiangDbContext(DbContextOptions<GiangDbContext> options) : base(options) { }

        public DbSet<Product> Products { get; set; }
    }
}