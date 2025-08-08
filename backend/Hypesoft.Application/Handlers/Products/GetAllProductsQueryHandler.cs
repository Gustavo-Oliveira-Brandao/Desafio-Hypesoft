using backend.Hypesoft.Application.Queries.Products;
using backend.Hypesoft.Domain.Entities;
using backend.Hypesoft.Domain.Repositories;
using MediatR;

namespace backend.Hypesoft.Application.Handlers.Products;

public class GetAllProductsQueryHandler(IProductRepository productRepository) : IRequestHandler<GetAllProductsQuery, (IEnumerable<Product> products, int totalCount)>
{
    public async Task<(IEnumerable<Product> products, int totalCount)> Handle(GetAllProductsQuery request, CancellationToken cancellationToken)
    {
        var (products, totalCount) = await productRepository.GetAllProducts(request.PageIndex, request.PageSize, request.LowStock, request.SearchTerm, request.CategoryId);
        return (products, totalCount);
    }
}