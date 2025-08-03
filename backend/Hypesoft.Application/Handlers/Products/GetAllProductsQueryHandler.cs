using backend.Hypesoft.Application.Queries.Products;
using backend.Hypesoft.Domain.Entities;
using backend.Hypesoft.Domain.Repositories;
using MediatR;

namespace backend.Hypesoft.Application.Handlers.Products;

public class GetAllProductsQueryHandler(IProductRepository productRepository) : IRequestHandler<GetAllProductsQuery, IEnumerable<Product>>
{
    public async Task<IEnumerable<Product>> Handle(GetAllProductsQuery request, CancellationToken cancellationToken)
    {
        var products = await productRepository.GetAllProducts(request.PageIndex, request.PageSize);
        return products;
    }    
}