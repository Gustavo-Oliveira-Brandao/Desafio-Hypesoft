using backend.Hypesoft.Application.Commands.Products;
using FluentValidation;

namespace backend.Hypesoft.Application.Validators.Products;

public class UpdateProductCommandValidator : AbstractValidator<UpdateProductCommand>
{
    public UpdateProductCommandValidator()
    {
        RuleFor(x => x.Id).NotEmpty().WithMessage("ID não pode ser vazia.");
        RuleFor(x => x.Name).NotEmpty().WithMessage("Nome não pode ficar vazio!").MaximumLength(100).WithMessage("Nome não pode ter mais do que 100 caracteres!");
        RuleFor(x => x.Description).NotEmpty().WithMessage("Descrição não pode ficar vazia!").MaximumLength(1000).WithMessage("Descrição não pode ter mais do que 1000 caracteres!");
        RuleFor(x => x.Price).GreaterThanOrEqualTo(0).WithMessage("Preço não pode ser menor que 0.");
        RuleFor(x => x.StockQuantity).GreaterThanOrEqualTo(0).WithMessage("Quantidade no estoque não pode ser menor que 0!");
    }
}