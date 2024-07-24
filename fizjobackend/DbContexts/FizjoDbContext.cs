using Microsoft.EntityFrameworkCore;

namespace fizjobackend.DbContexts
{
    public class FizjoDbContext : DbContext
    {
        public FizjoDbContext(DbContextOptions<FizjoDbContext> options) : base(options)
        {
        }
    }
}
