using backend.Hypesoft.Application.Queries.Products;
using backend.Hypesoft.Domain.Repositories;
using MediatR;

namespace backend.Hypesoft.Application.Handlers.Products
{
  public class GetProductsCountQueryHandler(IProductRepository productRepository) : IRequestHandler<GetProductsCountQuery, int>
  {
    public async Task<int> Handle(GetProductsCountQuery request, CancellationToken cancellationToken)
    {
      int productsCount = await productRepository.GetProductsCount();
      return productsCount;
    }
  }
}