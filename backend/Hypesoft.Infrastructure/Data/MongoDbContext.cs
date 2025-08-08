using backend.Hypesoft.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using MongoDB.EntityFrameworkCore.Extensions;

namespace backend.Hypesoft.Infrastructure.Data
{
    public class MongoDbContext(DbContextOptions options) : DbContext(options)
    {
        public DbSet<Product> Products { get; init; }
        public DbSet<Category> Categories { get; init; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Product>().ToCollection("products");
            modelBuilder.Entity<Category>().ToCollection("categories");
    
        }
    }
}
