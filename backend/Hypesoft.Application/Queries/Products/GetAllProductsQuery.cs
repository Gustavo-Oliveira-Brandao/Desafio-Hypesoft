using backend.Hypesoft.Domain.Entities;
using MediatR;
using MongoDB.Bson;

namespace backend.Hypesoft.Application.Queries.Products;

public class GetAllProductsQuery : IRequest<(IEnumerable<Product> products, int totalCount)>
{
    public int PageIndex { get; set; }
    public int PageSize { get; set; }
    public string? SearchTerm { get; set; }
    public string? CategoryId { get; set; }
    public bool LowStock { get; set; }
}