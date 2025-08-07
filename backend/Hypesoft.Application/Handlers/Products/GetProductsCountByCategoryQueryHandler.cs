using backend.Hypesoft.Application.Queries.Products;
using backend.Hypesoft.Domain.Repositories;
using MediatR;

namespace backend.Hypesoft.Application.Handlers.Products
{
  public class GetProductsCountByCategoryQueryHandler(IProductRepository productRepository) : IRequestHandler<GetProductsCountByCategoryQuery, Dictionary<string, int>>
  {
    public async Task<Dictionary<string, int>> Handle(GetProductsCountByCategoryQuery request, CancellationToken cancellationToken)
    {
      var productsByCategoryCount = await productRepository.GetProductsCountByCategory();
      return productsByCategoryCount;
    }
  }
}