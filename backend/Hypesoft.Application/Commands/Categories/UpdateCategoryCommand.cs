using MediatR;

namespace backend.Hypesoft.Application.Commands.Categories;

public class UpdateCategoryCommand : IRequest<Unit>
{
    public string Id { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
}