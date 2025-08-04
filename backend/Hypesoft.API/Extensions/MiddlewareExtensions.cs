using backend.Hypesoft.API.Middlewares;

namespace backend.Hypesoft.API.Extensions;

public static class MiddlewareExtensions
{
    public static IApplicationBuilder UseCorrelationIdMiddleware(this IApplicationBuilder app)
    {
        return app.UseMiddleware<CorrelationIdMiddleware>();
    }
}