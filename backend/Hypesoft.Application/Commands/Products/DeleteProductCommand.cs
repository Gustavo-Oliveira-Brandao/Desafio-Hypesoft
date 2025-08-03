using MediatR;
using MongoDB.Bson;

namespace backend.Hypesoft.Application.Commands.Products
{
  public class DeleteProductCommand : IRequest<Unit>
  {
    public string Id { get; set; } = string.Empty;
  }
}