using backend.Hypesoft.Domain.Entities;
using backend.Hypesoft.Domain.Repositories;
using backend.Hypesoft.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace backend.Hypesoft.Infrastructure.Repositories;

public class ProductRepository : IProductRepository
{
    private readonly MongoDbContext _context;

    public ProductRepository(MongoDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Product>> GetAllProducts(int pageIndex, int pageSize)
    {
       var products = await _context.Products.Skip((pageIndex - 1) * pageSize).Take(pageSize).ToListAsync();
       return products;
    }

    public async Task<Product> GetProductById(string productId)
    {
        var product = await _context.Products.FindAsync(productId);
        if (product == null)
        {
            throw new Exception("Product não encontrado!");
        }
        return product;
    }

    public async Task CreateProduct(Product product)
    {
        await _context.Products.AddAsync(product);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateProduct(Product product)
    {
        _context.Entry(product).State = EntityState.Modified;
        await _context.SaveChangesAsync();
    }

    public async Task DeleteProduct(string id)
    {
        var product = await _context.Products.FindAsync(id);
        if (product == null)
        {
            throw new Exception("Produto não encontrado!");
        }
        _context.Products.Remove(product);
        await _context.SaveChangesAsync();
    }

}