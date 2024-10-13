using fizjobackend.DbContexts;
using fizjobackend.Entities.BodyEntities;
using Microsoft.EntityFrameworkCore;

using Newtonsoft.Json;


namespace fizjobackend.Seeders.BodySeeder
{
    public static class BodySeeder
    {
        public static async Task SeedBodyAsync(IServiceProvider serviceProvider, ILogger<Program> logger)
        {
            try
            {
                using var scope = serviceProvider.CreateScope();
                var context = scope.ServiceProvider.GetRequiredService<FizjoDbContext>();

                View femaleFrontView;
                View femaleBackView;
                View maleFrontView;
                View maleBackView;

                if (!await context.Views.AnyAsync())
                {
                    femaleFrontView = new View { Name = "Front", Gender = "Female" };
                    femaleBackView = new View { Name = "Back", Gender = "Female" };
                    maleFrontView = new View { Name = "Front", Gender = "Male" };
                    maleBackView = new View { Name = "Back", Gender = "Male" };

                    await context.Views.AddRangeAsync(femaleFrontView, femaleBackView, maleFrontView, maleBackView);
                    await context.SaveChangesAsync();

                    logger.LogInformation("Views seeded successfully");
                }
                else
                {
                    femaleBackView = await context.Views.FirstOrDefaultAsync(v => v.Name == "Back" && v.Gender == "Female");
                    femaleFrontView = await context.Views.FirstOrDefaultAsync(v => v.Name == "Front" && v.Gender == "Female");
                    maleBackView = await context.Views.FirstOrDefaultAsync(v => v.Name == "Back" && v.Gender == "Male");
                    maleFrontView = await context.Views.FirstOrDefaultAsync(v => v.Name == "Front" && v.Gender == "Male");
                    logger.LogInformation("Views already seeded");
                }

                if (!await context.BodySections.AnyAsync())
                {
                    await AddFrontSectionDetailsAsync(context, femaleFrontView.Id);
                    await AddFrontSectionDetailsAsync(context, maleFrontView.Id);

                    await AddBackSectionDetailsAsync(context, femaleBackView.Id);
                    await AddBackSectionDetailsAsync(context, maleBackView.Id);
                }
                else
                {
                    logger.LogInformation("Body sections already seeded");
                }
            }
            catch (Exception ex)
            {
                logger.LogError($"Error seeding body parts: {ex.Message}");
            }
        }

        private static async Task AddFrontSectionDetailsAsync(FizjoDbContext context, int frontSectionId)
        {
            var frontBodyParts = new List<(string Name, string Side)>
            {
                ("neck", null), ("deltoids", "left"), ("deltoids", "right"), ("head", null),
                ("chest", "left"), ("chest", "right"), ("biceps", "left"), ("biceps", "right"),
                ("triceps", "left"), ("triceps", "right"), ("obliques", "left"), ("obliques", "right"),
                ("abs", null), ("forearm", "left"), ("forearm", "right"), ("hand", "left"),
                ("hand", "right"), ("adductors", "left"), ("adductors", "right"), ("quadriceps", "left"),
                ("quadriceps", "right"), ("knee", "left"), ("knee", "right"), ("tibialis", "left"),
                ("tibialis", "right"), ("calves", "left"), ("calves", "right"), ("ankle", "left"),
                ("ankle", "right"), ("foot", "left"), ("foot", "right")
            };

            foreach (var part in frontBodyParts)
            {
                var bodySection = new BodySection
                {
                    BodySectionName = part.Name,
                    BodySide = part.Side,
                    ViewId = frontSectionId
                };

                await context.BodySections.AddAsync(bodySection);
                await context.SaveChangesAsync();

                await AddBodyPartMusclesAndJointsAsync(context, bodySection, "Front");
            }
        }

        private static async Task AddBackSectionDetailsAsync(FizjoDbContext context, int backSectionId)
        {
            var backBodyParts = new List<(string Name, string Side)>
            {
                ("neck", null), ("trapezius", "left"), ("trapezius", "right"), ("deltoid", "left"),
                ("deltoid", "right"), ("upper-back", "left"), ("upper-back", "right"), ("lower-back", "left"),
                ("lower-back", "right"), ("triceps", "left"), ("triceps", "right"), ("forearm", "left"),
                ("forearm", "right"), ("hand", "left"), ("hand", "right"), ("gluteal", "left"),
                ("gluteal", "right"), ("adductor", "left"), ("adductor", "right"), ("hamstring", "left"),
                ("hamstring", "right"), ("calves", "left"), ("calves", "right"), ("foot", "left"),
                ("foot", "right")
            };

            foreach (var part in backBodyParts)
            {
                var bodySection = new BodySection
                {
                    BodySectionName = part.Name,
                    BodySide = part.Side,
                    ViewId = backSectionId
                };

                await context.BodySections.AddAsync(bodySection);
                await context.SaveChangesAsync();

                await AddBodyPartMusclesAndJointsAsync(context, bodySection, "Back");
            }
        }

        private static async Task AddBodyPartMusclesAndJointsAsync(FizjoDbContext context, BodySection bodySection, string side)
        {
            string filePath = Path.Combine(AppContext.BaseDirectory, "bodyParts.json");
            var jsonData = File.ReadAllText(filePath);
            var bodyParts = JsonConvert.DeserializeObject<BodyParts>(jsonData);

            BodyPartSection section = null;

            if (side.Equals("Front", StringComparison.OrdinalIgnoreCase))
            {
                bodyParts.Front.TryGetValue(bodySection.BodySectionName, out section);
            }
            else if (side.Equals("Back", StringComparison.OrdinalIgnoreCase))
            {
                bodyParts.Back.TryGetValue(bodySection.BodySectionName, out section);
            }

            if (section != null)
            {
                // Muscles in English and Polish
                if (section.Muscles != null)
                {
                    for (int i = 0; i < section.Muscles["en"].Count; i++)
                    {
                        var muscleEntity = new Muscle
                        {
                            Name = section.Muscles["en"][i],
                            NamePL = section.Muscles["pl"][i],
                            BodySectionId = bodySection.Id
                        };
                        await context.Muscles.AddAsync(muscleEntity);
                    }
                    await context.SaveChangesAsync();
                }

                // Joints in English and Polish
                if (section.Joints != null)
                {
                    for (int i = 0; i < section.Joints["en"].Count; i++)
                    {
                        var jointEntity = new Joint
                        {
                            Name = section.Joints["en"][i],
                            NamePL = section.Joints["pl"][i],
                            BodySectionId = bodySection.Id
                        };
                        await context.Joints.AddAsync(jointEntity);
                    }
                    await context.SaveChangesAsync();
                }
            }
        }

    }
}


// --------------------------------------------------------------------------------

public class BodyPartSection
{
    public Dictionary<string, List<string>> Muscles { get; set; } // "en" and "pl" as keys
    public Dictionary<string, List<string>> Joints { get; set; }  // "en" and "pl" as keys
}

public class BodyParts
{
    public Dictionary<string, BodyPartSection> Front { get; set; }
    public Dictionary<string, BodyPartSection> Back { get; set; }
}
