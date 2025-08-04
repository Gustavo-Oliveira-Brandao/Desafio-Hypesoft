using backend.Hypesoft.Application.Commands.Categories;
using FluentValidation;

namespace backend.Hypesoft.Application.Validators.Categories;

public class UpdateCategoryCommandValidator : AbstractValidator<UpdateCategoryCommand>
{
    public UpdateCategoryCommandValidator()
    {
        RuleFor(x => x.Id).NotEmpty();
        RuleFor(x => x.Name).NotEmpty().WithMessage("Nome não pode ficar vazio!").MaximumLength(100).WithMessage("Nome não pode ter mais do que 100 caracteres!");
        
    }
}