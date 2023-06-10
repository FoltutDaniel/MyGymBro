using backend.DbContexts;
using backend.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class WorkoutData : IWorkoutData
    {
        private readonly DbInfoContext _dbInfoContext;

        public WorkoutData(DbInfoContext dbInfoContext)
        {
            _dbInfoContext = dbInfoContext ?? throw new ArgumentNullException(nameof(dbInfoContext));
        }

        public async Task<List<ExerciseWorkoutRel>> GetByWorkoutId(int Id)
        {
            return await _dbInfoContext.ExerciseWorkoutRel.Where(_ => _.Workout.Id == Id).Include(_ => _.Exercise).ToListAsync();
        }

        public async Task<Exercise> GetExerciseExerciseWorkoutRelId(int Id)
        {
            return  (await _dbInfoContext.ExerciseWorkoutRel.Where(_ => _.Id == Id).FirstOrDefaultAsync()).Exercise;
        }

        public async Task<ExerciseWorkoutRel> GetByWorkoutOneId(int Id)
        {
            return await _dbInfoContext.ExerciseWorkoutRel.Where(_ => _.Workout.Id == Id).FirstOrDefaultAsync();
        }

        public async Task<ExerciseWorkoutRel> GetByExerciseWorkoutRelId(int Id)
        {
            return await _dbInfoContext.ExerciseWorkoutRel.Where(_ => _.Id == Id).Include(_=>_.Exercise).FirstOrDefaultAsync();
        }


        public async void RemoveExerciseWorkoutRel(ExerciseWorkoutRel exercise)
        {
          
            _dbInfoContext.ExerciseWorkoutRel.Remove(exercise);
            _dbInfoContext.SaveChanges();
        }

        public async Task UpdateWorkoutById(Workout workout)
        {
            _dbInfoContext.Workout.Update(workout);
            _dbInfoContext.SaveChanges();
            // _dbInfoContext.SaveChangesAsync();
        }

        public async Task<Workout> WorkoutById(int Id)
        {
            return await _dbInfoContext.Workout.Where(_ => _.Id == Id).FirstAsync();
        }

        public async Task<List<Workout>> WorkoutDataTest(int userId)
        {
            return await _dbInfoContext.Workout.Where(_ => _.UserData.UserId == userId).ToListAsync();
        }
    }
}
