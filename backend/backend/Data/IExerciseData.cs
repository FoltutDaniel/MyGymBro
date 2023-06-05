using backend.Entities;

namespace backend.Data
{
    public interface IExerciseData
    {
        Task<List<Exercise>> GetExerciseAsync();

        Task AddExercise(Exercise exercise);

        Task DeleteExercise(int id);

        Task<Exercise> GetException(int id);

    }
}
