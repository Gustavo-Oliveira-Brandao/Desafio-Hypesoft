using backend.Hypesoft.Domain.Entities;
using MediatR;
using MongoDB.Bson;

namespace backend.Hypesoft.Application.Commands.Products
{
    public class UpdateProductCommand : IRequest<Unit>
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int StockQuantity { get; set; }
    }
}