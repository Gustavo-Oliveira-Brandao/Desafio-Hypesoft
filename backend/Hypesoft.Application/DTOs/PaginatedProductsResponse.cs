using backend.Hypesoft.Domain.Entities;

namespace backend.Hypesoft.Application.DTOs
{
  public class PaginatedProductsResponse
  {
    public IEnumerable<Product>? Products { get; set; }
    public int TotalPages { get; set; }
  }
}