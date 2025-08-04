using MediatR;

namespace backend.Hypesoft.Application.Commands.Categories;

public class CreateCategoryCommand : IRequest<Unit>
{
    public string Name { get; set; } = string.Empty;
}