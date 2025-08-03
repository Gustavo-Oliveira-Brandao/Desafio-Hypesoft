using System.Reflection;
using backend.Hypesoft.Application.Handlers.Products;
using backend.Hypesoft.Application.Validators;
using backend.Hypesoft.Domain.Repositories;
using backend.Hypesoft.Infrastructure.Data;
using backend.Hypesoft.Infrastructure.Repositories;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using MongoDB.Driver;

namespace backend.Hypesoft.Infrastructure.Configurations
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, string mongoDbConnectionString, string databaseName)
        {
            services.AddSwaggerGen();
            services.AddControllers();
            var mongoClient = new MongoClient(mongoDbConnectionString);
            services.AddDbContext<MongoDbContext>(options =>
            {
                options.UseMongoDB(mongoClient, databaseName);
            });

            services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly()));
            services.AddScoped(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));
            services.AddScoped<IProductRepository, ProductRepository>();
            services.AddValidatorsFromAssembly(typeof(Program).Assembly);
            return services;
        }
    }

}