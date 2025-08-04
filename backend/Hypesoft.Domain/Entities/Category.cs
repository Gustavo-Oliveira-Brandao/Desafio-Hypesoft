using System.ComponentModel.DataAnnotations;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace backend.Hypesoft.Domain.Entities;

public class Category
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }
    
    [StringLength(100, MinimumLength = 4)]
    public string Name { get; set; } = string.Empty;

    public Category(string name)
    {
        Id = ObjectId.GenerateNewId().ToString();
        UpdateDetails(name);
    }

    public void UpdateDetails(string name)
    {
        Name = name;
    }
}