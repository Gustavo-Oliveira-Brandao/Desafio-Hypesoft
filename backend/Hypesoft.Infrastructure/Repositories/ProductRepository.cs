using backend.Hypesoft.Domain.Entities;
using backend.Hypesoft.Domain.Repositories;
using backend.Hypesoft.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using MongoDB.Driver;

namespace backend.Hypesoft.Infrastructure.Repositories;

public class ProductRepository(MongoDbContext context) : IProductRepository
{
    public async Task<decimal> GetTotalStockValue()
    {
        decimal totalStockValue = await context.Products.SumAsync(p => p.Price * p.StockQuantity);
        return totalStockValue;
    }

    public async Task<int> GetProductsCount()
    {
        int productsCount = await context.Products.CountAsync();
        return productsCount;
    }

    public async Task<Dictionary<string, int>> GetProductsCountByCategory()
    {
        var productsByCategory = context.Products
            .Where(p => p.CategoryId != null)
            .Select(p => new { p.CategoryId });

        var countsById = productsByCategory
            .AsEnumerable()
            .GroupBy(p => p.CategoryId)
            .Select(group => new
            {
                CategoryId = group.Key,
                ProductCount = group.Count()
            })
            .ToList();

        var categoryIds = countsById.Select(x => x.CategoryId).ToList();

        var categories = await context.Categories
            .Where(c => categoryIds.Contains(c.Id))
            .ToDictionaryAsync(c => c.Id, c => c.Name);

        var result = new Dictionary<string, int>();
        foreach (var product in countsById)
        {
            if (product.CategoryId != null && categories.TryGetValue(product.CategoryId, out var categoryName))
            {
                result[categoryName] = product.ProductCount;
            }
        }

        return result;
    }

    public async Task<(IEnumerable<Product> products, int totalCount)> GetAllProducts(int pageIndex, int pageSize, bool lowStock, string? searchTerm = null, string? categoryId = null)
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

        int totalCount = await query.CountAsync();

        var skipCount = (pageIndex - 1) * pageSize;

        var products = await query.OrderBy(p => p.Name).Skip(skipCount).Take(pageSize).ToListAsync();
        return (products, totalCount);
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