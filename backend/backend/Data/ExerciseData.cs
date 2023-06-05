using backend.DbContexts;
using backend.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class ExerciseData : IExerciseData
    {

        private readonly DbInfoContext _dbInfoContext;

        public ExerciseData(DbInfoContext dbInfoContext)
        {
            _dbInfoContext = dbInfoContext ?? throw new ArgumentNullException(nameof(dbInfoContext));
        }
        public async Task AddExercise(Exercise exercise)
        {
            _dbInfoContext.Exercise.Add(exercise);
            _dbInfoContext.SaveChanges();
        }

        public async Task DeleteExercise(int id)
        {
            _dbInfoContext.Exercise.Remove(_dbInfoContext.Exercise.Where(_ => _.Id == id).FirstOrDefault());
            _dbInfoContext.SaveChanges();
        }

        public async Task<Exercise> GetException(int id)
        {
            return await _dbInfoContext.Exercise.Where(_ => _.Id == id).FirstOrDefaultAsync();
        }

        public async Task<List<Exercise>> GetExerciseAsync()
        {
            return await _dbInfoContext.Exercise.ToListAsync();
        }
    }
}
