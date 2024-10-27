﻿using fizjobackend.DbContexts;
using fizjobackend.Entities.TreatmentsEntities;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace fizjobackend.Seeders.TreatmentSeeder
{
    public static class TreatmentSeeder
    {
        public static async Task SeedTreatmentsAsync(IServiceProvider serviceProvider, ILogger<Program> logger)
        {
            try
            {
                using var scope = serviceProvider.CreateScope();
                var context = scope.ServiceProvider.GetRequiredService<FizjoDbContext>();

                if (await context.Treatments.AnyAsync())
                {
                    logger.LogInformation("Treatments already seeded");
                    return;
                }

                var filePath = Path.Combine(AppContext.BaseDirectory, "treatments.json");
                var jsonData = await File.ReadAllTextAsync(filePath);
                var seedData = JsonConvert.DeserializeObject<SeedData>(jsonData);

                foreach (var treatmentData in seedData.Treatments)
                {
                    var treatment = new Treatment
                    {
                        Id = Guid.NewGuid(),
                        OwnerId = null,
                        IsDefault = treatmentData.IsDefault,
                        Description = treatmentData.Description,
                        DescriptionPL = treatmentData.DescriptionPL,
                        Name = treatmentData.Name,
                        NamePL = treatmentData.NamePL,
                        Duration = TimeSpan.Parse(treatmentData.Duration),
                        CreateDate = DateTime.Parse(treatmentData.CreateDate),
                        UpdateDate = DateTime.Parse(treatmentData.UpdateDate),
                        IsDeleted = treatmentData.IsDeleted
                    };

                    var muscles = await context.Muscles
                        .Where(m => treatmentData.Muscles.Contains(m.Name))
                        .ToListAsync();

                    var joints = await context.Joints
                        .Where(j => treatmentData.Joints.Contains(j.Name))
                        .ToListAsync();

                    treatment.Muscles = muscles;
                    treatment.Joints = joints;

                    var bodySections = await context.BodySections
                        .Where(bs => bs.Muscles.Any(m => muscles.Contains(m)) || bs.Joints.Any(j => joints.Contains(j))).ToListAsync();
                    var views = await context.Views
                        .Where(v => v.BodySections.Any(bs => bodySections.Contains(bs))).Distinct().ToListAsync();

                    treatment.BodySections = bodySections;
                    treatment.Views = views;

                    await context.Treatments.AddAsync(treatment);
                }

                await context.SaveChangesAsync();
                logger.LogInformation("Treatments seeded successfully");
            }
            catch (Exception ex)
            {
                logger.LogError($"Error seeding treatments: {ex.Message}");
            }
        }
    }

    public class SeedData
    {
        public List<TreatmentData> Treatments { get; set; }
    }

    public class TreatmentData
    {
        public bool IsDefault { get; set; }
        public string Description { get; set; }
        public string DescriptionPL { get; set; }
        public string Name { get; set; }
        public string NamePL { get; set; }
        public string Duration { get; set; }
        public string CreateDate { get; set; }
        public string UpdateDate { get; set; }
        public bool IsDeleted { get; set; }
        public List<string> Muscles { get; set; }
        public List<string> Joints { get; set; }
    }
}