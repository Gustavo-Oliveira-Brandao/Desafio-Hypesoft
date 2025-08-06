using backend.Hypesoft.API.Extensions;
using backend.Hypesoft.Infrastructure.Configurations;
using Serilog;
using Serilog.Events;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var connectionString = builder.Configuration.GetConnectionString("Hypesoft");

if (connectionString == null)
{
    throw new Exception("Connection string não encontrada!");
}

Log.Logger = new LoggerConfiguration().MinimumLevel.Information().MinimumLevel
    .Override("Microsoft", LogEventLevel.Warning).MinimumLevel
    .Override("Microsoft.Hosting.Lifetime", LogEventLevel.Information).Enrich.FromLogContext().WriteTo.Console().WriteTo
    .File("logs/log.txt", rollingInterval: RollingInterval.Day,
        outputTemplate: "{Timestamp:yyyy-MM-dd HH:mm:ss.fff zzz} [{Level:u3}] {Message:lj}{NewLine}{Exception}")
    .CreateLogger();

builder.Host.UseSerilog();

builder.Services.AddInfrastructure(connectionString, "Hypesoft", builder.Configuration);

Console.WriteLine(builder.Services);

var app = builder.Build();

app.UseCorrelationIdMiddleware();

app.UseSerilogRequestLogging();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
    c.RoutePrefix = string.Empty;
});

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

Log.Information("Aplicação iniciada!");

app.Run();

Log.CloseAndFlush();