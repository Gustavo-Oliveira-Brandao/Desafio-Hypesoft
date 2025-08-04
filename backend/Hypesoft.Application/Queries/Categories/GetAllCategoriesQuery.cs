using backend.Hypesoft.Domain.Entities;
using MediatR;

namespace backend.Hypesoft.Application.Queries.Categories;

public class GetAllCategoriesQuery : IRequest<IEnumerable<Category>>
{
    
}