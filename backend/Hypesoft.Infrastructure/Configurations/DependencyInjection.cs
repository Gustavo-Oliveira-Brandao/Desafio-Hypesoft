using System.Reflection;
using backend.Hypesoft.Application.Validators;
using backend.Hypesoft.Domain.Repositories;
using backend.Hypesoft.Infrastructure.Data;
using backend.Hypesoft.Infrastructure.Repositories;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using MongoDB.Driver;

namespace backend.Hypesoft.Infrastructure.Configurations
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, string mongoDbConnectionString, string databaseName, IConfiguration configuration)
        {
            services.AddSwaggerGen(options =>
            {

                options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.Http,
                    Scheme = "Bearer",
                    BearerFormat = "JWT",
                    Description = "Por favor, insira seu token JWT a seguir."
                });

                options.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme{
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            }
                        },
                        Array.Empty<string>()
                    }
                });
            });

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.Authority = configuration["Keycloak:Authority"];
                options.Audience = configuration["Keycloak:Audience"];
                options.RequireHttpsMetadata = false;
            });

            services.AddControllers();
            var mongoClient = new MongoClient(mongoDbConnectionString);
            services.AddDbContext<MongoDbContext>(options =>
            {
                options.UseMongoDB(mongoClient, databaseName);
            });

            services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly()));
            services.AddScoped(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));
            services.AddScoped<IProductRepository, ProductRepository>();
            services.AddScoped<ICategoryRepository, CategoryRepository>();
            services.AddValidatorsFromAssembly(typeof(Program).Assembly);
            return services;
        }
    }

}