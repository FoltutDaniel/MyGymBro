using backend.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.DbContexts
{
    public class DbInfoContext : DbContext
    {
        public DbSet<User> Users { get; set; } = null!;

        public DbSet<UserData> UserDatas { get; set; } = null!;

        public DbSet<Exercise> Exercise { get; set; } = null!;
        public DbSet<Workout> Workout { get; set; } = null!;
        public DbSet<ExerciseWorkoutRel> ExerciseWorkoutRel { get; set; } = null!;
        public DbInfoContext(DbContextOptions<DbInfoContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
