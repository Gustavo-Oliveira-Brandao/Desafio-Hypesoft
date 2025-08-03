using backend.Hypesoft.Application.Commands.Products;
using backend.Hypesoft.Domain.Repositories;
using backend.Hypesoft.Infrastructure.Repositories;
using MediatR;

namespace backend.Hypesoft.Application.Handlers.Products;

public class DeleteProductCommandHandler(IProductRepository productRepository) : IRequestHandler<DeleteProductCommand, Unit>
{
    public async Task<Unit> Handle(DeleteProductCommand request, CancellationToken cancellationToken)
    {
        await productRepository.DeleteProduct(request.Id);
        
        return Unit.Value;
    }
}