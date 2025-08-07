using MediatR;

namespace backend.Hypesoft.Application.Queries.Products
{
  public class GetProductsCountByCategoryQuery : IRequest<Dictionary<string, int>>
  {

  }
}