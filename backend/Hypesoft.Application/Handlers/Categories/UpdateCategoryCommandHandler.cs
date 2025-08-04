using backend.Hypesoft.Application.Commands.Categories;
using backend.Hypesoft.Domain.Entities;
using backend.Hypesoft.Domain.Repositories;
using MediatR;

namespace backend.Hypesoft.Application.Handlers.Categories;

public class UpdateCategoryCommandHandler(ICategoryRepository categoryRepository) : IRequestHandler<UpdateCategoryCommand, Unit>
{
    public async Task<Unit> Handle(UpdateCategoryCommand request, CancellationToken cancellationToken)
    {
        var categoryFound = await categoryRepository.GetCategoryById(request.Id);

        if (categoryFound == null)
        {
            throw new ApplicationException("Categoria não encontrada!");
        }
        
        categoryFound.UpdateDetails(request.Name);
        await categoryRepository.UpdateCategory(categoryFound);
        return Unit.Value;
    }
}