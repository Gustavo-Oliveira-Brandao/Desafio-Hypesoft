using backend.Hypesoft.Domain.Entities;
using backend.Hypesoft.Domain.Repositories;
using backend.Hypesoft.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace backend.Hypesoft.Infrastructure.Repositories;

public class CategoryRepository : ICategoryRepository
{
  private readonly MongoDbContext _context;

  public CategoryRepository(MongoDbContext context)
  {
    _context = context;
  }

  public async Task<IEnumerable<Category>> GetAllCategories()
  {
    var categories = await _context.Categories.ToListAsync();
    return categories;
  }

  public async Task<Category> GetCategoryById(string id)
  {
    var category = await _context.Categories.FindAsync(id);
    if (category == null)
    {
      throw new Exception("Categoria não encontrada!");
    }
    return category;
  }

  public async Task CreateCategory(Category category)
  {
    await _context.Categories.AddAsync(category);
    await _context.SaveChangesAsync();
  }

  public async Task UpdateCategory(Category category)
  {
    _context.Entry(category).State = EntityState.Modified;
    await _context.SaveChangesAsync();
  }

  public async Task DeleteCategory(string id)
  {
    var category = await _context.Categories.FindAsync(id);
    if (category == null)
    {
      throw new Exception("Produto não encontrado!");
    }
    _context.Categories.Remove(category);
    await _context.SaveChangesAsync();
  }

}