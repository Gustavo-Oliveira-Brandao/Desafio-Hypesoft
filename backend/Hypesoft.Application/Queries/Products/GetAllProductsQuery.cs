using backend.Hypesoft.Domain.Entities;
using MediatR;
using MongoDB.Bson;

namespace backend.Hypesoft.Application.Queries.Products;

public class GetAllProductsQuery : IRequest<IEnumerable<Product>>
{
    public int PageIndex { get; set; }
    public int PageSize { get; set; }
}