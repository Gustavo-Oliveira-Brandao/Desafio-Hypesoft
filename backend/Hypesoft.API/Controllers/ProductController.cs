using backend.Hypesoft.Application.Commands.Products;
using backend.Hypesoft.Application.Queries.Products;
using backend.Hypesoft.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Hypesoft.API.Controllers;


[Authorize]
[Route("api/[controller]")]
[ApiController]
public class ProductController : ControllerBase
{
    private readonly IMediator _mediator;

    public ProductController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Product>> GetProductById([FromRoute] string id)
    {
        try
        {
            var query = new GetProductByIdQuery
            {
                id = id
            };
            var product = await _mediator.Send(query);
            return Ok(product);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet("stockValue")]
    public async Task<ActionResult<decimal>> GetTotalStockValue()
    {
        try
        {
            var query = new GetTotalStockValueQuery();
            var totalStockValue = await _mediator.Send(query);
            return Ok(totalStockValue);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet("productsCategoryCount")]
    public async Task<ActionResult<Dictionary<string, int>>> GetProductsCountByCategory() {
        try
        {
            var query = new GetProductsCountByCategoryQuery();
            var productsByCategoryCount = await _mediator.Send(query);
            return Ok(productsByCategoryCount);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet("productsCount")]
    public async Task<ActionResult<int>> GetProductsCount()
    {
        try
        {
            var query = new GetProductsCountQuery();
            var productsCount = await _mediator.Send(query);
            return Ok(productsCount);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Product>>> GetAllProducts([FromQuery] int pageIndex = 1, [FromQuery] int pageSize = 10, [FromQuery] string? searchTerm = null, [FromQuery] string? categoryId = null, [FromQuery] bool lowStock = false)
    {
        try
        {
            var query = new GetAllProductsQuery
            {
                PageIndex = pageIndex,
                PageSize = pageSize,
                SearchTerm = searchTerm,
                CategoryId = categoryId,
                LowStock = lowStock
            };
            var products = await _mediator.Send(query);
            return Ok(products);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPost]
    public async Task<IActionResult> CreateProduct([FromBody] CreateProductCommand command)
    {
        try
        {
            await _mediator.Send(command);
            return Ok("Produto criado!");
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPut]
    public async Task<IActionResult> UpdateProduct([FromBody] UpdateProductCommand command)
    {
        try
        {
            await _mediator.Send(command);
            return Ok("Produto atualizado com sucesso!");
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProduct([FromRoute] string id)
    {
        try
        {
            var command = new DeleteProductCommand
            {
                Id = id
            };
            await _mediator.Send(command);
            return Ok("Produto removido com sucesso!");
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}