using backend.Hypesoft.Domain.Entities;

namespace backend.Hypesoft.Domain.Repositories
{
    public interface IProductRepository
    {
        Task<decimal> GetTotalStockValue();
        Task<int> GetProductsCount();
        Task<Dictionary<string, int>> GetProductsCountByCategory();
        Task<IEnumerable<Product>> GetAllProducts(int pageIndex, int pageSize, bool lowStock, string? searchTerm, string? categoryId);
        Task<Product> GetProductById(string id);
        Task CreateProduct(Product product);
        Task UpdateProduct(Product product);
        Task DeleteProduct(string id);
    }
}
