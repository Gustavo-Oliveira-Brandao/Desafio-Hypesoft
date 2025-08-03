using backend.Hypesoft.Application.Commands.Products;
using backend.Hypesoft.Domain.Repositories;
using MediatR;

namespace backend.Hypesoft.Application.Handlers.Products
{
  public class UpdateProductCommandHandler(IProductRepository productRepository) : IRequestHandler<UpdateProductCommand, Unit>
  {
    public async Task<Unit> Handle(UpdateProductCommand request, CancellationToken cancellationToken)
    {
      var productFound = await productRepository.GetProductById(request.Id);
      
      productFound.Name = request.Name;
      productFound.Description = request.Description;
      productFound.Price = request.Price;
      productFound.StockQuantity = request.StockQuantity;
      
      await productRepository.UpdateProduct(productFound);
      return Unit.Value;
    }
  }
}