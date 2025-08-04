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

      if (productFound == null)
      {
        throw new ApplicationException("Produto não encontrado.");
      }
      
      productFound.UpdateDetails(request.Name, request.Description, request.Price);
      productFound.UpdateStock(request.StockQuantity);
      productFound.UpdateCategory(request.CategoryId);
      
      await productRepository.UpdateProduct(productFound);
      return Unit.Value;
    }
  }
}