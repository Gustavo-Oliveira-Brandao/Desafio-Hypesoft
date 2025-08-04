using MediatR;

namespace backend.Hypesoft.Application.Commands.Products
{
  public class CreateProductCommand : IRequest<Unit>
  {
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public int StockQuantity { get; set; }
    public string? CategoryId { get; set; }

  }
}