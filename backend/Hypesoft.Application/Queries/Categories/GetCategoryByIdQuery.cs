using backend.Hypesoft.Domain.Entities;
using MediatR;

namespace backend.Hypesoft.Application.Queries.Categories;

public class GetCategoryByIdQuery : IRequest<Category>
{
    public string Id { get; set; } = string.Empty;
}