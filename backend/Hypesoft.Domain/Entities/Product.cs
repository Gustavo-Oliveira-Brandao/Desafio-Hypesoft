using System.ComponentModel.DataAnnotations;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace backend.Hypesoft.Domain.Entities
{
    public class Product
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [StringLength(100)] 
        public string Name { get; set; } = string.Empty;
        
        [StringLength(1000)]
        public string Description { get; set; } = string.Empty;
        
        public decimal Price { get; set; }
        
        public int StockQuantity { get; set; }
        
        public string? CategoryId { get; set; }

        public Product(string name, string description, decimal price, int stockQuantity, string? categoryId = null)
        {
            Id = ObjectId.GenerateNewId().ToString();
            UpdateDetails(name, description, price);
            UpdateStock(stockQuantity);
            if (categoryId != null)
            {
                UpdateCategory(categoryId);
            }
        }

        public void UpdateDetails(string name, string description, decimal price)
        {
            Name = name;
            Description = description;
            Price = price;
        }

        public void UpdateStock(int newStockQuantity)
        {
            StockQuantity = newStockQuantity;
        }

        public void UpdateCategory(string? newCategoryId)
        {
            CategoryId = newCategoryId;
        }
    }
}
