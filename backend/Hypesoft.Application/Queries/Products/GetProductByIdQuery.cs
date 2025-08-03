using backend.Hypesoft.Domain.Entities;
using MediatR;
using MongoDB.Bson;

namespace backend.Hypesoft.Application.Queries.Products;

public class GetProductByIdQuery : IRequest<Product>
{
    public string id { get; init; }
}