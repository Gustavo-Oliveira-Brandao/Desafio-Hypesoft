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
        [StringLength(100, MinimumLength = 4)]
        public string Name { get; set; } = string.Empty;
        [StringLength(1000, MinimumLength = 4)]
        public string Description { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public int StockQuantity { get; set; }

        public Product(string name, string description, decimal price, int stockQuantity)
        {
            Id = ObjectId.GenerateNewId().ToString();
            UpdateDetails(name, description, price);
            UpdateStock(stockQuantity);
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
    }
}
