using fizjobackend.DbContexts;
using fizjobackend.Interfaces.UsersInterfaces;
using fizjobackend.Services.UserServices;
using Microsoft.EntityFrameworkCore;

namespace fizjobackend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddDbContext<FizjoDbContext>(options =>
            {
                options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
            });
            builder.Services.AddScoped<IUserService, UserService>();
            var app = builder.Build();
            TestDatabaseConnection(app);

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            app.UseAuthorization();
            app.MapControllers();
            app.Run();
        }
        private static void TestDatabaseConnection(WebApplication app)
        {
            using (var scope = app.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                var logger = services.GetRequiredService<ILogger<Program>>();
                var context = services.GetRequiredService<FizjoDbContext>();

                try
                {
                    context.Database.OpenConnection();
                    context.Database.CloseConnection();
                    logger.LogInformation("Database connection test succeeded.");
                }
                catch (Exception ex)
                {
                    logger.LogError(ex, "Database connection test failed.");
                }
            }
        }
    }
}
