using backend.Hypesoft.Application.Queries.Products;
using backend.Hypesoft.Domain.Repositories;
using MediatR;

namespace backend.Hypesoft.Application.Handlers.Products
{
  public class GetTotalStockValueQueryHandler(IProductRepository productRepository) : IRequestHandler<GetTotalStockValueQuery, decimal>
  {
    public async Task<decimal> Handle(GetTotalStockValueQuery request, CancellationToken cancellationToken)
    {
      decimal totalStockValue = await productRepository.GetTotalStockValue();
      return totalStockValue;
    }
  }
}