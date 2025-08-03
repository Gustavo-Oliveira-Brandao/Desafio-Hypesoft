using backend.Hypesoft.Application.Queries.Products;
using backend.Hypesoft.Domain.Entities;
using backend.Hypesoft.Domain.Repositories;
using MediatR;

namespace backend.Hypesoft.Application.Handlers.Products;

public class GetProductByIdQueryHandler(IProductRepository productRepository)
    : IRequestHandler<GetProductByIdQuery, Product>
{
    public async Task<Product> Handle(GetProductByIdQuery request, CancellationToken cancellationToken)
    {
        var product = await productRepository.GetProductById(request.id);
        return product;
    }
}