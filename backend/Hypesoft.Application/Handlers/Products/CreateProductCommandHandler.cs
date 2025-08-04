using backend.Hypesoft.Application.Commands.Products;
using backend.Hypesoft.Domain.Entities;
using backend.Hypesoft.Domain.Repositories;
using MediatR;

namespace backend.Hypesoft.Application.Handlers.Products
{
  public class CreateProductCommandHandler(IProductRepository productRepository) : IRequestHandler<CreateProductCommand, Unit>
  {
    public async Task<Unit> Handle(CreateProductCommand request, CancellationToken cancellationToken)
    {
      var product = new Product(request.Name, request.Description, request.Price, request.StockQuantity, request.CategoryId);

      await productRepository.CreateProduct(product);
      
      return Unit.Value;
    }
  }
}