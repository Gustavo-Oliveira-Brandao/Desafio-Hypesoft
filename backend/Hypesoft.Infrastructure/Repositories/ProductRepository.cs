using backend.Hypesoft.Domain.Entities;
using backend.Hypesoft.Domain.Repositories;
using backend.Hypesoft.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using MongoDB.Driver;

namespace backend.Hypesoft.Infrastructure.Repositories;

public class ProductRepository(MongoDbContext context) : IProductRepository
{
    public async Task<IEnumerable<Product>> GetAllProducts(int pageIndex, int pageSize, bool lowStock, string? searchTerm = null, string? categoryId = null)
    {
        var query = context.Products.AsQueryable();

        if (!string.IsNullOrEmpty(searchTerm))
        {
            query = query.Where(p => p.Name.ToLower().Contains(searchTerm.ToLower()));
        }

        if (!string.IsNullOrEmpty(categoryId))
        {
            query = query.Where(p => p.CategoryId == categoryId);
        }
    
        if (lowStock)
        {
            query = query.Where(p => p.StockQuantity < 10);
        }
        
        var skipCount = (pageIndex - 1) * pageSize;
        
        var products = await query.OrderBy(p => p.Name).Skip(skipCount).Take(pageSize).ToListAsync();
       return products;
    }

    public async Task<Product> GetProductById(string productId)
    {
        var product = await context.Products.FindAsync(productId);
        if (product == null)
        {
            throw new Exception("Product não encontrado!");
        }
        return product;
    }

    public async Task CreateProduct(Product product)
    {
        await context.Products.AddAsync(product);
        await context.SaveChangesAsync();
    }

    public async Task UpdateProduct(Product product)
    {
        context.Entry(product).State = EntityState.Modified;
        await context.SaveChangesAsync();
    }

    public async Task DeleteProduct(string id)
    {
        var product = await context.Products.FindAsync(id);
        if (product == null)
        {
            throw new Exception("Produto não encontrado!");
        }
        context.Products.Remove(product);
        await context.SaveChangesAsync();
    }

}