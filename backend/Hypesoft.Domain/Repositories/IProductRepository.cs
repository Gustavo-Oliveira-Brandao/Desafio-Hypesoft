using backend.Hypesoft.Domain.Entities;
using MongoDB.Bson;

namespace backend.Hypesoft.Domain.Repositories
{
    public interface IProductRepository
    {
        Task<IEnumerable<Product>> GetAllProducts(int pageIndex, int pageSize, bool lowStock, string? searchTerm, string? categoryId);
        Task<Product> GetProductById(string id);
        Task CreateProduct(Product product);
        Task UpdateProduct(Product product);
        Task DeleteProduct(string id);
    }
}
