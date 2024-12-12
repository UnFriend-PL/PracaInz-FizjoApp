using Microsoft.AspNetCore.Identity;

namespace Fizjobackend.Seeders
{
    public static class RoleSeeder
    {
        public static async Task SeedRolesAsync(IServiceProvider serviceProvider, ILogger<Program> logger)
        {
            var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole<Guid>>>();

            string[] roleNames = { "Patient", "Physiotherapist" };
            IdentityResult roleResult;

            foreach (var roleName in roleNames)
            {
                var roleExist = await roleManager.RoleExistsAsync(roleName);
                if (!roleExist)
                {
                    var role = new IdentityRole<Guid> { Name = roleName, NormalizedName = roleName.ToUpper() };
                    roleResult = await roleManager.CreateAsync(role);

                    if (roleResult.Succeeded)
                    {
                        logger.LogInformation($"Role {roleName} created successfully.");
                    }
                    else
                    {
                        logger.LogError($"Error creating role {roleName}: {string.Join(", ", roleResult.Errors.Select(e => e.Description))}");
                    }
                }
            }
        }
    }
}
