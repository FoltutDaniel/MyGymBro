using backend.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.DbContexts
{
    public class DbInfoContext : DbContext { 
    
        public DbSet<User> Users { get; set; }

        public DbSet<UserData> UserDatas { get; set; }

        public DbSet<Exercise> Exercise { get; set; } 
        public DbSet<Workout> Workout { get; set; } 
        public DbSet<ExerciseWorkoutRel> ExerciseWorkoutRel { get; set; }
        public DbInfoContext(DbContextOptions<DbInfoContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var user = modelBuilder.Entity<User>();
            user.HasKey(x => x.UserId); //PK
            user.Property(p => p.Username).IsRequired();

            var userData = modelBuilder.Entity<UserData>();
            userData.HasKey(x => x.Id);


            userData.HasOne(u => u.User)
                .WithOne(ud => ud.UserData)
                .HasForeignKey<UserData>(ud => ud.UserId);
        

            base.OnModelCreating(modelBuilder);
        }
    }
}
