using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace backend.Hypesoft.Domain.Entities;

public class Category
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }
    
    public string Name { get; set; }

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