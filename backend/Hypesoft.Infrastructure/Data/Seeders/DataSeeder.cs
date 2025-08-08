using backend.Hypesoft.Domain.Entities;
using backend.Hypesoft.Infrastructure.Data;

public class DataSeeder
{
  private readonly MongoDbContext _context;

  public DataSeeder(MongoDbContext context)
  {
    _context = context;
  }

  public void Seed()
  {
    if (_context.Products.Any() || _context.Categories.Any())
    {
      return;
    }

    var categories = new List<Category>
        {
            new Category("Eletrônicos"),
            new Category("Livros"),
            new Category("Casa e Jardim"),
            new Category("Esportes e Lazer"),
            new Category("Moda Masculina"),
            new Category("Moda Feminina"),
            new Category("Ferramentas"),
            new Category("Brinquedos"),
            new Category("Alimentos e Bebidas"),
            new Category("Beleza e Saúde")
        };

    foreach (var category in categories)
    {
      _context.Categories.Add(category);
      _context.SaveChanges();
    }

    var random = new Random();

    for (int i = 1; i <= 50; i++)
    {
      var randomCategory = categories[random.Next(categories.Count)];

      var product = new Product
      (
          name: $"Produto {i}",
          description: $"Descrição detalhada do Produto {i}.",
          price: (decimal)(random.NextDouble() * 1000 + 50),
          stockQuantity: random.Next(1, 200),
          categoryId: randomCategory.Id
      );

      _context.Products.Add(product);
      _context.SaveChanges();
    }
  }
}