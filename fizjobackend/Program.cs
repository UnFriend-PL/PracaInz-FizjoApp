using fizjobackend.DbContexts;
using fizjobackend.Entities.UserEntities;
using fizjobackend.Interfaces.AccountInterfaces;
using fizjobackend.Interfaces.UsersInterfaces;
using fizjobackend.Services.AccountService;
using fizjobackend.Services.UserServices;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;
using Serilog;
using fizjobackend.Interfaces.EmailInterface;
using fizjobackend.Services.EmailService;
using DotNetEnv;
using fizjobackend.Helpers;
using fizjobackend.Interfaces.HelpersInterfaces;
using fizjobackend.Seeders;
using fizjobackend.Interfaces.AppointmentsInterfaces;
using fizjobackend.Services.AppointmentsService;
using fizjobackend.Seeders.BodySeeder;
using fizjobackend.Interfaces.BodyVisualizerInterfaces;
using fizjobackend.Services.BodyVisualizerService;
using fizjobackend.Seeders.TreatmentSeeder;
using fizjobackend.Interfaces.TreatmentsInterfaces;
using fizjobackend.Services.Treatments;

namespace fizjobackend
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            Env.Load();
            var builder = WebApplication.CreateBuilder(args);
            Log.Logger = new LoggerConfiguration()
                .ReadFrom.Configuration(builder.Configuration)
                .CreateLogger();
            builder.Host.UseSerilog();
            builder.Services.AddMemoryCache();
            builder.Services.AddControllers();
            builder.Services.AddHttpClient();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });

                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Description = "JWT Authorization header using the Bearer scheme. Enter 'Bearer' [space] and then your token in the text input below.",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer"
                });

                c.AddSecurityRequirement(new OpenApiSecurityRequirement
                    {
                        {
                            new OpenApiSecurityScheme
                            {
                                Reference = new OpenApiReference
                                {
                                    Type = ReferenceType.SecurityScheme,
                                    Id = "Bearer"
                                }
                            },
                            new string[] {}
                        }
                    });
            });

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                      builder => builder.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader());
            });
            builder.Services.AddDbContext<FizjoDbContext>(options =>
            {
                options.UseSqlServer(Environment.GetEnvironmentVariable("CONNECTION_STRING"));
            });
            builder.Services.AddScoped<IUserService, UserService>();
            builder.Services.AddScoped<IAccountService, AccountService>();
            builder.Services.AddScoped<IJwtGenerator, JwtGenerator>();
            builder.Services.AddScoped<IEmailService, EmailService>();
            builder.Services.AddScoped<IAppointmentsService, AppointmentService>();
            builder.Services.AddScoped<IBodyVisualizerService, BodyVisualizerService>();
            var key = Encoding.ASCII.GetBytes(Environment.GetEnvironmentVariable("JWT_KEY")!);
            builder.Services.AddScoped<IAccountValidationHelper, AccountValidationHelper>();
            builder.Services.AddScoped<ITreatmentsService, TreatmentsService>();
            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme; ;
            })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    RoleClaimType = "role",
                    ValidIssuer = builder.Configuration["Jwt:Issuer"],
                    ValidAudience = builder.Configuration["Jwt:Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(key)
                };
            });
            InitializeIdentity(builder);

            var app = builder.Build();
            TestDatabaseConnection(app);
            using (var scope = app.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                var logger = services.GetRequiredService<ILogger<Program>>();
                await RoleSeeder.SeedRolesAsync(services, logger);
                await BodySeeder.SeedBodyAsync(services, logger);
                await TreatmentSeeder.SeedTreatmentsAsync(services, logger);
            }
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            app.UsePathBase("/api/v1/");
            app.UseCors("CorsPolicy");
            app.UseHttpsRedirection();
            app.UseAuthentication();
            app.UseAuthorization();
            app.MapControllers();
            app.Run();
        }

        private static void InitializeIdentity(WebApplicationBuilder builder)
        {
            builder.Services
                .AddIdentity<User, IdentityRole<Guid>>()
                .AddDefaultTokenProviders()
                .AddEntityFrameworkStores<FizjoDbContext>()
                .AddRoles<IdentityRole<Guid>>()
                .AddRoleManager<RoleManager<IdentityRole<Guid>>>()
                .AddSignInManager<SignInManager<User>>()
                .AddUserManager<UserManager<User>>()
                .AddDefaultTokenProviders();
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
                    logger.LogError(ex, "Check Azure rules.");
                }
            }
        }
    }
}
