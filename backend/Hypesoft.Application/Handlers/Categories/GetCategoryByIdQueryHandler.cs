using backend.Hypesoft.Application.Queries.Categories;
using backend.Hypesoft.Domain.Entities;
using backend.Hypesoft.Domain.Repositories;
using MediatR;

namespace backend.Hypesoft.Application.Handlers.Categories;

public class GetCategoryByIdQueryHandler(ICategoryRepository categoryRepository): IRequestHandler<GetCategoryByIdQuery, Category>
{
    public async Task<Category> Handle(GetCategoryByIdQuery request, CancellationToken cancellationToken)
    {
        var category = await categoryRepository.GetCategoryById(request.Id);
        return category;
    }
}